import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';
import { trigger, style, transition, animate } from '@angular/animations';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';
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
  langSub?: Subscription;
  prefix = '';
  name = '';
  displayedText = '';
  currentIndex = 0;
  slides: {text: string; animationPath: string;}[] = [];
  currentText = '';
  options: AnimationOptions = {};

  constructor(public translation: TranslationService) {}

  ngOnInit(): void {
    this.langSub = this.translation.translations$.subscribe(() => {
      this.prefix = this.translation.translate('home.intro_prefix');
      this.name = this.translation.translate('home.intro_suffix');
      this.slides = this.translation.translate('home.slides') as unknown as {text: string; animationPath: string;} [];
      this.currentText = this.slides[0].text;
      this.options = { path: this.slides[0].animationPath };
    });
    this.setSlidesTextandAnimation();
  }

  setSlidesTextandAnimation() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.currentText = this.slides[this.currentIndex].text;
      this.options = {
        path: this.slides[this.currentIndex].animationPath
      };
    }, 5000);
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}
