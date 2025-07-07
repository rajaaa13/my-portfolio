import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';
import { trigger, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-home',
  imports: [CommonModule, LottieComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
   animations: [
    trigger('fadeInOut', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class Home {
  slides = [
    {
      text: 'Frontend Developer, who loves to develops in angular and create beautiful user interfaces.',
      animationPath: 'assets/lottie/developer.json'
    },
    {
      text: 'Photography Enthusiast, who always carries a camera to capture the beauty of the world.',
      animationPath: 'assets/lottie/photographer.json'
    },
    {
      text: 'Movie Buff, who loves to see the world through the lens of cinema',
      animationPath: 'assets/lottie/filmbuff.json'
    }
  ];
  displayedText = '';
  currentIndex = 0;
  currentText = this.slides[0].text;
  options: AnimationOptions = { path: this.slides[0].animationPath };

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.currentText = this.slides[this.currentIndex].text;
      this.options = {
        path: this.slides[this.currentIndex].animationPath
      };
    }, 5000);
  }
}
