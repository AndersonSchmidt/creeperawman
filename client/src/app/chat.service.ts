import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('creeperawman.us-east-2.elasticbeanstalk.com');

  constructor(private http: HttpClient) { }

  addUser(data) {
    this.socket.emit('add user', data);
  }

  addMsg(data) {
    this.socket.emit('add msg', data);
  }

  onMsgAdded() {
    const observable = new Observable<{user: string, msg: string}>(observer => {
      this.socket.on('msg added', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  onUserAdded() {
    const observable = new Observable<number>(observer => {
      this.socket.on('user added', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  onUserRemoved() {
    const observable = new Observable<number>(observer => {
      this.socket.on('user removed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  textToSpeech(text: string) {
    const reqBody = {
      audioConfig: {
        audioEncoding: 'LINEAR16',
        pitch: 0,
        speakingRate: 1
      },
      input: {
        text: text
      },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Standard-D'
      }
    };

    return this.http.post<{audioContent: string}>('https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDMOaGTUti--OxgCdhjwNGvQ2o3SVUeGmI', reqBody);
  }

}
