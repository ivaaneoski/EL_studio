import React from 'react';
import DarkModeToggle from './DarkModeToggle';

export default function PageHeader() {
  return (
    <header className="flex flex-row justify-between items-start gap-4 mb-6 select-none">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-black mb-1">
          EL STUDIO
        </h1>
        <p className="font-mono text-sm text-muted-fg uppercase tracking-widest">
          Text-to-Speech Interface
        </p>
      </div>
      <DarkModeToggle />
    </header>
  );
}
