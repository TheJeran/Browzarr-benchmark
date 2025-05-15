'use client';

import { useEffect, useRef, useState } from 'react';

interface PaneConfig {
  className: string;
  title: string;
  icon: string;
}

const PANES: PaneConfig[] = [
  { className: 'data-stores-pane', title: 'Data Stores', icon: '📊' },
  { className: 'data-settings-pane', title: 'Data Settings', icon: '⚙️' },
  { className: 'plot-pane', title: 'Plot Settings', icon: '📈' },
  { className: 'plot-cloud', title: 'Point Cloud', icon: '☁️' },
];

export function PaneManager() {
  const [activePane, setActivePane] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create container if it doesn't exist
    if (!containerRef.current) {
      const container = document.createElement('div');
      container.className = 'panes-container';
      document.body.appendChild(container);
      containerRef.current = container;
    }

    // Create trigger buttons for each pane
    PANES.forEach(pane => {
      // Remove existing trigger if it exists
      const existingTrigger = document.querySelector(`.${pane.className}-trigger`);
      if (existingTrigger) {
        existingTrigger.remove();
      }

      const trigger = document.createElement('button');
      trigger.className = `${pane.className}-trigger`;
      trigger.innerHTML = pane.icon;
      trigger.title = pane.title;
      trigger.setAttribute('aria-label', pane.title);
      
      // Add click handler
      trigger.addEventListener('click', () => {
        setActivePane(activePane === pane.className ? null : pane.className);
      });

      // Add to container
      containerRef.current?.appendChild(trigger);
    });

    // Cleanup function
    return () => {
      containerRef.current?.remove();
      containerRef.current = null;
    };
  }, [activePane]);

  // Update pane visibility based on active state
  useEffect(() => {
    PANES.forEach(pane => {
      const paneElement = document.querySelector(`.${pane.className}`);
      if (paneElement) {
        if (activePane === pane.className) {
          paneElement.classList.add('active');
          // Ensure the pane is visible
          (paneElement as HTMLElement).style.display = 'block';
        } else {
          paneElement.classList.remove('active');
          // Hide the pane
          (paneElement as HTMLElement).style.display = 'none';
        }
      }
    });
  }, [activePane]);

  return null; // This component doesn't render anything directly
} 