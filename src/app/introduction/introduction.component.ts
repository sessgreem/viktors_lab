import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.scss"],
})
export class IntroductionComponent implements OnInit {
  tools = [
    {
      toolUrl: "../../assets/tools-logos/angular.svg",
      toolDesc: "Angular",
    },
    {
      toolUrl: "../../assets/tools-logos/typescript_community.svg",
      toolDesc: "TypeScript",
    },
    {
      toolUrl: "../../assets/tools-logos/firebase-logo.svg",
      toolDesc: "Firebase",
    },
    {
      toolUrl:
        "../../assets/tools-logos/google-cloud-functions-seeklogo.com.svg",
      toolDesc: "Cloud Functions",
    },
    {
      toolUrl: "../../assets/tools-logos/HTML5_logo_and_wordmark.svg",
      toolDesc: "HTML",
    },
    // {
    //   toolUrl: "../../assets/tools-logos/CSS.3.svg",
    //   toolDesc: "CSS",
    // },
    {
      toolUrl: "../../assets/tools-logos/sass-1.svg",
      toolDesc: "SASS",
    },
    {
      toolUrl: "../../assets/tools-logos/nodejs.svg",
      toolDesc: "Node.js",
    },
    {
      toolUrl: "../../assets/tools-logos/Visual_Studio_Code_1.35_icon.svg",
      toolDesc: "VS Code",
    },
    {
      toolUrl: "../../assets/tools-logos/Adobe_XD_CC_icon.svg",
      toolDesc: "Experience Design",
    },
    {
      toolUrl: "../../assets/tools-logos/Adobe_Photoshop_CC_icon.svg",
      toolDesc: "Photoshop",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
