import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { TopListComponent } from './top-list/top-list.component';
import { SavedUniversitiesComponent } from './saved-universities/saved-universities.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';



export const routes: Routes = [
  {
    path: 'form', component: FormComponent, title: "Form"
  },
  {
    path: '', redirectTo: '/form', pathMatch: 'full'
  },
  {
    path: 'top-universities', component: TopListComponent, title: "Your Top 10"
  },
  {
    path: 'saved', component: SavedUniversitiesComponent, title: "Saved Universities"
  },
  {
    path: 'login', component: LoginComponent, title: "Login"
  },
  {
    path: 'register', component: RegistrationComponent, title: "Register"
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutesModule { }