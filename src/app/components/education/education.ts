import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education {
  langSub?: Subscription;
  educationList  : { degree: string; institution: string; duration: string; score: string }[] = [];
  title = ''; 
  constructor(public translation: TranslationService) {}
  
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit(): void {
    this.langSub = this.translation.translations$.subscribe(() => {
      this.title = this.translation.translate('education.title') as string;
      this.educationList  = this.translation.translate('education.educationList') as unknown as { degree: string; institution: string; duration: string; score: string }[];
      this.setView();
    });
  }

  setView() {
    setTimeout(() => {
      const cards = document.querySelectorAll('.education-card');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('opacity-0', 'blur-sm', 'translate-y-10');
              entry.target.classList.add('opacity-100', 'blur-0', 'translate-y-0');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      cards.forEach((card) => observer.observe(card));
    }, 0);
  }

}
