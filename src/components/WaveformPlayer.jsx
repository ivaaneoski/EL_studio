import React, { useState, useEffect, useRef } from 'react';

export default function WaveformPlayer({ audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [decoded, setDecoded] = useState(false);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const visualizerRef = useRef(null);
  const peaks = useRef([]);

  // Web Audio Context refs
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Handle audio context setup on first play gesture
  const setupAudioContext = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64; // 32 frequency bins
      
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
    } catch (e) {
      console.error("Web Audio API setup failed:", e);
    }
  };

  // Decode audio data and extract waveform peaks
  useEffect(() => {
    setDecoded(false);
    peaks.current = [];

    const decodeAudio = async () => {
      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const tempCtx = new AudioContextClass();
        const decodedBuffer = await tempCtx.decodeAudioData(arrayBuffer);
        await tempCtx.close();

        const channelData = decodedBuffer.getChannelData(0);
        
        // Calculate canvas physical dimensions based on DPR
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const drawWidth = rect.width;
        
        const barWidth = 2;
        const gap = 2;
        const totalBars = Math.floor(drawWidth / (barWidth + gap));
        const step = Math.floor(channelData.length / totalBars);

        const calculatedPeaks = [];
        for (let i = 0; i < totalBars; i++) {
          let max = 0;
          const start = i * step;
          for (let j = 0; j < step; j++) {
            const val = Math.abs(channelData[start + j]);
            if (val > max) max = val;
          }
          calculatedPeaks.push(max || 0.03); // Minimum visible peak
        }
        
        peaks.current = calculatedPeaks;
        setDecoded(true);
      } catch (err) {
        console.error("Error decoding audio buffer:", err);
      }
    };

    decodeAudio();
  }, [audioUrl]);

  // Canvas size and theme drawing trigger
  useEffect(() => {
    if (!decoded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      drawWaveform();
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    
    // Listen for dark/light mode switches
    const observer = new MutationObserver(setupCanvas);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('resize', setupCanvas);
      observer.disconnect();
    };
  }, [decoded, currentTime, duration]);

  // Main canvas drawing function
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas || !peaks.current.length) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, width, height);

    const styles = getComputedStyle(document.documentElement);
    const fg = styles.getPropertyValue('--fg').trim() || '#000000';
    const mutedFg = styles.getPropertyValue('--muted-fg').trim() || '#525252';

    const currentPercent = duration > 0 ? currentTime / duration : 0;
    const playheadX = width * currentPercent;

    const data = peaks.current;
    const barWidth = 2;
    const gap = 2;

    for (let i = 0; i < data.length; i++) {
      const x = i * (barWidth + gap);
      const val = data[i];
      const barHeight = val * (height * 0.8);
      const y = (height - barHeight) / 2;

      if (x <= playheadX) {
        ctx.fillStyle = fg;
      } else {
        ctx.fillStyle = mutedFg + '33'; // ~20% opacity unplayed
      }

      ctx.fillRect(x, y, barWidth, barHeight);
    }

    // Playhead vertical line
    ctx.fillStyle = fg;
    ctx.fillRect(playheadX - 1, 0, 1.5, height);
  };

  // Spectrum visualizer loop
  const startVisualizer = () => {
    if (!analyserRef.current || !visualizerRef.current) return;
    const canvas = visualizerRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      if (!isPlayingRef.current) {
        ctx.clearRect(0, 0, width, height);
        return;
      }
      animationRef.current = requestAnimationFrame(render);
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, width, height);
      
      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue('--fg').trim() || '#000000';
      ctx.fillStyle = fg;

      const barWidth = 3;
      const gap = 1;
      const count = 12;

      for (let i = 0; i < count; i++) {
        const index = Math.floor((i / count) * (bufferLength * 0.65));
        const val = dataArray[index] || 0;
        const barHeight = (val / 255) * height * 0.9;
        const x = i * (barWidth + gap);
        const y = height - barHeight;
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    render();
  };

  useEffect(() => {
    if (isPlaying) {
      startVisualizer();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (visualizerRef.current) {
        const ctx = visualizerRef.current.getContext('2d');
        ctx.clearRect(0, 0, visualizerRef.current.width, visualizerRef.current.height);
      }
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    setupAudioContext();

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const handleCanvasClick = (e) => {
    if (!audioRef.current || !duration || !decoded) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickPercent = x / rect.width;
    
    audioRef.current.currentTime = clickPercent * duration;
    setCurrentTime(audioRef.current.currentTime);
    drawWaveform();
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full border-2 border-black bg-white p-5 space-y-4">
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        crossOrigin="anonymous"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Waveform Canvas */}
      <div className="w-full h-[80px] relative bg-muted/20 border border-border-light cursor-pointer select-none">
        {!decoded ? (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-fg tracking-widest animate-pulse">
            DECODING AUDIO WAVEFORM...
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full block"
          />
        )}
      </div>

      {/* Custom Control Row */}
      <div className="flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handlePlayPause}
            disabled={!decoded}
            className="px-6 py-2.5 font-mono text-xs uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border-2 border-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-100 font-bold"
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>
          
          <div className="font-mono text-xs text-black font-medium">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Real-time spectrum bar visualizer */}
        <div className="h-[20px] flex items-center">
          <canvas
            ref={visualizerRef}
            width="50"
            height="20"
            className="block"
          />
        </div>
      </div>
    </div>
  );
}
