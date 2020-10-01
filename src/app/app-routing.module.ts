import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { OrderMenuV2Component } from "./order-menu-v2/order-menu-v2.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { DashboardComponent } from "./staff/dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  { path: "lol-boost", component: OrderMenuV2Component },
  {
    path: "",
    component: IntroductionComponent,
  },
  {
    path: "staff/dashboard",
    component: DashboardComponent,
    // add a guard
  },
  {
    path: "order/:id",
    component: OrderDetailsComponent,
    // add a guard
  },
  {
    path: "my-orders",
    component: MyOrdersComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
