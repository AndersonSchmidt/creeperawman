import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  validUser = true;
  loginLoading = false;
  subscription: Subscription;

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loginLoading = true;
    this.subscription = this.chatService.addUser(form.value.user).subscribe(({username, valid}) => {
      if (valid) {
        const navigationExtras: NavigationExtras = {
          queryParams: {user: form.value.user},
          skipLocationChange: true
        };
        this.chatService.addUser(form.value.user);
        this.loginLoading = false;
        this.router.navigate(['root'], navigationExtras);
      } else {
        this.validUser = false;
        this.loginLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
