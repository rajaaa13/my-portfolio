import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private language = new BehaviorSubject<string>('en');
  private translations = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.setLanguage(savedLang);
    } else {
      this.setLanguage('en');
    }
  }

  setLanguage(lang: string) {
    this.language.next(lang);
    localStorage.setItem('lang', lang);
    this.http.get(`/assets/text_lang/text_lang.${lang}.json`).subscribe(data => {
      this.translations.next(data);
    });
  }

  get currentLang$(): Observable<string> {
    return this.language.asObservable();
  }

  get translations$(): Observable<any> {
    return this.translations.asObservable();
  }

  // Helper to get a translation by path, e.g. 'base.title' or 'home.intro_prefix'
  translate(path: string): string {
    const keys = path.split('.');
    let value = this.translations.value;
    for (const key of keys) {
      if (value && value.hasOwnProperty(key)) {
        value = value[key];
      } else {
        return path; // fallback: return the key
      }
    }
    return value ? value : path;
  }
}
