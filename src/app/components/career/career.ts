import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-career',
  imports: [CommonModule],
  templateUrl: './career.html',
  styleUrl: './career.css',
})
export class Career {
  careerList : { role: string; company: string; period: string; points: string[] }[] = [];
  langSub?: Subscription;
  visibleIndex = -1;
  title = ''; 
constructor(public translation: TranslationService) {}

ngOnInit(): void {
  this.langSub = this.translation.translations$.subscribe(() => {
    this.title = this.translation.translate('career.title') as string;
    this.careerList = this.translation.translate('career.careerList') as unknown as { role: string; company: string; period: string; points: string[] }[];
    this.setView();
  });
}

  setView() {
    setTimeout(() => {
      const cards = document.querySelectorAll('.career-card');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove(
                'opacity-0',
                'translate-x-[-50px]',
                'translate-x-[50px]',
                'blur-sm'
              );
              entry.target.classList.add(
                'opacity-100',
                'translate-x-0',
                'blur-0'
              );
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );
      cards.forEach((card) => observer.observe(card));
    }, 0);
  }

  calculateYearsInDecimal(startDate:string) {
    const start = new Date(startDate);
    const end = new Date();
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    const days = end.getDate() - start.getDate();
    let totalYears = years + months / 12 + days / 365;
    return totalYears.toFixed(2);
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}
