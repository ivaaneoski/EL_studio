import { useState } from 'react';

export function useElevenLabs() {
  const [voices, setVoices] = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [generatingAudio, setGeneratingAudio] = useState(false);
  const [error, setError] = useState(null);

  const fetchVoices = async (apiKey) => {
    if (!apiKey) return;
    setLoadingVoices(true);
    setError(null);
    try {
      const response = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: {
          "xi-api-key": apiKey,
        },
      });

      if (!response.ok) {
        let msg = `${response.status} ${response.statusText}`;
        if (response.status === 401) {
          throw new Error("401");
        }
        if (response.status === 429) {
          throw new Error("429");
        }
        try {
          const errData = await response.json();
          if (errData && errData.detail && errData.detail.message) {
            msg = errData.detail.message;
          }
        } catch (_) {}
        throw new Error(msg);
      }

      const data = await response.json();
      const sortedVoices = (data.voices || []).sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      setVoices(sortedVoices);
      return sortedVoices;
    } catch (err) {
      let friendly = err.message;
      if (err.message === "401" || err.message.includes("401")) {
        friendly = "Invalid API key. Check your ElevenLabs key and try again.";
      } else if (err.message === "429" || err.message.includes("429")) {
        friendly = "Quota exceeded. You've used your character limit for this period.";
      } else if (err.message === "Failed to fetch") {
        friendly = "Network error. Check your connection.";
      }
      setError(friendly);
      setVoices([]);
      throw new Error(friendly);
    } finally {
      setLoadingVoices(false);
    }
  };

  const generateAudio = async ({
    apiKey,
    text,
    voiceId,
    modelId,
    languageCode,
    stability,
    similarityBoost,
    style,
    useSpeakerBoost,
    outputFormat,
    codec,
  }) => {
    if (!apiKey) {
      const errText = "API Key is required";
      setError(errText);
      throw new Error(errText);
    }
    setGeneratingAudio(true);
    setError(null);

    let acceptHeader = "audio/mpeg";
    if (codec === "PCM" || codec === "WAV") {
      acceptHeader = "audio/wav";
    } else if (codec === "ULAW") {
      acceptHeader = "audio/basic";
    }

    try {
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${outputFormat}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": acceptHeader,
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          language_code: languageCode,
          voice_settings: {
            stability,
            similarity_boost: similarityBoost,
            style,
            use_speaker_boost: useSpeakerBoost,
          },
          output_format: outputFormat,
        }),
      });

      if (!response.ok) {
        let msg = `${response.status} ${response.statusText}`;
        if (response.status === 401) {
          throw new Error("401");
        }
        if (response.status === 429) {
          throw new Error("429");
        }
        try {
          const errData = await response.json();
          if (errData && errData.detail && errData.detail.message) {
            msg = errData.detail.message;
          }
        } catch (_) {}
        throw new Error(msg);
      }

      const blob = await response.blob();
      const size = blob.size;
      const urlBlob = URL.createObjectURL(blob);
      return { url: urlBlob, size };
    } catch (err) {
      let friendly = err.message;
      if (err.message === "401" || err.message.includes("401")) {
        friendly = "Invalid API key. Check your ElevenLabs key and try again.";
      } else if (err.message === "429" || err.message.includes("429")) {
        friendly = "Quota exceeded. You've used your character limit for this period.";
      } else if (err.message === "Failed to fetch") {
        friendly = "Network error. Check your connection.";
      }
      setError(friendly);
      throw new Error(friendly);
    } finally {
      setGeneratingAudio(false);
    }
  };

  return {
    voices,
    loadingVoices,
    generatingAudio,
    error,
    setError,
    fetchVoices,
    generateAudio,
  };
}
