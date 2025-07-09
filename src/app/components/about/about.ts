import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  imports: [CommonModule],
    animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':increment', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class About {
  aboutSteps : { title: string; content: string; period: string; bgImage: string }[] = [];
  currentIndex = 0;
  touchStartX = 0;
  langSub?: Subscription;
  autoplayInterval: any;
  constructor(public translation: TranslationService) {}

  ngOnInit(): void {
    this.langSub = this.translation.translations$.subscribe(() => {
      this.aboutSteps = this.translation.translate('about.aboutSteps') as unknown as { title: string; content: string; period: string; bgImage: string }[];
    });
    this.autoplayInterval = setInterval(() => this.next(), 6000);
  }


  ngOnDestroy() {
    clearInterval(this.autoplayInterval);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.aboutSteps.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.aboutSteps.length) % this.aboutSteps.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    const diffX = touchEndX - this.touchStartX;
    if (diffX > 50) this.prev();
    else if (diffX < -50) this.next();
  }
}