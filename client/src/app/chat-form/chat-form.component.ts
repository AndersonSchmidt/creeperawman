import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  onSubmitMsg(form: NgForm) {
    if (form.value.message) {
      this.chatService.onLocalMsgAdded.next(form.value.message);
      this.chatService.addMsg(form.value.message);
      form.reset();
    }
  }
}
