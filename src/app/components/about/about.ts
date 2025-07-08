import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  imports: [CommonModule],
})
export class About implements AfterViewInit {
  aboutSteps : { title: string; content: string; period: string; bgImage: string }[] = [];
  currentIndex = 0;
  langSub?: Subscription;
  @ViewChildren('stepMarker') steps!: QueryList<ElementRef>;

  constructor(public translation: TranslationService) {}
  
  ngOnInit(): void {
    this.langSub = this.translation.translations$.subscribe(() => {
      this.aboutSteps = this.translation.translate('about.aboutSteps') as unknown as { title: string; content: string; period: string; bgImage: string }[];
    });
  }

  ngAfterViewInit(): void {
    this.onScroll(); // set initial index based on position
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    this.steps.forEach((el, index) => {
      const rect = el.nativeElement.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;
      if (scrollPosition >= offsetTop) {
        this.currentIndex = index;
      }
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}