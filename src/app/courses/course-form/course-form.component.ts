import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})


export class CourseFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private _snackBar: MatSnackBar
    ) {

      //Leva o parametro a um objeto correspondente ao
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

     ngOnInit(): void { }

  onSubmit() {
    this.coursesService.saveCourse(this.form.value).subscribe({  
      next: (data) => console.log(data),
      error: () => {
        this.onError();
   },
});

  }

  private onError(): void {
    this._snackBar.open('Erro ao salvar o curso!', '', {
      duration: 3000,
    });
  }

  onCancel() {

  }

}
