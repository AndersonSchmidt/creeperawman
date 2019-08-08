import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {
  users: number;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.onUserAdded().subscribe(users => {
      this.users = users;
    });

    this.chatService.onUserRemoved().subscribe(users => {
      this.users = users;
    });
  }

}
