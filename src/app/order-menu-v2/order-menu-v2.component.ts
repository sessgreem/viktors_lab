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
  currentRankOpened = false;
  desiredRankOpened = false;
  serverDropdownOpened = false;
  queueDropdownOpened = false;
  DsummonerDropdownOpened = false;
  FsummonerDropdownOpened = false;
  primaryRoleDropdownOpened = false;
  secondaryRoleDropdownOpened = false;

  leagues = leagues;
  currentRank = this.leagues[4];
  desiredRank = this.leagues[this.currentRank.id + 1];

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
  currentDivision = this.divisions[0];
  desiredDivision = this.divisions[this.currentDivision.id + 1];

  leaguePoints = leaguePoints;
  currentLP = this.leaguePoints[0];

  constructor() {}
  selectPrimaryRole(id: number) {
    if (id === this.secondaryRole.id) {
      this.secondaryRole = this.roles[0];
    }
    this.primaryRole = this.roles[id];
  }
  selectSecondaryRole(id: number) {
    if (id === this.primaryRole.id) {
      this.primaryRole = this.roles[0];
    }
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
    if (id === this.summonerKeyF.id) {
      this.summonerKeyF = this.summoners[0];
    }
    this.summonerKeyD = this.summoners[id];
  }
  selectSummonerKeyF(id: number) {
    if (id === this.summonerKeyD.id) {
      this.summonerKeyD = this.summoners[0];
    }
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
