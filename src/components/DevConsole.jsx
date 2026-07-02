import React, { useState } from 'react';

export default function DevConsole({ logData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!logData) return null;

  const {
    url,
    method,
    body,
    headers,
    latencyMs,
    status,
    statusText,
    contentType,
    sizeBytes,
  } = logData;

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const calculateSpeed = () => {
    if (!sizeBytes || !latencyMs) return '0 KB/s';
    const seconds = latencyMs / 1000;
    const speedBytesPerSec = sizeBytes / seconds;
    const k = 1024;
    if (speedBytesPerSec < k * k) {
      return (speedBytesPerSec / k).toFixed(1) + ' KB/s';
    }
    return (speedBytesPerSec / (k * k)).toFixed(1) + ' MB/s';
  };

  const curlCommand = `curl -X ${method} "${url}" \\
  -H "xi-api-key: ••••••••••••••••" \\
  -H "Content-Type: application/json" \\
  -H "Accept: ${headers.Accept}" \\
  -d '${JSON.stringify(body, null, 2).replace(/'/g, "'\\''")}'`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full border-2 border-black bg-white select-none transition-all duration-200">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-black text-white hover:bg-white hover:text-black transition-colors duration-100 font-mono text-xs uppercase tracking-widest font-bold border-b border-black"
      >
        <span>[DEVELOPER CONSOLE]</span>
        <span>
          HTTP {status} {statusText} · {latencyMs}ms {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 bg-muted font-mono text-xs text-black leading-relaxed space-y-4 animate-fade-in-slide border-t-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* HTTP Details */}
            <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-border-light pb-4 md:pb-0 md:pr-4">
              <div className="text-muted-fg font-bold uppercase tracking-wider text-[10px]">
                API REQUEST & RESPONSE
              </div>
              <div>
                <span className="font-bold">METHOD:</span> {method}
              </div>
              <div className="break-all">
                <span className="font-bold">ENDPOINT:</span> {url.split('?')[0]}
              </div>
              <div>
                <span className="font-bold">STATUS:</span> {status} {statusText}
              </div>
              <div>
                <span className="font-bold">CONTENT-TYPE:</span> {contentType}
              </div>
            </div>

            {/* Performance Telemetry */}
            <div className="space-y-1.5">
              <div className="text-muted-fg font-bold uppercase tracking-wider text-[10px]">
                PERFORMANCE METRICS
              </div>
              <div>
                <span className="font-bold">LATENCY (RTT):</span> {latencyMs} ms
              </div>
              <div>
                <span className="font-bold">PAYLOAD SIZE:</span> {formatBytes(sizeBytes)} ({sizeBytes} bytes)
              </div>
              <div>
                <span className="font-bold">TRANSFER SPEED:</span> {calculateSpeed()}
              </div>
            </div>
          </div>

          <hr className="border-t border-border-light" />

          {/* cURL Inspector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-fg font-bold uppercase tracking-wider text-[10px]">
                EQUIVALENT CURL REQUEST (MASKED KEY)
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-2 py-1 bg-black text-white hover:bg-white hover:text-black border border-black text-[10px] font-bold tracking-widest transition-colors duration-100 uppercase"
              >
                {copied ? '[COPIED!]' : '[COPY CURL]'}
              </button>
            </div>
            <pre className="w-full p-3 bg-white border border-border-light text-[11px] overflow-x-auto whitespace-pre leading-normal block max-h-[150px] scrollbar-thin select-all">
              {curlCommand}
            </pre>
          </div>

          <hr className="border-t border-border-light" />

          {/* Request Payload JSON */}
          <div className="space-y-2">
            <span className="text-muted-fg font-bold uppercase tracking-wider text-[10px] block">
              REQUEST PAYLOAD BODY (JSON)
            </span>
            <pre className="w-full p-3 bg-white border border-border-light text-[11px] overflow-x-auto whitespace-pre leading-normal block max-h-[150px] scrollbar-thin select-all">
              {JSON.stringify(body, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
