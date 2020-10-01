import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "./../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./staff/dashboard/dashboard.component";
// import { AuthGuard } from './core/auth.guard';
import { REGION } from "@angular/fire/functions";
import { RatingModule } from "ng-starrating";
import { IntroductionComponent } from "./introduction/introduction.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavigationComponent } from "./shared/navigation/navigation.component";
import { HelpContactComponent } from "./shared/help-contact/help-contact.component";
import { ChatComponent } from "./core/chat/chat.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { ServicesMenuComponent } from "./shared/services-menu/services-menu.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { OrderMenuV2Component } from "./order-menu-v2/order-menu-v2.component";
import { ClickOutsideModule } from "ng-click-outside";
import { FooterComponent } from "./shared/footer/footer.component";
import { AngSlideToggleModule } from "ang-slide-toggle";
import { CommonModule } from "@angular/common";
import { ProgressBarModule } from "angular-progress-bar";
import { ModalLoginComponent } from "./shared/modals/modal-login/modal-login.component";
import { ModalSignupComponent } from "./shared/modals/modal-signup/modal-signup.component";
import { ModalCardComponent } from "./shared/modals/modal-card/modal-card.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyOrdersComponent } from './my-orders/my-orders.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IntroductionComponent,
    NavigationComponent,
    HelpContactComponent,
    ChatComponent,
    OrderDetailsComponent,
    ServicesMenuComponent,
    OrderSummaryComponent,
    OrderMenuV2Component,
    FooterComponent,
    ModalLoginComponent,
    ModalSignupComponent,
    ModalCardComponent,
    MyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    FlexLayoutModule,
    ClickOutsideModule,
    AngSlideToggleModule,
    CommonModule,
    ProgressBarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: REGION, useValue: "europe-west1" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
