import { OrderChatComponent } from './order-chat/order-chat.component';
import { PanelComponent } from './panel/panel.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'chats/:id', component: ChatComponent },
   { path: 'login', component: UserFormComponent },
   { path: 'orders/:id', component: PanelComponent },
   { path: 'ordersv2/:id', component: OrderChatComponent, canActivate: [AuthGuard] }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
