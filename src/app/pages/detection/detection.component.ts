import { Component } from '@angular/core';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent {
  suggestions: string[] = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vehicles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to become Freelancer",
    "How to become Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stand for?",
    "What does CSS stand for?",
  ];

  userInput: string = '';
  filteredSuggestions: string[] = [];
  showSuggestions: boolean = false;

  onKeyUp() {
    const userData = this.userInput;
    this.filteredSuggestions = [];

    if (userData) {
      this.filteredSuggestions = this.suggestions.filter((data) =>
        data.toLowerCase().startsWith(userData.toLowerCase())
      );

      this.showSuggestions = this.filteredSuggestions.length > 0;
    } else {
      this.showSuggestions = false;
    }
  }

  selectSuggestion(suggestion: string) {
    this.userInput = suggestion;
    this.showSuggestions = false;
  }

}
