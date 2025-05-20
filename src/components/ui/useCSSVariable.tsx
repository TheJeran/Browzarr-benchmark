'use client'
import { useEffect, useState } from 'react';

const useCSSVariable = (variableName: string) => {
  const [value, setValue] = useState<string>(''); // Init with empty until mounted

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getCSSVariable = () => {
      const root = document.documentElement;
      return getComputedStyle(root).getPropertyValue(variableName).trim();
    };

    const updateValue = () => setValue(getCSSVariable());

    updateValue(); // Get value on mount

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          updateValue();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [variableName]);

  return value;
};

export default useCSSVariable;
