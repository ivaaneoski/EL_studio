import React from 'react';
import Label from './Label';

export default function VoiceParameters({
  stability,
  onStabilityChange,
  similarityBoost,
  onSimilarityBoostChange,
  style,
  onStyleChange,
  speakerBoost,
  onSpeakerBoostChange,
}) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-tight text-black mb-4">
        VOICE PARAMETERS
      </h2>

      <div className="space-y-5">
        {/* Stability */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <Label htmlFor="stability-slider">Stability</Label>
            <span className="font-mono text-sm text-black">{stability.toFixed(2)}</span>
          </div>
          <input
            id="stability-slider"
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            value={stability}
            onChange={(e) => onStabilityChange(parseFloat(e.target.value))}
          />
        </div>

        {/* Similarity Boost */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <Label htmlFor="similarity-slider">Similarity Boost</Label>
            <span className="font-mono text-sm text-black">{similarityBoost.toFixed(2)}</span>
          </div>
          <input
            id="similarity-slider"
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            value={similarityBoost}
            onChange={(e) => onSimilarityBoostChange(parseFloat(e.target.value))}
          />
        </div>

        {/* Style Exaggeration */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <Label htmlFor="style-slider">Style Exaggeration</Label>
            <span className="font-mono text-sm text-black">{style.toFixed(2)}</span>
          </div>
          <input
            id="style-slider"
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            value={style}
            onChange={(e) => onStyleChange(parseFloat(e.target.value))}
          />
        </div>

        {/* Speaker Boost Toggle */}
        <div className="flex items-center gap-4 pt-2">
          <button
            id="speaker-boost-toggle"
            type="button"
            onClick={() => onSpeakerBoostChange(!speakerBoost)}
            className={`w-10 h-5 border-2 border-black transition-colors duration-100 flex items-center p-[2px] focus:outline-none ${
              speakerBoost ? 'bg-black justify-end' : 'bg-white justify-start'
            }`}
          >
            <span className={`w-3 h-3 ${speakerBoost ? 'bg-white' : 'bg-black'}`} />
          </button>
          <label
            htmlFor="speaker-boost-toggle"
            className="font-mono text-xs uppercase tracking-widest text-black font-medium select-none cursor-pointer"
          >
            SPEAKER BOOST
          </label>
        </div>
      </div>
    </div>
  );
}
