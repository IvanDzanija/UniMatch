import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { FormIntroComponent } from './form/form-intro/form-intro.component';
import { AppRoutesModule } from './app.routes';
import { TopListComponent } from './top-list/top-list.component';
import { UniversityCardComponent } from './university-card/university-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SavedUniversitiesComponent } from './saved-universities/saved-universities.component';
import { SavedUniCardComponent } from './saved-uni-card/saved-uni-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    FormIntroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    AppRoutesModule,
    TopListComponent,
    UniversityCardComponent,
    FontAwesomeModule,
    SavedUniversitiesComponent,
    SavedUniCardComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }