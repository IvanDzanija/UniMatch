import { Component, inject } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { inputInformation } from '../form-input.model';
import { FormsModule } from '@angular/forms';
import { FormService } from './form.service';
import { University } from '../top-list/toplist-output.model';
import { Router } from '@angular/router';
import { response } from 'express';
import { DataService } from './data.service';
@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss', './form.component.css']
})
export class FormComponent {

  dataService = inject(DataService)





  safetyError: boolean = false;


  majorOptions: any[] = [

    { text: 'Business', value: 'Business' },
    { text: 'Computer science', value: 'Computer Science' },
    { text: 'Economics', value: 'Economics' },
    { text: 'Mathematics', value: 'Mathematics' },
    { text: 'Psychology', value: 'Psychology' },
    { text: 'Biology', value: 'Biology' },
    { text: 'Law', value: 'Law' },
    { text: 'Art', value: 'Art' },
    { text: 'Physics', value: 'Physics' }
  ]

  //ngmodelchange se poziva PRIJE binding-a pri promjeni minSafety ili maxSafety, pa prvo trebamo uhvatiti novu vrijednost iz event-a
  //i onda tek pozvati validatesafety
  maxValidateSafety(value: string) {       //update-amo maxSafety i zovemo validateSafety
    this.safetyError = this.service.validateSafety(this.info.safetyMin, value);
  }
  minValidateSafety(value: string) {       //update-amo minSafety i zovemo validateSafety
    this.safetyError = this.service.validateSafety(value, this.info.safetyMax);
  }

  constructor(private formsModule: FormsModule, private matSlider: MatSliderModule, private service: FormService, private router: Router) { }
  //ne koristim standalone komponente iz navike

  info: inputInformation = {         //objekt koji se post-a
    continent: "",
    rankMin: 1,
    rankMax: 10000,
    rankPrio: 0,
    safetyMin: "",
    safetyMax: "",
    safetyPrio: 0,
    accMin: 5,
    accMax: 80,
    accPrio: 0,
    ISRMin: 1,
    ISRMax: 100,
    ISRPrio: 0,
    CoLMin: 1,
    CoLMax: 50,
    CoLPrio: 0,
    rentMax: 50,
    rentMin: 1,
    rentPrio: 0,
    groceryMin: 1,
    groceryMax: 50,
    groceryPrio: 0,
    transportMin: 1,
    transportMax: 50,
    transportPrio: 0,
    recreationMin: 1,
    recreationMax: 50,
    recreationPrio: 0,
    healthcareBudgetMin: 1,
    healthcareBudgetMax: 50,
    healthcareBudgetPrio: 0,
    tuitionBudgetMin: 1,
    tuitionBudgetMax: 50,
    tuitionBudgetPrio: 0,
    major: ""




  }


  unis: University[] = [];
  uniFilter() {      //funkcija koja se poziva pri submit-u
    console.log(this.info);
    this.service.toPost(this.info).subscribe(response => {
      console.log(response.data)
      this.dataService.setUniversities(response.data)
      this.router.navigate(['/top-universities']);
    });
  }
}
