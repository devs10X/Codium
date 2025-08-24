// parseResponse.ts

export function parseStreamChunk(buffer: string) {
  // Extract assistant_message - handle both complete and incomplete tags
  let assistantMessage: string | null = null;
  
  // First try to match complete assistant_message tags
  const completeAssistantRegex = /<assistant_message>([\s\S]*?)<\/assistant_message>/g;
  let match = completeAssistantRegex.exec(buffer);
  if (match) {
    assistantMessage = match[1].trim();
  } else {
    // If no complete tag, try to extract partial content
    const partialAssistantRegex = /<assistant_message>([\s\S]*?)(?=<\/assistant_message>|$)/;
    const partialMatch = partialAssistantRegex.exec(buffer);
    if (partialMatch && partialMatch[1]) {
      // Only use partial content if we have an opening tag
      const hasOpeningTag = buffer.includes('<assistant_message>');
      if (hasOpeningTag) {
        assistantMessage = partialMatch[1].trim();
      }
    }
  }

  // Extract complete codiumArtifact blocks
  const artifactRegex =
    /<codiumArtifact[^>]*id="([^"]+)"[^>]*title="([^"]+)"[^>]*>([\s\S]*?)<\/codiumArtifact>/g;
  const actionRegex =
    /<codiumAction[^>]*filePath="([^"]+)"[^>]*>([\s\S]*?)<\/codiumAction>/g;

  let artifacts: any[] = [];
  let artMatch;
  while ((artMatch = artifactRegex.exec(buffer)) !== null) {
    const [, id, title, inner] = artMatch;

    // actions as a single object with file paths as keys
    let actions: Record<string, string> = {};

    let actionMatch;
    while ((actionMatch = actionRegex.exec(inner)) !== null) {
      const [, filePath, code] = actionMatch;
      actions[filePath] = code.trim();
    }

    artifacts.push({ id, title, actions });
  }

  // NEW: Detect partial/incomplete artifacts for early loading states
  let partialArtifacts: any[] = [];
  
  // Look for incomplete codiumArtifact tags (opening tag present but no closing tag)
  const incompleteArtifactRegex = /<codiumArtifact[^>]*id="([^"]+)"[^>]*title="([^"]+)"[^>]*>([\s\S]*?)(?!<\/codiumArtifact>)$/;
  const incompleteMatch = incompleteArtifactRegex.exec(buffer);
  
  if (incompleteMatch) {
    const [, id, title, partialInner] = incompleteMatch;
    let actions: Record<string, string> = {};
    
    // Look for any file paths mentioned in partial content
    // This can catch both complete and incomplete codiumAction tags
    const partialActionRegex = /<codiumAction[^>]*filePath="([^"]+)"[^>]*>/g;
    let partialActionMatch;
    
    while ((partialActionMatch = partialActionRegex.exec(partialInner)) !== null) {
      const [, filePath] = partialActionMatch;
      // Check if this action is complete
      const completeActionInPartial = new RegExp(
        `<codiumAction[^>]*filePath="${filePath}"[^>]*>([\\s\\S]*?)<\\/codiumAction>`,
        'g'
      );
      const completeActionMatch = completeActionInPartial.exec(partialInner);
      
      if (completeActionMatch) {
        // Action is complete
        actions[filePath] = completeActionMatch[1].trim();
      } else {
        // Action is incomplete - use empty string to indicate loading
        actions[filePath] = '';
      }
    }
    
    if (Object.keys(actions).length > 0) {
      partialArtifacts.push({ id, title, actions });
    }
  }
  
  // Also detect when codiumArtifact tag is just starting (for very early detection)
  const artifactStartRegex = /<codiumArtifact[^>]*(?:id="([^"]+)")?[^>]*(?:title="([^"]+)")?[^>]*>?/;
  const hasArtifactStart = artifactStartRegex.test(buffer);
  
  if (hasArtifactStart && artifacts.length === 0 && partialArtifacts.length === 0) {
    // Very early detection - we know an artifact is starting but don't have file names yet
    // Return a placeholder that the UI can use to show general "generating files..." state
    partialArtifacts.push({ 
      id: 'generating', 
      title: 'Generating files...', 
      actions: { '__loading__': '' } // Special placeholder
    });
  }

  // Merge complete artifacts with partial ones, preferring complete ones
  const allArtifacts = [...artifacts];
  
  // Add partial artifacts that don't conflict with complete ones
  partialArtifacts.forEach(partial => {
    const existingIndex = allArtifacts.findIndex(artifact => artifact.id === partial.id);
    if (existingIndex >= 0) {
      // Merge actions, preferring complete artifact's actions
      allArtifacts[existingIndex].actions = {
        ...partial.actions,
        ...allArtifacts[existingIndex].actions
      };
    } else {
      allArtifacts.push(partial);
    }
  });

  return {
    assistantMessage,
    artifacts: allArtifacts,
  };
}