import React from 'react';
  import Label from './Label';

  export default function ApiKeyInput({ value, onChange, onLoadVoices, loading }) {
    const handleBlur = () => {
      if (value && value.trim()) {
        onLoadVoices();
      }
    };

    return (
      <div className="w-full">
        <Label htmlFor="api-key">API Key</Label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="api-key"
            type="password"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="Paste your ElevenLabs API key..."
            className="flex-1 px-4 py-3 bg-white border-2 border-black font-mono text-sm placeholder:italic placeholder:text-muted-fg transition-[border-width] duration-100"
          />
          <button
            type="button"
            onClick={onLoadVoices}
            disabled={loading || !value.trim()}
            className="px-6 py-3 font-mono text-xs uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed hover:border-black transition-colors duration-100 select-none shrink-0"
          >
            {loading ? "LOADING..." : "LOAD VOICES →"}
          </button>
        </div>
      </div>
    );
  }
