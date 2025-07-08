import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';
import { About } from './components/about/about';
import { Career } from './components/career/career';
import { Education } from './components/education/education';
import { Contact } from './components/contact/contact';
import { Home } from './components/home/home';
import { Intro } from './components/intro/intro';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [About, Career, Education, Contact, Home, Intro, CommonModule]
})
export class App {
  protected title = 'my-portfolio';
  showIntro = true;

  constructor(public translation: TranslationService) {}

  ngOnInit(): void {
    const visited = localStorage.getItem('visited');
    if (visited) {
      this.showIntro = false;
    } else {
      localStorage.setItem('visited', 'true');
      setTimeout(() => {
        this.showIntro = false;
      }, 5000);
    }
  }

  changeLanguage(lang: string) {
    this.translation.setLanguage(lang);
  }
}
