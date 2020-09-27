import { Component, OnInit } from "@angular/core";
import {
  leagues,
  servers,
  queues,
  summoners,
  roles,
  leaguePoints,
  divisions,
} from "../shared/variables";

@Component({
  selector: "app-order-menu-v2",
  templateUrl: "./order-menu-v2.component.html",
  styleUrls: ["./order-menu-v2.component.scss"],
})
export class OrderMenuV2Component implements OnInit {
  startRankOpened = false;
  desiredRankOpened = false;
  serverDropdownOpened = false;
  queueDropdownOpened = false;
  DsummonerDropdownOpened = false;
  FsummonerDropdownOpened = false;
  primaryRoleDropdownOpened = false;
  secondaryRoleDropdownOpened = false;

  leagues = leagues;
  startRank = this.leagues[4];
  desiredRank = this.leagues[this.startRank.id + 1];

  servers = servers;
  server = this.servers[0];

  queues = queues;
  queue = this.queues[0];

  summoners = summoners;
  summonerKeyD = this.summoners[0];
  summonerKeyF = this.summoners[0];

  roles = roles;
  primaryRole = this.roles[0];
  secondaryRole = this.roles[0];

  divisions = divisions;
  startDivision = this.divisions[0];
  desiredDivision = this.divisions[this.startDivision.id + 1];

  leaguePoints = leaguePoints;
  currentLP = this.leaguePoints[0];

  // rethink - put in a separate file
  serviceType = "League Boost";
  constructor() {}

  // need to put everything in an object and send it - serviceType need to come from here i think
  orderDetails = {
    startRank: this.startRank,
    startDivision: this.startDivision,
    desiredRank: this.desiredRank,
    desiredDivision: this.desiredDivision,
    leaguePoints: this.currentLP,
    server: this.server,
    queue: this.queue,
    summonerSpell_1: this.summonerKeyD,
    summonerSpell_2: this.summonerKeyF,
    primaryRole: this.primaryRole,
    secondaryRole: this.secondaryRole,
    serviceType: this.serviceType,
    // priority: false,
    // price: 0,
  };

  ngOnInit(): void {}

  selectStartRank(id: number) {
    // this.startRank = this.leagues[id];
    this.orderDetails.startRank = this.leagues[id];
  }
  selectStartDivision(id: number) {
    // this.startDivision = this.divisions[id];
    this.orderDetails.startDivision = this.divisions[id];
  }
  selectLeaguePoints(id: number) {
    // this.currentLP = this.leaguePoints[id];
    this.orderDetails.leaguePoints = this.leaguePoints[id];
  }
  increaseStartRank() {
    if (this.startRank.id < 7) {
      // this.startRank = this.leagues[this.startRank.id + 1];
      this.orderDetails.startRank = this.leagues[
        this.orderDetails.startRank.id + 1
      ];
    }
  }
  reduceStartRank() {
    if (this.startRank.id > 0) {
      // this.startRank = this.leagues[this.startRank.id - 1];
      this.orderDetails.startRank = this.leagues[
        this.orderDetails.startRank.id - 1
      ];
    }
  }
  selectDesiredRank(id: number) {
    // this.desiredRank = this.leagues[id];
    this.orderDetails.desiredRank = this.leagues[id];
  }
  selectDesiredDivision(id: number) {
    // this.desiredDivision = this.divisions[id];
    this.orderDetails.desiredDivision = this.divisions[id];
  }
  increaseDesiredRank() {
    if (this.desiredRank.id < 8) {
      // this.desiredRank = this.leagues[this.desiredRank.id + 1];
      this.orderDetails.desiredRank = this.leagues[
        this.orderDetails.desiredRank.id + 1
      ];
    }
  }
  reduceDesiredRank() {
    if (this.desiredRank.id > 0) {
      // this.desiredRank = this.leagues[this.desiredRank.id - 1];
      this.orderDetails.desiredRank = this.leagues[
        this.orderDetails.desiredRank.id - 1
      ];
    }
  }
  selectServer(id: number) {
    // this.server = this.servers[id];
    this.orderDetails.server = this.servers[id];
  }
  selectQueue(id: number) {
    // this.queue = this.queues[id];
    this.orderDetails.queue = this.queues[id];
  }
  selectSummonerKeyD(id: number) {
    if (id === this.orderDetails.summonerSpell_2.id) {
      // this.summonerKeyF = this.summoners[0];
      this.orderDetails.summonerSpell_2 = this.summoners[0];
    }
    // this.summonerKeyD = this.summoners[id];
    this.orderDetails.summonerSpell_1 = this.summoners[id];
  }
  selectSummonerKeyF(id: number) {
    // if (id === this.summonerKeyD.id) {
    if (id === this.orderDetails.summonerSpell_1.id) {
      // this.summonerKeyD = this.summoners[0];
      this.orderDetails.summonerSpell_1 = this.summoners[0];
    }
    // this.summonerKeyF = this.summoners[id];
    this.orderDetails.summonerSpell_2 = this.summoners[id];
  }
  selectPrimaryRole(id: number) {
    // if (id === this.secondaryRole.id) {
    if (id === this.orderDetails.secondaryRole.id) {
      // this.secondaryRole = this.roles[0];
      this.orderDetails.secondaryRole = this.roles[0];
    }
    // this.primaryRole = this.roles[id];
    this.orderDetails.primaryRole = this.roles[id];
  }
  selectSecondaryRole(id: number) {
    if (id === this.orderDetails.primaryRole.id) {
      // this.primaryRole = this.roles[0];
      this.orderDetails.primaryRole = this.roles[0];
    }
    // this.secondaryRole = this.roles[id];
    this.orderDetails.secondaryRole = this.roles[id];
  }

  // Toggle dropdowns functions
  toggleStartRankMenu() {
    this.startRankOpened = !this.startRankOpened;
  }
  toggleDesiredRankMenu() {
    this.desiredRankOpened = !this.desiredRankOpened;
  }
  toggleServerMenu() {
    this.serverDropdownOpened = !this.serverDropdownOpened;
  }
  toggleQueueMenu() {
    this.queueDropdownOpened = !this.queueDropdownOpened;
  }
  toggleSummonerKeyDMenu() {
    this.DsummonerDropdownOpened = !this.DsummonerDropdownOpened;
  }
  toggleSummonerKeyFMenu() {
    this.FsummonerDropdownOpened = !this.FsummonerDropdownOpened;
  }
  togglePrimaryRoleMenu() {
    this.primaryRoleDropdownOpened = !this.primaryRoleDropdownOpened;
  }
  toggleSecondaryRoleMenu() {
    this.secondaryRoleDropdownOpened = !this.secondaryRoleDropdownOpened;
  }

  // clickOutside directive functions
  clickOutsideSummonerKeyF($event) {
    this.FsummonerDropdownOpened = false;
  }
  clickOutsideSummonerKeyD($event) {
    this.DsummonerDropdownOpened = false;
  }
  clickOutsidePrimaryRole($event) {
    this.primaryRoleDropdownOpened = false;
  }
  clickOutsideSecondaryRole($event) {
    this.secondaryRoleDropdownOpened = false;
  }
  clickOutsideStartRank($event) {
    this.startRankOpened = false;
  }
  clickOutsideDesiredRank($event) {
    this.desiredRankOpened = false;
  }
  clickOutsideServer($event) {
    this.serverDropdownOpened = false;
  }
  clickOutsideQueue($event) {
    this.queueDropdownOpened = false;
  }
}
