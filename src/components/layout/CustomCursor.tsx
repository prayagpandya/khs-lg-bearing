import { useEffect } from 'react';

/**
 * Standard browser cursor enforcement.
 * Ensures the document always uses native pointer and arrow cursors.
 */
export function CustomCursor() {
  useEffect(() => {
    document.documentElement.style.cursor = '';
    return () => {
      document.documentElement.style.cursor = '';
    };
  }, []);

  return null;
}
