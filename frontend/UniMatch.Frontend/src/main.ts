import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideAnimations } from '@angular/platform-browser/animations';

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [provideAnimations()],
})
  .catch((err) => console.log(err));
