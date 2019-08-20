import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit, OnDestroy {
  users: number;
  subscription: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.onUsersUpdated().subscribe(users => {
      this.users = users.length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
