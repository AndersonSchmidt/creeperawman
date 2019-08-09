import { Component, OnInit, Input } from '@angular/core';
import { Howl } from 'howler';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages = [];
  @Input() user: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    let sound: Howl;

    this.chatService.onMsgAdded().subscribe(message => {
      if (message.user !== this.user) {
        this.messages.push(message);

        if (sound) {
          sound.stop();
        }
        sound = new Howl({
          src: ['../../assets/sounds/' + message.msg.toLowerCase() + '.mp3']
        });
        sound.play();

        // this.chatService.textToSpeech(message.msg).subscribe(sound64 => {
        //   sound = new Howl({
        //     src: ['data:audio/x-mp3;base64,' + sound64.audioContent]
        //   });
        //   sound.play();
        // });
      }
    });

    this.chatService.onLocalMsgAdded.subscribe((msg) => {
      const message = {
        user: this.user,
        msg
      };
      this.messages.push(message);

      if (sound) {
        sound.stop();
      }
      sound = new Howl({
        src: ['../../assets/sounds/' + msg.toLowerCase() + '.mp3']
      });
      sound.play();
    });
  }
}
