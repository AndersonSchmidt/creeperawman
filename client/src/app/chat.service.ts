import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  onLocalMsgAdded = new Subject<{msg: string, sound64: string}>();

  private socket = io('http://localhost:8081');

  constructor(private http: HttpClient) { }

  addUser(data) {
    this.socket.emit('add user', data);
  }

  addMsg(msg, sound64) {
    this.socket.emit('add msg', {msg, sound64});
  }

  onMsgAdded() {
    const observable = new Observable<{user: string, msg: string, sound64: string}>(observer => {
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
}
