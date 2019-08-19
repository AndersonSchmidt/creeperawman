import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { HowlerService } from '../howler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages = [];
  onLocalMsgAddedSub: Subscription;
  @Input() user: string;

  constructor(private chatService: ChatService, private howlerService: HowlerService) { }

  ngOnInit() {
    this.chatService.onMsgAdded().subscribe(message => {
      if (message.user !== this.user) {
        this.messages.push(message);

        this.howlerService.play(message.msg, message.sound64);
      }
    });

    this.onLocalMsgAddedSub = this.chatService.onLocalMsgAdded.subscribe(({msg, sound64}) => {
      const message = {
        user: this.user,
        msg
      };
      this.messages.push(message);

      this.howlerService.play(msg, sound64);
    });
  }

  ngOnDestroy() {
    this.onLocalMsgAddedSub.unsubscribe();
  }
}
