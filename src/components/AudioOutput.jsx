import React from 'react';
import { FORMAT_MAP } from '../constants/formats';

export default function AudioOutput({ audioData, codec, formatValue }) {
  if (!audioData) return null;

  const { url, size } = audioData;

  const formatList = FORMAT_MAP[codec] || [];
  const currentFormat = formatList.find(f => f.value === formatValue) || {};
  const ext = currentFormat.ext || 'mp3';

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formattedSize = formatBytes(size);

  const rawLabel = currentFormat.label || '';
  const cleanedLabel = rawLabel
    .replace(/\s*\(default\)/gi, '')
    .replace(/\s*—\s*/g, ' · ');

  const codecDisplay = codec === 'ULAW' ? 'μ-law' : codec;
  const metadata = `${codecDisplay} · ${cleanedLabel} · ${formattedSize}`;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `el-studio-output.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-tight text-black">
        OUTPUT
      </h2>

      <div className="space-y-4">
        <audio
          controls
          src={url}
          className="w-full border-2 border-black focus:outline-none"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <span className="font-mono text-xs text-[#525252] tracking-wider">
            {metadata}
          </span>

          <button
            type="button"
            onClick={handleDownload}
            className="px-8 py-4 font-mono text-sm uppercase tracking-widest bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-100 select-none text-center shrink-0"
          >
            DOWNLOAD FILE →
          </button>
        </div>
      </div>
    </div>
  );
}
