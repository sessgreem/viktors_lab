// import { OrderService } from "../core/services/order.service";
// import { Component, OnInit } from "@angular/core";

// @Component({
//   selector: "app-order-menu",
//   templateUrl: "./order-menu.component.html",
//   styleUrls: ["./order-menu.component.scss"],
// })
// export class OrderMenuComponent implements OnInit {
//   leagues: any[] = [
//     { id: 0, name: "Iron", value: 9 },
//     { id: 1, name: "Bronze" },
//     { id: 2, name: "Silver" },
//     { id: 3, name: "Gold" },
//     { id: 4, name: "Platinium" },
//     { id: 5, name: "Diamond" },
//   ];
//   divisions: any[] = [
//     { id: 0, name: "IV" },
//     { id: 1, name: "III" },
//     { id: 2, name: "II" },
//     { id: 3, name: "I" },
//   ];

//   desiredRank = 4;
//   desiredDiv = 0;
//   currentRank = 0;
//   currentDiv = 1;
//   totalDivisions: number;
//   chargeAmount = 10;

//   serviceType = "SoloQ";
//   server = "EUW";
//   priority = false;

//   object = {};

//   constructor(private orderService: OrderService) {}

//   ngOnInit(): void {
//     this.render("init");
//   }

//   render(event) {
//     if (
//       this.desiredRank < this.currentRank ||
//       (this.desiredRank === this.currentRank &&
//         this.desiredDiv <= this.currentDiv)
//     ) {
//       // if(this.desiredRank == this.currentRank)
//       this.totalDivisions = Number.NaN;
//       this.chargeAmount = Number.NaN;
//     } else {
//       this.totalDivisions =
//         4 * this.leagues[this.desiredRank].id +
//         this.divisions[this.desiredDiv].id -
//         (4 * this.leagues[this.currentRank].id +
//           this.divisions[this.currentDiv].id);
//       this.chargeAmount = this.totalDivisions * 8.9;
//     }
//   }

//   createOrder() {
//     this.object = {
//       desiredRank: this.desiredRank,
//       desiredDivision: this.desiredDiv,
//       currentRank: this.currentRank,
//       currentDivision: this.currentDiv,
//       serviceType: this.serviceType,
//       priority: this.priority,
//       price: this.chargeAmount,
//       server: this.server,
//     };
//     this.orderService
//       .setOrder(this.object)
//       .then(() => console.log("successfully created order"))
//       .catch((err) => console.log(err));
//   }
// }
