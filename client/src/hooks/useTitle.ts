import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Expense Tracker | ${title}`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
