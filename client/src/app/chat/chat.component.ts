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
    this.chatService.onMsgAdded().subscribe(message => {
      this.messages.push(message);
      // const sound = new Howl({
      //   src: ['http://localhost:3000/sounds/OOF.mp4']
      // });
      // sound.play();
    });
    this.chatService.onUserAdded().subscribe(users => {
      this.users = users;
    });
  }

}
