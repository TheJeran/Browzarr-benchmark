'use client';

import { useEffect, useRef } from 'react';

export function PaneManager() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const processedPanes = useRef<Set<Element>>(new Set());
  const currentPaneCount = useRef<number>(0);

  useEffect(() => {
    // Function to run when DOM loads or when panes might be injected
    function organizePanes() {
      // Check if container already exists
      let container = document.querySelector('.panes-container');
      
      // If container doesn't exist, create it
      if (!container) {
        container = document.createElement('div');
        container.className = 'panes-container';
        document.body.appendChild(container);
        containerRef.current = container as HTMLDivElement;
      }
      
      // Find all panes that need to be in the container
      const paneSelectors = [
        '.data-stores-pane', 
        '.data-settings-pane', 
        '.plot-pane', 
        '.plot-cloud'
      ];
      
      // Count current panes
      const allPanes = document.querySelectorAll(paneSelectors.join(','));
      const newPaneCount = allPanes.length;

      // Only reorganize if the number of panes has changed
      if (newPaneCount !== currentPaneCount.current) {
        currentPaneCount.current = newPaneCount;
        
        // Move each pane into the container
        paneSelectors.forEach(selector => {
          const panes = document.querySelectorAll(selector);
          panes.forEach(pane => {
            // If pane is not in our container, move it
            if (pane.parentElement !== container) {
              // Store original position in a data attribute
              const computedStyle = window.getComputedStyle(pane);
              (pane as HTMLElement).dataset.originalTop = computedStyle.top;
              (pane as HTMLElement).dataset.originalRight = computedStyle.right;
              
              // Move it to our container
              container.appendChild(pane);
              processedPanes.current.add(pane);
            }
          });
        });
        
        // Add toggle button if not already present
        if (!document.querySelector('.panel-toggle')) {
          const toggleBtn = document.createElement('div');
          toggleBtn.className = 'panel-toggle';
          toggleBtn.innerHTML = '☰';
          toggleBtn.addEventListener('click', function() {
            container.classList.toggle('collapsed');
          });
          container.prepend(toggleBtn);
        }
      }
    }
    
    // Run once at startup
    organizePanes();
    
    // Set up a MutationObserver to detect when new panes are added
    const observer = new MutationObserver(function(mutations) {
      let hasNewPanes = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          // Check if any of the added nodes are our target panes
          const newPanes = Array.from(mutation.addedNodes).filter((node): node is Element => {
            return node instanceof Element && (
              node.classList.contains('data-stores-pane') || 
              node.classList.contains('data-settings-pane') || 
              node.classList.contains('plot-pane') || 
              node.classList.contains('plot-cloud')
            );
          });
          
          if (newPanes.length > 0) {
            hasNewPanes = true;
          }
        }
      });
      
      if (hasNewPanes) {
        organizePanes();
      }
    });
    
    // Start observing the document for added nodes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false,
      characterData: false
    });

    // Cleanup function
    return () => {
      observer.disconnect();
      processedPanes.current.clear();
      currentPaneCount.current = 0;
    };
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything
} 