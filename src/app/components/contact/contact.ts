import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import emailjs from 'emailjs-com';  // Install with: npm i emailjs-com
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../services/translation.service';
@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  formSubmitted = false;
  langSub?: Subscription;
  contactObj?: any;
  constructor(public translation: TranslationService) {}

  ngOnInit(): void {
    this.langSub = this.translation.translations$.subscribe(() => {
      this.contactObj = this.translation.translate('contact');
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  sendEmail(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    emailjs.send("service_ukwqc4m","template_ezwlalm", {
      name: form.value.user_name,
      email: form.value.user_email,
      message: form.value.message,
    }, "oRAosIcjCulMSLkdj")
    .then(() => {
      const formElement = document.querySelector('form');
      formElement?.classList.add('ng-animating');
      setTimeout(() => {
        this.formSubmitted = true;
        form.reset();
      }, 600);
    })
    .catch((error) => {
      console.error('❌ Email send failed:', error);
      alert('Oops! Something went wrong. Please try again later.');
    });
  }
}
