import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { RootComponent } from './root/root.component';
import { LyricsComponent } from './lyrics/lyrics.component';
import { OnlineUsersComponent } from './online-users/online-users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    ChatFormComponent,
    RootComponent,
    LyricsComponent,
    OnlineUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
