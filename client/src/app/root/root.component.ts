import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  user: string;
  constructor(private route: ActivatedRoute, private router: Router, private chatService: ChatService) { }

  ngOnInit() {
    this.user = this.route.snapshot.queryParams.user;
    if (!this.user) {
      this.router.navigate(['/']);
    }

    this.chatService.onDisconnect().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
