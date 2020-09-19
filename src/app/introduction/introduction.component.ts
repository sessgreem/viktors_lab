import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.scss"],
})
export class IntroductionComponent implements OnInit {
  tools = [
    {
      toolUrl: "../../assets/tools-images/angular.svg",
      toolDesc: "Angular",
    },
    {
      toolUrl: "../../assets/tools-images/typescript_community.svg",
      toolDesc: "TypeScript",
    },
    {
      toolUrl: "../../assets/tools-images/firebase-logo.svg",
      toolDesc: "Firebase",
    },
    {
      toolUrl:
        "../../assets/tools-images/google-cloud-functions-seeklogo.com.svg",
      toolDesc: "Cloud Functions",
    },
    {
      toolUrl: "../../assets/tools-images/HTML5_logo_and_wordmark.svg",
      toolDesc: "HTML",
    },
    // {
    //   toolUrl: "../../assets/tools-images/CSS.3.svg",
    //   toolDesc: "CSS",
    // },
    {
      toolUrl: "../../assets/tools-images/sass-1.svg",
      toolDesc: "SCSS",
    },
    {
      toolUrl: "../../assets/tools-images/nodejs.svg",
      toolDesc: "Node.js",
    },
    {
      toolUrl: "../../assets/tools-images/Visual_Studio_Code_1.35_icon.svg",
      toolDesc: "VS Code",
    },
    {
      toolUrl: "../../assets/tools-images/Adobe_XD_CC_icon.svg",
      toolDesc: "Experience Design",
    },
    {
      toolUrl: "../../assets/tools-images/Adobe_Photoshop_CC_icon.svg",
      toolDesc: "Photoshop",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
