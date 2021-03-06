import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../chat.service';
import { HowlerService } from '../howler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit, OnDestroy {
  sound64 = '';
  subscription: Subscription;
  chatLoading: boolean;

  @ViewChild('message', {static: false}) messageField: ElementRef;

  constructor(private chatService: ChatService, private howlerService: HowlerService) { }

  ngOnInit() {
  }

  onSubmitMsg(form: NgForm) {
    if (form.value.message) {
      this.chatLoading = true;
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.sound64 = '';
      }
      this.subscription = this.howlerService.textToSpeech(form.value.message).subscribe(sound64 => {
        if (sound64) {
          this.sound64 = sound64.audioContent;
        }
        this.chatService.onLocalMsgAdded.next({msg: form.value.message, sound64: this.sound64});
        this.chatService.addMsg(form.value.message, this.sound64);
        form.reset();
        this.chatLoading = false;
        setTimeout(() => {
          this.messageField.nativeElement.focus();
        }, 1);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
