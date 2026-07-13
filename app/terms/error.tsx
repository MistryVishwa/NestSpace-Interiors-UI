'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">We couldn&apos;t load the terms of service page.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition"
      >
        Try again
      </button>
    </div>
  );
}
