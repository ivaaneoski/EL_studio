import React from 'react';
import Label from './Label';
import { MODELS } from '../constants/models';

export default function VoiceSettings({
  voices,
  loadingVoices,
  selectedVoiceId,
  onVoiceChange,
  selectedModelId,
  onModelChange,
  languageCode,
  onLanguageChange,
}) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-tight text-black mb-4">
        VOICE SETTINGS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="voice-select">
            {loadingVoices ? "LOADING VOICES..." : "Voice"}
          </Label>
          <select
            id="voice-select"
            value={selectedVoiceId}
            onChange={(e) => onVoiceChange(e.target.value)}
            disabled={loadingVoices || voices.length === 0}
            className="w-full px-4 py-3 bg-white border-2 border-black font-body text-sm transition-[border-width] duration-100 disabled:opacity-50"
          >
            {voices.length === 0 ? (
              <option value="">
                {loadingVoices ? "Loading voices..." : "No voices loaded — enter API key"}
              </option>
            ) : (
              voices.map((voice) => (
                <option key={voice.voice_id} value={voice.voice_id}>
                  {voice.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <Label htmlFor="model-select">Model</Label>
          <select
            id="model-select"
            value={selectedModelId}
            onChange={(e) => onModelChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-black font-body text-sm transition-[border-width] duration-100"
          >
            {MODELS.map((model) => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="language-input">Language</Label>
        <input
          id="language-input"
          type="text"
          value={languageCode}
          onChange={(e) => onLanguageChange(e.target.value)}
          placeholder="e.g. en"
          className="w-full px-4 py-3 bg-white border-2 border-black font-body text-sm placeholder:italic placeholder:text-muted-fg transition-[border-width] duration-100"
        />
        <p className="font-mono text-xs text-muted-fg mt-1.5">
          ISO 639-1 language code — e.g. en, fr, de, es, hi
        </p>
      </div>
    </div>
  );
}
