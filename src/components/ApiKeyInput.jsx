import React, { useState } from 'react';

export default function ApiKeyInput({ value, onChange, onLoadVoices, loading }) {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleBlur = () => {
    if (value && value.trim()) {
      onLoadVoices();
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-2 select-none">
        <label htmlFor="api-key" className="font-mono text-xs uppercase tracking-widest text-black font-bold">
          API Key
        </label>
        <button
          type="button"
          onClick={() => setShowInstructions(true)}
          className="font-mono text-xs uppercase tracking-widest text-muted-fg hover:text-black transition-colors duration-100 font-bold focus:outline-none"
        >
          GET KEY ↗
        </button>
      </div>

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

      {/* Stark Monochrome Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] transition-opacity duration-200">
          <div className="bg-white border-4 border-black w-full max-w-[500px] p-6 flex flex-col justify-between animate-fade-in-slide select-none">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-black mb-4">
                GET ELEVENLABS API KEY
              </h3>
              
              <div className="font-body text-sm text-black space-y-4 leading-relaxed mb-6">
                <p>
                  To run EL Studio, you will need to generate an API key on ElevenLabs.
                  For safety, we recommend granting <strong>only</strong> the following permissions:
                </p>
                
                <div className="font-mono text-xs border border-border-light p-3 bg-white space-y-2">
                  <div className="flex justify-between">
                    <span className="text-black font-bold">TEXT TO SPEECH</span>
                    <span className="text-muted-fg">ACCESS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-bold">VOICES</span>
                    <span className="text-muted-fg">READ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-bold">MODELS</span>
                    <span className="text-muted-fg">ACCESS</span>
                  </div>
                  <div className="border-t border-dashed border-border-light pt-2 mt-2 flex justify-between">
                    <span className="text-black font-bold">USER/SUBSCRIPTION *</span>
                    <span className="text-muted-fg">READ (OPTIONAL)</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-fg leading-relaxed">
                  * Granting User/Subscription read access is optional but required if you want to display the visual Character Balance tracker at the top.
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="px-6 py-3 font-mono text-xs uppercase tracking-widest bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-100 font-bold"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => {
                  window.open('https://elevenlabs.io/api', '_blank');
                  setShowInstructions(false);
                }}
                className="px-6 py-3 font-mono text-xs uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors duration-100 font-bold"
              >
                CONTINUE →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
