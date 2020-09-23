import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  open = false;
  outsideEnabled = false;
  constructor() {}

  ngOnInit(): void {}
  closeSideNav(event) {
    this.outsideEnabled = false;
    this.open = false;
    console.log(event);
  }

  openSideNav() {
    this.open = true;
    setTimeout(() => (this.outsideEnabled = true), 700);
  }
}
