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
  //Definir o tipo que estará armazenado em "courses".
  //Quando coloco o $ ao final, demonstra que é um observable
  courses$: Observable<Course []>;

   //Definição das colunas da tabela do AngularMaterial
  displayedColumns = ['name', 'category', 'actions'];


    //Precisamos injetar a dependencia do course.service para poder chamar/usar seus métodos
  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
    )  {


      
    //this.courses = [];
    this.courses$ = this.coursesService.list()

    //tratamento de erro
    .pipe(

      //este catch também espera um Observable
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

  ngOnInit(): void {}

  onAdd() {
    console.log('clickkkkkk')
    //relative faz referencia a rota atual
   this.router.navigate( ['new'], {relativeTo: this.route});
  }
}
