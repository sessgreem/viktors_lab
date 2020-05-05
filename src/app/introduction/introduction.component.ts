import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.scss"],
})
export class IntroductionComponent implements OnInit {
  tools = [
    {
      toolUrl: "../../assets/tools/angular.svg",
      toolDesc: "Angular",
    },
    {
      toolUrl: "../../assets/tools/typescript_community.svg",
      toolDesc: "TypeScript",
    },
    {
      toolUrl: "../../assets/tools/firebase-logo.svg",
      toolDesc: "Firebase",
    },
    {
      toolUrl: "../../assets/tools/google-cloud-functions-seeklogo.com.svg",
      toolDesc: "Cloud Functions",
    },
    {
      toolUrl: "../../assets/tools/HTML5_logo_and_wordmark.svg",
      toolDesc: "HTML",
    },
    {
      toolUrl: "../../assets/tools/CSS.3.svg",
      toolDesc: "CSS",
    },
    {
      toolUrl: "../../assets/tools/nodejs.svg",
      toolDesc: "Node.js",
    },
    {
      toolUrl: "../../assets/tools/Visual_Studio_Code_1.35_icon.svg",
      toolDesc: "VS Code",
    },
    {
      toolUrl: "../../assets/tools/Adobe_XD_CC_icon.svg",
      toolDesc: "Experience Design",
    },
    {
      toolUrl: "../../assets/tools/Adobe_Photoshop_CC_icon.svg",
      toolDesc: "Photoshop",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
