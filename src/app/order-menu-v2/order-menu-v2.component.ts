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
    { id: 0, name: "Iron", imgURL: "../../assets/ranks-images/Iron.png" },
    { id: 1, name: "Bronze", imgURL: "../../assets/ranks-images/Bronze.png" },
    { id: 2, name: "Silver", imgURL: "../../assets/ranks-images/Silver.png" },
    { id: 3, name: "Gold", imgURL: "../../assets/ranks-images/Gold.png" },
    {
      id: 4,
      name: "Platinum",
      imgURL: "../../assets/ranks-images/Platinum.png",
    },
    { id: 5, name: "Diamond", imgURL: "../../assets/ranks-images/Diamond.png" },
    { id: 6, name: "Master", imgURL: "../../assets/ranks-images/Master.png" },
    {
      id: 7,
      name: "GrandMaster",
      imgURL: "../../assets/ranks-images/Grandmaster.png",
    },
    {
      id: 8,
      name: "Challenger",
      imgURL: "../../assets/ranks-images/Challenger.png",
    },
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
    {
      id: 0,
      name: "Any",
      imgURL: "../../assets/role_positions-images/fill.png",
    },
    {
      id: 1,
      name: "Flash",
      imgURL: "../../assets/summoner_spells-images/Flash.png",
    },
    {
      id: 2,
      name: "Ignite",
      imgURL: "../../assets/summoner_spells-images/Ignite.png",
    },
    {
      id: 3,
      name: "Heal",
      imgURL: "../../assets/summoner_spells-images/Heal.png",
    },
    {
      id: 4,
      name: "Smite",
      imgURL: "../../assets/summoner_spells-images/Smite.png",
    },
    {
      id: 5,
      name: "Teleport",
      imgURL: "../../assets/summoner_spells-images/Teleport.png",
    },
    {
      id: 6,
      name: "Exhaust",
      imgURL: "../../assets/summoner_spells-images/Exhaust.png",
    },
    {
      id: 7,
      name: "Cleanse",
      imgURL: "../../assets/summoner_spells-images/Cleanse.png",
    },
    {
      id: 8,
      name: "Barrier",
      imgURL: "../../assets/summoner_spells-images/Barrier.png",
    },
    {
      id: 9,
      name: "Ghost",
      imgURL: "../../assets/summoner_spells-images/Ghost.png",
    },
  ];
  summonerKeyD = this.summoners[0];
  summonerKeyF = this.summoners[0];

  roles: any[] = [
    {
      id: 0,
      name: "Any",
      imgURL: "../../assets/role_positions-images/fill.png",
    },
    {
      id: 1,
      name: "Top",
      imgURL: "../../assets/role_positions-images/top.png",
    },
    {
      id: 2,
      name: "Jungle",
      imgURL: "../../assets/role_positions-images/jungle.png",
    },
    {
      id: 3,
      name: "Middle",
      imgURL: "../../assets/role_positions-images/middle.png",
    },
    {
      id: 4,
      name: "Bottom",
      imgURL: "../../assets/role_positions-images/bottom.png",
    },
    {
      id: 5,
      name: "Support",
      imgURL: "../../assets/role_positions-images/support.png",
    },
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
