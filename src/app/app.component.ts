import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crew-app';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr', 'pt']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    const supportedLangs = ['en', 'fr', 'pt'];
    const defaultLang = 'en';

    if (browserLang && supportedLangs.includes(browserLang)) {
      this.translate.use(browserLang).subscribe({
        error: () => this.translate.use(defaultLang)
      });
    } else {
      this.translate.use(defaultLang);
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language).subscribe({
      error: () => console.error('Error switching language')
    });
  }
}
