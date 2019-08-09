import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { ChatService } from '../chat.service';

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
        src: ['../../assets/sounds/' + message.msg.toLowerCase() + '.mp3']
      });
      sound.play();


      // this.chatService.textToSpeech(message.msg).subscribe(sound64 => {
      //   sound = new Howl({
      //     src: ['data:audio/x-mp3;base64,' + sound64.audioContent]
      //   });
      //   sound.play();
      // });

    });
  }

}
