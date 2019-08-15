import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    'until the sun comes up in the morn', 'cause, baby, tonight', 'the creeper\'s trying to steal all our stuff again (creepers)',
    'you\'re mine, haha', 'dig up diamonds', 'and craft those diamonds', 'and make some armor',
    'get it, baby, go and forge that like you so mlg pro', 'the sword\'s made of diamonds, so come at me bro huh',
    'training in your room under the torchlight', 'hone that form to get you ready for the big fight',
    'every single day and the whole night', 'creeper\'s out prowlin, woo, alright', 'look at me, look at you',
    'take my revenge, that\'s what i\'m gonna do', 'i\'m a warrior, baby, what else is new',
    'and my blade\'s gonna tear through you (cause baby tonight) bring it',
    'the creeper\'s trying to steal all our stuff again (gather your stuff, yeah)', 'let\'s take back the world (yeah baby tonight) haha',
    'grab your sword, armor and go (it\'s on)', 'take your revenge (woo)', 'oh-oh-oh-oh so fight, fight, like it\'s the last',
    'last night of your life, life', 'show them your bite (woo)', 'cause, baby, tonight (ah ah)',
    '(ah ah) the creeper\'s trying to steal all our stuff again',
    'grab your pick, shovel and bolt again (bolt again-gain, woo)', 'and run run until it\'s done, done', 'cause baby, tonight',
    '(come on, swing your sword up high) the creeper\'s trying to steal all our stuff again (come on, jab your sword down low)',
    'woo', 'easter egg'
  ];

  constructor(private http: HttpClient) {
    for (let i = 0; i < this.lyrics.length; i++) {
      this.sounds[i] = new Howl({
        src: ['../../assets/sounds/' + this.lyrics[i] + '.mp3']
      });
    }
  }

  play(msg: string, sound64: string) {
    if (this.sound) {
      this.sound.stop();
    }

    if (sound64) {
      this.sound = new Howl({
          src: ['data:audio/x-mp3;base64,' + sound64]
        });
      this.sound.play();
    } else {
      this.lyrics.forEach(verse => {
        if (msg.trim().toLowerCase() === verse) {
          this.sound = new Howl({
            src: ['../../assets/sounds/' + msg.trim().toLowerCase() + '.mp3']
          });
          this.sound.play();
        }
      });
    }
  }

  textToSpeech(text: string) {
    let isToSpeech = true;
    this.lyrics.forEach(verse => {
      if (text.trim().toLowerCase() === verse) {
        isToSpeech = false;
      }
    });
    if (isToSpeech && text) {
      const reqBody = {
        audioConfig: {
          audioEncoding: 'LINEAR16',
          pitch: 0,
          speakingRate: 1
        },
        input: {
          text
        },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Standard-D'
        }
      };

      return this.http.post<{audioContent: string}>(
        'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDMOaGTUti--OxgCdhjwNGvQ2o3SVUeGmI',
        reqBody
      );
    } else {
      return new Observable<{audioContent: string}>(observer => {
        observer.next();
      });
    }
  }
}
