import { provideLottieOptions } from 'ngx-lottie';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import player from 'lottie-web';
import { App } from './app/app';
import 'zone.js'

export function playerFactory() {
  return player;
}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideLottieOptions({ player: playerFactory })
  ],
});