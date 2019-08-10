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

  addUser(username) {
    const observable = new Observable<{username: string, valid: boolean}>(observer => {
      this.socket.emit('add user', username, (valid) => {
        observer.next({username, valid});
      });
    });
    return observable;

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

  onUsersUpdated() {
    const observable = new Observable<[]>(observer => {
      this.socket.on('users updated', (users) => {
        observer.next(users);
      });
    });
    return observable;
  }
}
