import { Injectable } from '@angular/core';
import { Course } from '../model/course';
// este abaixo também é para usarmos requisições http


import { HttpClient } from '@angular/common/http';
import { first, tap, delay } from 'rxjs';


//Injeção de independencia
@Injectable({
  // a instancia desta classe será funcionada na raizde um projeto( escopop global)
  providedIn: 'root'
})
export class CoursesService {
  //o readonly impede modificações
  //não é preciso informar o localhost:8080 pois tem no arquivo proxy.config
  private readonly API = 'api/courses';


   // injetar dependencia do httpClient
  //Preciso de uma instancia de httpClient
  constructor(private httpClient: HttpClient) { }


    //declarar o método que vai retornar a lista de cursos do tipo Course (interface) para o componente
  // para podermos refatorar esta lista

  list() {
   
      return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        //delay(5000),
        tap(courses => console.log(courses))
      );   
  }

  
  //enviar ao backend o curso para salva na bd
  // no caso recebe como parametro uma interface course
  saveCourse(record: Course) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
}
