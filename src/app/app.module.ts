import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { CrewListComponent } from './crew-list/crew-list.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { AppRoutingModule } from './app-routing.module';
import { CrewEditComponent } from './crew-edit/crew-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrewCertificatesComponent } from './crew-certificates/crew-certificates.component';
import { CrewCardComponent } from './crew-card/crew-card.component';
import { CrewService } from './crew.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CrewListComponent,
    HomeComponent,
    LanguageSelectorComponent,
    CrewEditComponent,
    CrewCertificatesComponent,
    CrewCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [provideHttpClient(withFetch()) , CrewService],
  bootstrap: [AppComponent],
})
export class AppModule {}
