import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  templateUrl: './intro.html',
  imports: [CommonModule],
  styleUrls: ['./intro.css']
})
export class Intro {
  prefix = "Hi, I’m ";
  name = "Rajarajan Madesh";
  displayedPrefix = '';
  displayedName = '';
  typingSpeed = 60; // ms per character

  ngOnInit(): void {
    this.typePrefix();
  }

  typePrefix(index: number = 0) {
    if (index <= this.prefix.length) {
      this.displayedPrefix = this.prefix.slice(0, index);
      setTimeout(() => this.typePrefix(index + 1), this.typingSpeed);
    } else {
      this.typeName();
    }
  }

  typeName(index: number = 0) {
    if (index <= this.name.length) {
      this.displayedName = this.name.slice(0, index);
      setTimeout(() => this.typeName(index + 1), this.typingSpeed);
    }
  }
}
