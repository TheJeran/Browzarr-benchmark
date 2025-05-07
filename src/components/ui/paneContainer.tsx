
export const createPaneContainer = (className:string) => {
    // Check if we're in a browser environment where document is available
  if (typeof document !== 'undefined') {
    // Create the container element
    const customContainer = document.createElement('div');
    customContainer.className = className;
    // Add to the document
    document.body.appendChild(customContainer);
    // Return the container for use in paneConfig
    return customContainer;
  }
  return null;
};