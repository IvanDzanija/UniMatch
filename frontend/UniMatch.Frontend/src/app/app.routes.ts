import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';



export const routes: Routes = [
    {
        path: 'form', component:FormComponent, title: "Form - Unimatch"
      },
      {
        path: '',redirectTo:'/form', pathMatch:'full'
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