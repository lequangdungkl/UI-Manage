import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPeople } from '../../interface/people';
import { formatDate } from '@angular/common'; 
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-people-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatButton, DatePipe],
  templateUrl: './people-form.component.html',
  styleUrl: './people-form.component.css'
})
export class PeopleFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  peopleForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Only allows letters and spaces
    dob: ['', [Validators.required]],
  })
  
  peopleId!: number
  isEdit = false;

  ngOnInit() {
    this.peopleId = this.route.snapshot.params['id'];
    if (this.peopleId) {
      this.isEdit = true;
      this.httpService.getPeople(this.peopleId).subscribe(result => {
        console.log(result);
        // Format the date before patching it into the form
        result.dob = formatDate(result.dob, 'yyyy-MM-dd', 'en');
        this.peopleForm.patchValue(result);
      });
    }
  }

  save() {
    console.log(this.peopleForm.value);
    const people: IPeople = {
      id: this.peopleId,
      name: this.peopleForm.value.name!,
      dob: this.peopleForm.value.dob!,
    };

    if (this.isEdit) {
      this.httpService.updatePeople(this.peopleId, people).subscribe(() => {
        console.log("Success")
        this.router.navigateByUrl("/people-list");
      });
    } else {
      this.httpService.createPeople(people).subscribe(() => {
        console.log("Success")
        this.router.navigateByUrl("/people-list");
      });
    }
  }
}
