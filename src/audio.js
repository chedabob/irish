let irishVoice = null;
let fallbackVoice = null;
let ready = false;

function findVoices() {
  const voices = speechSynthesis.getVoices();
  irishVoice = voices.find(v => v.lang === 'ga-IE' || v.lang === 'ga') ?? null;
  fallbackVoice =
    voices.find(v => v.lang.startsWith('en-IE')) ??
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

export function speak(text, useIrish = true) {
  if (typeof speechSynthesis === 'undefined') return Promise.resolve();
  speechSynthesis.cancel();

  return new Promise(resolve => {
    const utt = new SpeechSynthesisUtterance(text);
    const voice = useIrish ? (irishVoice ?? fallbackVoice) : fallbackVoice;
    if (voice) utt.voice = voice;
    utt.lang = useIrish && irishVoice ? 'ga-IE' : 'en-IE';
    utt.rate = 0.85;
    utt.pitch = 1.0;
    utt.onend = resolve;
    utt.onerror = resolve;
    speechSynthesis.speak(utt);
  });
}

export function stop() {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
}
