import { Component, OnInit } from "@angular/core";
import {
  leagues,
  servers,
  queues,
  summoners,
  roles,
  leaguePoints,
  divisions,
  services,
} from "../shared/variables";

@Component({
  selector: "app-order-menu",
  templateUrl: "./order-menu.component.html",
  styleUrls: ["./order-menu.component.scss"],
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

  services = services;
  serviceType = this.services[0];

  constructor() {}

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
  };

  ngOnInit(): void {}

  selectStartRank(id: number) {
    this.orderDetails.startRank = this.leagues[id];
  }
  selectStartDivision(id: number) {
    this.orderDetails.startDivision = this.divisions[id];
  }
  selectLeaguePoints(id: number) {
    this.orderDetails.leaguePoints = this.leaguePoints[id];
  }
  increaseStartRank() {
    if (this.orderDetails.startRank.id < 7) {
      this.orderDetails.startRank = this.leagues[
        this.orderDetails.startRank.id + 1
      ];
    }
  }
  reduceStartRank() {
    if (this.orderDetails.startRank.id > 0) {
      this.orderDetails.startRank = this.leagues[
        this.orderDetails.startRank.id - 1
      ];
    }
  }
  selectDesiredRank(id: number) {
    this.orderDetails.desiredRank = this.leagues[id];
  }
  selectDesiredDivision(id: number) {
    this.orderDetails.desiredDivision = this.divisions[id];
  }
  increaseDesiredRank() {
    if (this.orderDetails.desiredRank.id < 8) {
      this.orderDetails.desiredRank = this.leagues[
        this.orderDetails.desiredRank.id + 1
      ];
    }
  }
  reduceDesiredRank() {
    if (this.orderDetails.desiredRank.id > 0) {
      this.orderDetails.desiredRank = this.leagues[
        this.orderDetails.desiredRank.id - 1
      ];
    }
  }
  selectServer(id: number) {
    this.orderDetails.server = this.servers[id];
  }
  selectQueue(id: number) {
    this.orderDetails.queue = this.queues[id];
  }
  selectSummonerKeyD(id: number) {
    if (id === this.orderDetails.summonerSpell_2.id) {
      this.orderDetails.summonerSpell_2 = this.summoners[0];
    }
    this.orderDetails.summonerSpell_1 = this.summoners[id];
  }
  selectSummonerKeyF(id: number) {
    if (id === this.orderDetails.summonerSpell_1.id) {
      this.orderDetails.summonerSpell_1 = this.summoners[0];
    }
    this.orderDetails.summonerSpell_2 = this.summoners[id];
  }
  selectPrimaryRole(id: number) {
    if (id === this.orderDetails.secondaryRole.id) {
      this.orderDetails.secondaryRole = this.roles[0];
    }
    this.orderDetails.primaryRole = this.roles[id];
  }
  selectSecondaryRole(id: number) {
    if (id === this.orderDetails.primaryRole.id) {
      this.orderDetails.primaryRole = this.roles[0];
    }
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
