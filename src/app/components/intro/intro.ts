import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-intro',
  standalone: true,
  templateUrl: './intro.html',
  imports: [CommonModule],
  styleUrls: ['./intro.css']
})
export class Intro implements OnInit, OnDestroy {
  displayedPrefix = '';
  displayedName = '';
  typingSpeed = 60;
  private prefix = '';
  private name = '';
  private langSub?: Subscription;

  constructor(public translation: TranslationService) {}

  ngOnInit(): void {
    this.langSub = this.translation.translations$.subscribe(() => {
      this.prefix = this.translation.translate('base.intro_prefix');
      this.name = this.translation.translate('base.intro_suffix');
      this.displayedPrefix = '';
      this.displayedName = '';
      this.typePrefix();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
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
