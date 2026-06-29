export const FORMAT_MAP = {
  MP3: [
    { value: "mp3_22050_32",  label: "22,050 Hz — 32 kbps",  ext: "mp3" },
    { value: "mp3_44100_32",  label: "44,100 Hz — 32 kbps",  ext: "mp3" },
    { value: "mp3_44100_64",  label: "44,100 Hz — 64 kbps",  ext: "mp3" },
    { value: "mp3_44100_96",  label: "44,100 Hz — 96 kbps",  ext: "mp3" },
    { value: "mp3_44100_128", label: "44,100 Hz — 128 kbps (default)", ext: "mp3" },
    { value: "mp3_44100_192", label: "44,100 Hz — 192 kbps", ext: "mp3" },
  ],
  WAV: [
    { value: "wav_8000",  label: "8,000 Hz",  ext: "wav" },
    { value: "wav_16000", label: "16,000 Hz", ext: "wav" },
    { value: "wav_22050", label: "22,050 Hz", ext: "wav" },
    { value: "wav_24000", label: "24,000 Hz", ext: "wav" },
    { value: "wav_32000", label: "32,000 Hz", ext: "wav" },
    { value: "wav_44100", label: "44,100 Hz", ext: "wav" },
    { value: "wav_48000", label: "48,000 Hz", ext: "wav" },
  ],
  PCM: [
    { value: "pcm_8000",  label: "8,000 Hz",  ext: "wav" },
    { value: "pcm_16000", label: "16,000 Hz", ext: "wav" },
    { value: "pcm_22050", label: "22,050 Hz", ext: "wav" },
    { value: "pcm_24000", label: "24,000 Hz", ext: "wav" },
    { value: "pcm_44100", label: "44,100 Hz", ext: "wav" },
  ],
  ULAW: [
    { value: "ulaw_8000", label: "8,000 Hz — μ-law (telephony)", ext: "ulaw" },
  ],
};
