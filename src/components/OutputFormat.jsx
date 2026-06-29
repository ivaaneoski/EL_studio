import React from 'react';
import Label from './Label';
import { FORMAT_MAP } from '../constants/formats';

export default function OutputFormat({
  codec,
  onCodecChange,
  formatValue,
  onFormatChange,
}) {
  const currentOptions = FORMAT_MAP[codec] || [];

  const handleCodecChange = (newCodec) => {
    onCodecChange(newCodec);
    const firstOption = FORMAT_MAP[newCodec]?.[0];
    if (firstOption) {
      onFormatChange(firstOption.value);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-tight text-black mb-4">
        OUTPUT FORMAT
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="codec-select">Codec</Label>
          <select
            id="codec-select"
            value={codec}
            onChange={(e) => handleCodecChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-black font-body text-sm transition-[border-width] duration-100"
          >
            <option value="MP3">MP3</option>
            <option value="WAV">WAV</option>
            <option value="PCM">PCM</option>
            <option value="ULAW">μ-law</option>
          </select>
        </div>

        <div>
          <Label htmlFor="format-select">Sample Rate</Label>
          <select
            id="format-select"
            value={formatValue}
            onChange={(e) => onFormatChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-black font-body text-sm transition-[border-width] duration-100"
          >
            {currentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="font-mono text-xs text-[#525252] mt-1.5 leading-relaxed">
        PCM outputs raw uncompressed audio (saved as .wav). μ-law is for telephony systems at 8 kHz.
      </p>
    </div>
  );
}
