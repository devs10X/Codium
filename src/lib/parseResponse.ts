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

  // Extract codiumArtifact blocks
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

  return {
    assistantMessage,
    artifacts,
  };
}