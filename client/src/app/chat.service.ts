import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('http://localhost:3000');

  constructor() { }

  addUser(data) {
    this.socket.emit('add user', data);
  }

  addMsg(data) {
    this.socket.emit('add msg', data);
  }

  onMsgAdded() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('msg added', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  onUserAdded() {
    const observable = new Observable<string[]>(observer => {
      this.socket.on('user added', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

}
