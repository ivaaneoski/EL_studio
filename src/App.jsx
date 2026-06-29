import React, { useState, useRef } from 'react';
import PageHeader from './components/PageHeader';
import SectionDivider from './components/SectionDivider';
import ApiKeyInput from './components/ApiKeyInput';
import TextInput from './components/TextInput';
import VoiceSettings from './components/VoiceSettings';
import VoiceParameters from './components/VoiceParameters';
import OutputFormat from './components/OutputFormat';
import GenerateButton from './components/GenerateButton';
import AudioOutput from './components/AudioOutput';
import ErrorBox from './components/ErrorBox';
import { useElevenLabs } from './hooks/useElevenLabs';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState('');
  const [modelId, setModelId] = useState('eleven_multilingual_v2');
  const [languageCode, setLanguageCode] = useState('en');
  const [stability, setStability] = useState(0.5);
  const [similarityBoost, setSimilarityBoost] = useState(0.75);
  const [style, setStyle] = useState(0.0);
  const [speakerBoost, setSpeakerBoost] = useState(false);
  const [codec, setCodec] = useState('MP3');
  const [formatValue, setFormatValue] = useState('mp3_44100_128');
  const [audioData, setAudioData] = useState(null);

  const {
    voices,
    loadingVoices,
    generatingAudio,
    error,
    setError,
    fetchVoices,
    generateAudio,
  } = useElevenLabs();

  const outputRef = useRef(null);

  const handleLoadVoices = async () => {
    if (!apiKey.trim()) {
      setError("Please paste an ElevenLabs API key first.");
      return;
    }
    try {
      const loadedVoices = await fetchVoices(apiKey.trim());
      if (loadedVoices && loadedVoices.length > 0) {
        const rachel = loadedVoices.find(v => v.name.toLowerCase() === 'rachel');
        if (rachel) {
          setVoiceId(rachel.voice_id);
        } else {
          setVoiceId(loadedVoices[0].voice_id);
        }
      }
    } catch (_) {
      // Errors are already handled inside the hook
    }
  };

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError("API Key is required to generate audio.");
      return;
    }
    if (!text.trim()) {
      setError("Text is required to generate audio.");
      return;
    }
    if (!voiceId) {
      setError("Please select a voice first. If the dropdown is empty, load voices using your API key.");
      return;
    }

    try {
      setAudioData(null);
      const result = await generateAudio({
        apiKey: apiKey.trim(),
        text,
        voiceId,
        modelId,
        languageCode,
        stability,
        similarityBoost,
        style,
        useSpeakerBoost: speakerBoost,
        outputFormat: formatValue,
        codec,
      });

      setAudioData(result);
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (_) {
      // Errors are handled inside the hook
    }
  };

  return (
    <main className="max-w-[760px] mx-auto px-6 py-12">
      {/* Header */}
      <PageHeader />
      <SectionDivider />

      <div className="space-y-6">
        {/* API Key Input */}
        <ApiKeyInput
          value={apiKey}
          onChange={setApiKey}
          onLoadVoices={handleLoadVoices}
          loading={loadingVoices}
        />

        {/* 1px light rule */}
        <hr className="border-t border-[#E5E5E5] my-6" />

        {/* Text Input */}
        <TextInput
          value={text}
          onChange={setText}
        />
        
        <SectionDivider />

        {/* Voice Settings */}
        <VoiceSettings
          voices={voices}
          loadingVoices={loadingVoices}
          selectedVoiceId={voiceId}
          onVoiceChange={setVoiceId}
          selectedModelId={modelId}
          onModelChange={setModelId}
          languageCode={languageCode}
          onLanguageChange={setLanguageCode}
        />

        <SectionDivider />

        {/* Voice Parameters */}
        <VoiceParameters
          stability={stability}
          onStabilityChange={setStability}
          similarityBoost={similarityBoost}
          onSimilarityBoostChange={setSimilarityBoost}
          style={style}
          onStyleChange={setStyle}
          speakerBoost={speakerBoost}
          onSpeakerBoostChange={setSpeakerBoost}
        />

        <SectionDivider />

        {/* Output Format */}
        <OutputFormat
          codec={codec}
          onCodecChange={setCodec}
          formatValue={formatValue}
          onFormatChange={setFormatValue}
        />

        <SectionDivider />

        {/* Generate Button */}
        <GenerateButton
          onClick={handleGenerate}
          loading={generatingAudio}
          disabled={loadingVoices}
        />

        {/* Errors Box */}
        {error && (
          <div className="mt-6">
            <ErrorBox error={error} />
          </div>
        )}

        {/* Audio Output */}
        {audioData && (
          <div ref={outputRef} className="pt-6">
            <SectionDivider />
            <AudioOutput
              audioData={audioData}
              codec={codec}
              formatValue={formatValue}
            />
          </div>
        )}
      </div>
    </main>
  );
}
