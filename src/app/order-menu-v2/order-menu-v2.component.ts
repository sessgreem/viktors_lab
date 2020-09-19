import { Component, OnInit } from "@angular/core";
import { VirtualTimeScheduler } from "rxjs";

@Component({
  selector: "app-order-menu-v2",
  templateUrl: "./order-menu-v2.component.html",
  styleUrls: ["./order-menu-v2.component.scss"],
})
export class OrderMenuV2Component implements OnInit {
  currentRankOpened = false;
  desiredRankOpened = false;
  serverDropdownOpened = false;
  queueDropdownOpened = false;
  DsummonerDropdownOpened = false;
  FsummonerDropdownOpened = false;
  primaryRoleDropdownOpened = false;
  secondaryRoleDropdownOpened = false;

  // put in a separate file
  leagues: any[] = [
    { id: 0, name: "Iron" },
    { id: 1, name: "Bronze" },
    { id: 2, name: "Silver" },
    { id: 3, name: "Gold" },
    { id: 4, name: "Platinium" },
    { id: 5, name: "Diamond" },
    { id: 6, name: "Master" },
    { id: 7, name: "GrandMaster" },
    { id: 8, name: "Challenger" },
  ];
  currentRank = this.leagues[3];
  desiredRank = this.leagues[this.currentRank.id + 1];

  servers: any[] = [
    { id: 0, name: "EU West" },
    { id: 1, name: "EU Nordic and East" },
    { id: 2, name: "NA" },
    { id: 3, name: "LAN" },
    { id: 4, name: "OCE" },
    { id: 5, name: "SEA" },
    { id: 6, name: "TR" },
    { id: 7, name: "Russia" },
    { id: 8, name: "Brazil" },
  ];
  server = this.servers[0];

  queues: any[] = [
    { id: 0, name: "Solo Queue" },
    { id: 1, name: "Flex Queue" },
    { id: 2, name: "3v3 Queue" },
  ];
  queue = this.queues[0];

  summoners: any[] = [
    { id: 0, name: "Any" },
    { id: 1, name: "Flash" },
    { id: 2, name: "Ignite" },
    { id: 3, name: "Heal" },
    { id: 4, name: "Smite" },
    { id: 5, name: "Teleport" },
    { id: 6, name: "Exhaust" },
    { id: 7, name: "Cleanse" },
    { id: 8, name: "Barrier" },
    { id: 9, name: "Ghost" },
  ];
  summonerKeyD = this.summoners[0];
  summonerKeyF = this.summoners[0];

  roles: any[] = [
    { id: 0, name: "Any" },
    { id: 1, name: "Top" },
    { id: 2, name: "Jungle" },
    { id: 3, name: "Middle" },
    { id: 4, name: "Bottom" },
    { id: 5, name: "Support" },
  ];

  primaryRole = this.roles[0];
  secondaryRole = this.roles[0];

  divisions: any[] = [
    { id: 0, name: "IV" },
    { id: 1, name: "III" },
    { id: 2, name: "II" },
    { id: 3, name: "I" },
  ];

  currentDivision = this.divisions[0];
  desiredDivision = this.divisions[this.currentDivision.id + 1];

  leaguePoints: any[] = [
    { id: 0, name: "0-29LP" },
    { id: 1, name: "30-59LP" },
    { id: 2, name: "60-100LP" },
  ];
  currentLP = this.leaguePoints[0];

  constructor() {}
  selectPrimaryRole(id: number) {
    this.primaryRole = this.roles[id];
  }
  selectSecondaryRole(id: number) {
    this.secondaryRole = this.roles[id];
  }
  clickOutsidePrimaryRole($event) {
    this.primaryRoleDropdownOpened = false;
  }
  clickOutsideSecondaryRole($event) {
    this.secondaryRoleDropdownOpened = false;
  }
  ngOnInit(): void {}
  clickOutsideCurrentRank($event) {
    this.currentRankOpened = false;
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
  reduceCurrentRank() {
    if (this.currentRank.id > 0) {
      this.currentRank = this.leagues[this.currentRank.id - 1];
    }
  }
  increaseCurrentRank() {
    if (this.currentRank.id < 7) {
      this.currentRank = this.leagues[this.currentRank.id + 1];
    }
  }
  toggleCurrentRankMenu() {
    this.currentRankOpened = !this.currentRankOpened;
  }
  toggleDesiredRankMenu() {
    this.desiredRankOpened = !this.desiredRankOpened;
  }
  reduceDesiredRank() {
    if (this.desiredRank.id > 0) {
      this.desiredRank = this.leagues[this.desiredRank.id - 1];
    }
  }
  increaseDesiredRank() {
    if (this.desiredRank.id < 8) {
      this.desiredRank = this.leagues[this.desiredRank.id + 1];
    }
  }
  selectCurrentRank(id: number) {
    this.currentRank = this.leagues[id];
  }
  selectDesiredRank(id: number) {
    this.desiredRank = this.leagues[id];
  }
  toggleServerMenu() {
    this.serverDropdownOpened = !this.serverDropdownOpened;
  }
  toggleQueueMenu() {
    this.queueDropdownOpened = !this.queueDropdownOpened;
  }
  selectServer(id: number) {
    this.server = this.servers[id];
  }
  selectQueue(id: number) {
    this.queue = this.queues[id];
  }
  selectSummonerKeyD(id: number) {
    this.summonerKeyD = this.summoners[id];
  }
  selectSummonerKeyF(id: number) {
    this.summonerKeyF = this.summoners[id];
  }
  toggleSummonerKeyDMenu() {
    this.DsummonerDropdownOpened = !this.DsummonerDropdownOpened;
  }
  toggleSummonerKeyFMenu() {
    this.FsummonerDropdownOpened = !this.FsummonerDropdownOpened;
  }
  clickOutsideSummonerKeyF($event) {
    this.FsummonerDropdownOpened = false;
  }
  clickOutsideSummonerKeyD($event) {
    this.DsummonerDropdownOpened = false;
  }
  togglePrimaryRoleMenu() {
    this.primaryRoleDropdownOpened = !this.primaryRoleDropdownOpened;
  }
  toggleSecondaryRoleMenu() {
    this.secondaryRoleDropdownOpened = !this.secondaryRoleDropdownOpened;
  }
  selectDesiredDivision(id: number) {
    this.desiredDivision = this.divisions[id];
  }
  selectCurrentDivision(id: number) {
    this.currentDivision = this.divisions[id];
  }
  selectLeaguePoints(id: number) {
    this.currentLP = this.leaguePoints[id];
  }
}
