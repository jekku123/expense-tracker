import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    // Return a cleanup function
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
