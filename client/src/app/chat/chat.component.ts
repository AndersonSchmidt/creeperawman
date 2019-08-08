import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { ChatService } from '../chat.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages = [];
  users = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    let sound: Howl;
    this.chatService.onMsgAdded().subscribe(message => {
      this.messages.push(message);
      if (sound) {
        sound.stop();
      }
      // let path = '';

      // switch (message.msg) {
      //   case 'Creeper':
      //     path = 'Creeper';
      //     break;
      //   case 'Aw man':
      //     path = 'Aw man';
      //     break;
      // }

      sound = new Howl({
        src: ['../../assets/sounds/' + message.msg + '.mp3']
      });
      sound.play();

    });
    this.chatService.onUserAdded().subscribe(users => {
      this.users = users;
    });
  }

}
