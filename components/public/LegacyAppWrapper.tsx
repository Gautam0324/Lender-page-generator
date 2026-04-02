'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the entire legacy SPA with SSR disabled.
// This is necessary because server components don't support { ssr: false }.
const App = dynamic(() => import('../../src/App'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  )
});

export const LegacyAppWrapper = () => {
  return <App />;
};
