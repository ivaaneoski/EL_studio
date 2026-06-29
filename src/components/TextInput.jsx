import React from 'react';
import Label from './Label';

export default function TextInput({ value, onChange }) {
  const maxLength = 5000;
  const length = value.length;
  const isApproachingLimit = length > 4500;

  return (
    <div className="w-full">
      <Label htmlFor="text-input">Text Input</Label>
      <textarea
        id="text-input"
        rows={6}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type text to convert to speech..."
        className="w-full px-4 py-3 bg-white border-2 border-black font-body text-base placeholder:italic placeholder:text-[#525252] transition-[border-width] duration-100 resize-y"
      />
      <div className="flex justify-end mt-1">
        <span
          className={`font-mono text-xs ${
            isApproachingLimit ? 'text-black font-medium' : 'text-[#525252]'
          }`}
        >
          {length} / {maxLength}
        </span>
      </div>
    </div>
  );
}
