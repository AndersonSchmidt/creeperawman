import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validUser = true;

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.chatService.addUser(form.value.user).subscribe(({username, valid}) => {
      if (valid) {
        const navigationExtras: NavigationExtras = {
          queryParams: {user: form.value.user},
          skipLocationChange: true
        };
        this.chatService.addUser(form.value.user);
        this.router.navigate(['root'], navigationExtras);
      } else {
        this.validUser = false;
      }
    });
  }
}
