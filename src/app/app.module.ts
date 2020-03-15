import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ChatComponent } from './chat/chat.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PanelComponent } from './panel/panel.component';
import { OrderMenuComponent } from './order-menu/order-menu.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderChatComponent } from './order-chat/order-chat.component'
// import { AuthGuard } from './core/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    UserFormComponent,
    PanelComponent,
    OrderMenuComponent,
    OrderDetailsComponent,
    OrderChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
