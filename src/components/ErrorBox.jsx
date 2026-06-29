import React from 'react';

export default function ErrorBox({ error }) {
  if (!error) return null;

  return (
    <div className="w-full border-2 border-black bg-white p-4">
      <div className="font-mono text-xs uppercase tracking-widest text-black font-bold mb-1">
        ERROR
      </div>
      <p className="font-body text-sm text-black leading-relaxed">
        {error}
      </p>
    </div>
  );
}
