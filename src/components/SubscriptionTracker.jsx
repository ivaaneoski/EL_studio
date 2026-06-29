import React from 'react';

export default function SubscriptionTracker({ subscription }) {
  if (!subscription) return null;

  const { character_count, character_limit } = subscription;
  const count = character_count || 0;
  const limit = character_limit || 0;
  const percent = limit > 0 ? (count / limit) * 100 : 0;
  const formattedPercent = percent.toFixed(1);

  const formatNumber = (num) => new Intl.NumberFormat().format(num);

  return (
    <div className="w-full bg-white border-2 border-black p-4 mb-6 font-mono select-none animate-fade-in-slide">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
        <span className="text-xs uppercase tracking-widest text-black font-bold">
          CHARACTER BALANCE
        </span>
        <span className="text-xs text-muted-fg font-medium">
          {formatNumber(count)} / {formatNumber(limit)} CHARACTERS USED ({formattedPercent}%)
        </span>
      </div>
      <div className="w-full h-3 border border-black bg-white p-[1px] flex">
        <div
          className="bg-black h-full transition-[width] duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
}
