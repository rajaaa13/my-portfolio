import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  imports: [CommonModule],
})
export class About implements AfterViewInit {
aboutSteps = [
  {
    title: 'Born & Raised in Tamil Nadu 🇮🇳',
    content: 'I come from Salem, a culturally rich town in Tamil Nadu, India. Growing up here taught me the value of simplicity, community, and resilience — which still guides my work ethic today.',
    bgImage: 'assets/about/aboutSalem.jpg'
  },
  {
    title: 'I’m Rajarajan Madesh 👨‍💻',
    content: 'I’m a frontend developer working at TCS Siruseri, with a passion for Angular, smooth UI/UX, and turning complex ideas into clean code. By day I code, by night I create, explore, and learn.',
    bgImage: 'assets/about/aboutWork.jpg'
  },
  {
    title: 'Beyond the Keyboard 🎬📸',
    content: 'I’m also a photography lover, a movie buff, and a curious soul. I find inspiration in visuals, storytelling, and the little moments that make life beautiful.',
    bgImage: 'assets/about/aboutBeyondWork.jpg'
  },
  {
    title: 'What Drives Me 🌱',
    content: 'Clean design. Honest work. Lifelong learning. I believe in building things that matter and staying humble while constantly evolving as a creator.',
    bgImage: 'assets/about/aboutDrivingForce.jpg'
  },
];

  currentIndex = 0;

  @ViewChildren('stepMarker') steps!: QueryList<ElementRef>;

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
}