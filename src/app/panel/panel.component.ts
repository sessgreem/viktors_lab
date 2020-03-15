import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  accPassword: string = 'viktor';
  boostStatus: string = '';
  orderId: string;
  constructor(private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }
  updateAccPassword() {
    this.orderService.updatePassword(this.orderId, this.accPassword);
    this.accPassword = '';
}
pauseBoost() {
  this.boostStatus = 'pause';
  // this.orderService.setBoostStatus(this.boostStatus);
}
unpauseBoost() {
  this.boostStatus = 'active';
  // this.orderService.setBoostStatus(this.boostStatus);
}
}
