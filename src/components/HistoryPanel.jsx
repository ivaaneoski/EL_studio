import React, { useState } from 'react';

export default function HistoryPanel({ items, onSelectItem, onDeleteItem, onClearAll }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${hours}:${minutes}`;
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all history entries from this device? This cannot be undone.")) {
      onClearAll();
    }
  };

  return (
    <div className="w-full border-2 border-black bg-white select-none transition-all duration-200">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-black text-white hover:bg-white hover:text-black transition-colors duration-100 font-mono text-xs uppercase tracking-widest font-bold border-b border-black"
      >
        <span>[GENERATION HISTORY]</span>
        <span>
          {items.length} {items.length === 1 ? 'RECORD' : 'RECORDS'} {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-5 bg-white space-y-4 animate-fade-in-slide border-t-0">
          {items.length === 0 ? (
            <div className="text-center py-6 font-mono text-xs text-muted-fg tracking-wider">
              NO OFFLINE GENERATIONS CACHED ON THIS DEVICE.
            </div>
          ) : (
            <>
              {/* Header actions */}
              <div className="flex justify-end pb-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-mono text-xs uppercase tracking-widest text-[#ef4444] hover:text-[#b91c1c] transition-colors duration-100 font-bold"
                >
                  [CLEAR ALL HISTORY]
                </button>
              </div>

              {/* Scrollable list */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group border border-border-light hover:border-black p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 transition-colors duration-100 bg-muted/10 cursor-pointer"
                    onClick={() => onSelectItem(item)}
                  >
                    {/* Item Details */}
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider font-bold">
                        <span className="text-black uppercase">{item.voiceName || "Unknown Voice"}</span>
                        <span className="text-muted-fg">·</span>
                        <span className="text-muted-fg">{formatDate(item.timestamp)}</span>
                        <span className="text-muted-fg">·</span>
                        <span className="text-muted-fg">{item.codec || "MP3"}</span>
                      </div>
                      <p className="font-body text-xs text-black italic line-clamp-1 truncate group-hover:text-black">
                        "{item.text}"
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                      <span className="font-mono text-[10px] text-muted-fg tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-150 uppercase">
                        [LOAD RUN]
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteItem(item.id);
                        }}
                        className="font-mono text-[10px] text-muted-fg hover:text-[#ef4444] tracking-widest font-bold transition-colors duration-100 uppercase"
                      >
                        [DELETE]
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
