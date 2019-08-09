import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class HowlerService {
  sound: Howl;
  sounds: Howl[] = [];
  lyrics = [
    'creeper', 'aw man', 'so we back in the mine', 'got our pickaxe swinging from', 'side to side', 'side-side to side',
    'this task, a grueling one', 'hope to find some diamonds tonight, night, night', 'diamonds tonight', 'heads up',
    'you hear a sound, turn around and look up', 'total shock fills your body', 'oh no, it\'s you again',
    'i can never forget those', 'eyes, eyes, eyes, eyes-eyes-eyes', 'cause baby tonight',
    'the creeper\'s trying to steal all our stuff again', 'grab your pick, shovel, and bolt again', 'bolt again-gain',
    'and run, run until it\'s done, done', 'stuff again-gain', 'just when you think you\'re safe', 'overhear some hissing from',
    'right behind', 'right-right behind', 'that\'s a nice life you have', 'shame it\'s gotta end at this', 'time, time, time',
    'time-time-time-time', 'blows up', 'then your health bar drops and you could use a one-up', 'get inside, don\'t be tardy',
    'so now you\'re stuck in there', 'half a heart is left, but don\'t', 'die, die, die', 'die-die-die',
    'until the sun comes up in the morn', 'cause, baby, tonight'
  ];

  constructor() {
    for (let i = 0; i < this.lyrics.length; i++) {
      this.sounds[i] = new Howl({
        src: ['../../assets/sounds/' + this.lyrics[i] + '.mp3']
      });
    }
  }

  play(msg: string) {
    if (this.sound) {
      this.sound.stop();
    }

    this.lyrics.forEach(verse => {
      if (msg.toLowerCase() === verse) {
        this.sound = new Howl({
          src: ['../../assets/sounds/' + msg.toLowerCase() + '.mp3']
        });
        this.sound.play();
      }
    });
  }
}
