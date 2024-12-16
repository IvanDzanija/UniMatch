import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { TopListComponent } from './top-list/top-list.component';
import { SavedUniversitiesComponent } from './saved-universities/saved-universities.component';



export const routes: Routes = [
  {
    path: 'form', component: FormComponent, title: "Form - Unimatch"
  },
  {
    path: '', redirectTo: '/form', pathMatch: 'full'
  },
  {
    path: 'top-universities', component: TopListComponent
  },
  {
    path: 'saved', component: SavedUniversitiesComponent
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