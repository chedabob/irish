let irishVoice = null;
let fallbackVoice = null;
let ready = false;

function findVoices() {
  const voices = speechSynthesis.getVoices();
  irishVoice = voices.find(v => v.lang === 'ga-IE' || v.lang === 'ga') ?? null;
  fallbackVoice =
    voices.find(v => v.lang.startsWith('en-IE')) ??
    voices.find(v => v.lang.startsWith('en-GB')) ??
    voices.find(v => v.lang.startsWith('en')) ??
    null;
  ready = voices.length > 0;
}

if (typeof speechSynthesis !== 'undefined') {
  findVoices();
  speechSynthesis.addEventListener('voiceschanged', findVoices);
}

export function canSpeak() {
  return typeof speechSynthesis !== 'undefined' && ready;
}

export function hasIrishVoice() {
  return !!irishVoice;
}

// irish: the actual Irish text
// tts:   phonetic English approximation — used when no Irish voice available
export function speak(irish, tts) {
  if (typeof speechSynthesis === 'undefined') return Promise.resolve();
  speechSynthesis.cancel();

  // If we have a real Irish voice, use the Irish text — it knows how to pronounce it.
  // Otherwise use the phonetic approximation so an English voice sounds passable.
  const useIrishVoice = !!irishVoice;
  const text = useIrishVoice ? irish : (tts ?? irish);
  const voice = useIrishVoice ? irishVoice : fallbackVoice;

  return new Promise(resolve => {
    const utt = new SpeechSynthesisUtterance(text);
    if (voice) utt.voice = voice;
    utt.lang = useIrishVoice ? 'ga-IE' : (fallbackVoice?.lang ?? 'en-IE');
    utt.rate = 0.82;
    utt.pitch = 1.0;
    utt.onend = resolve;
    utt.onerror = resolve;
    speechSynthesis.speak(utt);
  });
}

export function stop() {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
}
