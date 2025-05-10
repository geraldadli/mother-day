import { Howl } from 'howler';

class AudioManager {
  private static instance: AudioManager;
  private backgroundMusic: Howl | null = null;
  private soundEffects: Map<string, Howl> = new Map();
  private isMuted: boolean = false;

  private constructor() {
    // Initialize sound effects
    this.soundEffects.set('cardOpen', new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2019/jul/26/sfx-47.mp3'],
      volume: 0.5,
    }));
    
    this.soundEffects.set('cardClose', new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2021/feb/10/sfx-1115.mp3'],
      volume: 0.5,
    }));
    
    this.soundEffects.set('buttonClick', new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/1115/sfx-click-1.mp3'],
      volume: 0.3,
    }));

    // Initialize background music
    this.backgroundMusic = new Howl({
      src: ['src/utils/canyon.mp3'],
      loop: true,
      volume: 0.2,
    });
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public playBackgroundMusic(): void {
    if (this.backgroundMusic && !this.isMuted) {
      this.backgroundMusic.play();
    }
  }

  public stopBackgroundMusic(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
    }
  }

  public playSoundEffect(name: string): void {
    const sound = this.soundEffects.get(name);
    if (sound && !this.isMuted) {
      sound.play();
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.backgroundMusic) {
      if (muted) {
        this.backgroundMusic.stop();
      } else {
        this.backgroundMusic.play();
      }
    }
  }

  public isMusicPlaying(): boolean {
    return this.backgroundMusic ? this.backgroundMusic.playing() : false;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export default AudioManager;