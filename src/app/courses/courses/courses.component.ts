import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent  {

  courses$: Observable<Course []>;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
    )  {


      
    //this.courses = [];
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar curso')
        return of([])
      })
      
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, { 
      data: errorMsg
    });
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  

  }

  onAdd() {
   this.router.navigate( ['new'], {relativeTo: this.route});
  }
}
