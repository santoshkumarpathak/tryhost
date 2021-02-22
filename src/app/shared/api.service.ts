import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  //console.log(`header=>api_services${headers}`);
  constructor(private http: HttpClient) { }

  // Add student
  AddStudent(data: Student): Observable<any> {
    let API_URL = `${this.endpoint}/add-student`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
      console.log("calling add student=>api_service");
  }

  // Get all students
  GetStudents() {
    return this.http.get(`${this.endpoint}`);
    console.log("getstudent=>api_services");
  }

  // Get student
  GetStudent(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-student/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    console.log("get student by id => api_service");
  }

  // Update student
  UpdateStudent(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update-student/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
      console.log("update student=> api_services");
  }

  // Delete student
  DeleteStudent(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-student/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
    console.log("delete student => api-services");
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log("Get client-side error=>api_services");
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log("Get server-side error=> api_services");
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}