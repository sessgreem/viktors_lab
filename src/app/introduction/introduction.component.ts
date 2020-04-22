import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.css"],
})
export class IntroductionComponent implements OnInit {
  tools = [
    {
      toolUrl: "../../assets/angular.svg",
      toolDesc: "Angular",
    },
    {
      toolUrl: "../../assets/typescript_community.svg",
      toolDesc: "TypeScript",
    },
    {
      toolUrl: "../../assets/firebase-logo.svg",
      toolDesc: "Firebase",
    },
    {
      toolUrl: "../../assets/google-cloud-functions-seeklogo.com.svg",
      toolDesc: "Cloud Functions",
    },
    {
      toolUrl: "../../assets/HTML5_logo_and_wordmark.svg",
      toolDesc: "HTML",
    },
    {
      toolUrl: "../../assets/CSS.3.svg",
      toolDesc: "CSS",
    },
    {
      toolUrl: "../../assets/nodejs.svg",
      toolDesc: "Node.js",
    },
    {
      toolUrl: "../../assets/Visual_Studio_Code_1.35_icon.svg",
      toolDesc: "VS Code",
    },
    {
      toolUrl: "../../assets/Adobe_XD_CC_icon.svg",
      toolDesc: "Experience Design",
    },
    {
      toolUrl: "../../assets/Adobe_Photoshop_CC_icon.svg",
      toolDesc: "Photoshop",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
