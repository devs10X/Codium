// parseResponse.ts

export function parseStreamChunk(buffer: string) {
    // Extract assistant_message
    const assistantRegex = /<assistant_message>([\s\S]*?)<\/assistant_message>/g;
    let assistantMessage: string | null = null;
    let match;
    while ((match = assistantRegex.exec(buffer)) !== null) {
      assistantMessage = match[1].trim();
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
  