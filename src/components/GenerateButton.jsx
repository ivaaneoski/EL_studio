import React from 'react';

export default function GenerateButton({ onClick, loading, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black py-4 px-8 text-sm font-mono uppercase tracking-widest transition-colors duration-100 disabled:opacity-50 disabled:cursor-not-allowed select-none"
    >
      {loading ? "GENERATING..." : "GENERATE AUDIO →"}
    </button>
  );
}
