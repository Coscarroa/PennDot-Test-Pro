import { Language } from '../types';

class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;
  public isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  speak(text: string, lang: Language, onEnd?: () => void) {
    if (!this.synth) return;
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'es' ? 'es-US' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick suitable voice if available
    const voices = this.synth.getVoices();
    const targetLangPrefix = lang === 'es' ? 'es' : 'en';
    const matchVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetLangPrefix));
    if (matchVoice) {
      utterance.voice = matchVoice;
    }

    this.isSpeaking = true;

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }
}

export const tts = new TextToSpeechService();
