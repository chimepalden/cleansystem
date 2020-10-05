// Service for making http requests
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { Report } from '../models/reportModel.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _reportUrl = 'http://localhost:2000/report';
  private _userRegisterUrl = 'http://localhost:2000/user/register';
  private _loginUrl = 'http://localhost:2000/user/login';
  private _userUrl = 'http://localhost:2000/user';
  private _subscriberRegisterUrl = 'http://localhost:2000/subscriber/register';

  constructor(private _http: HttpClient, private _router: Router) { }

  // Get reports related to the parameter
  getReports(parameter: any): Observable<any> {
    return this._http.get<any>(`${this._reportUrl}/${parameter}`)
                     .pipe(catchError(this.handleError));
  }

  // Register a new problem
  registerReport(report: any): Observable<any> {
    return this._http.post<any>(this._reportUrl, report)
                      .pipe(catchError(this.handleError));
  }

  // Get all users
  getUsers(): Observable<any> {
    return this._http.get<any>(this._userUrl)
                      .pipe(catchError(this.handleError));
  }


  // Register a new user/staff and returns observable
  registerUser(user: any): Observable<any> {
    return this._http.post<any>(this._userRegisterUrl, user)
                     .pipe(catchError(this.handleError));
  }

  // Subscribe the user
  subscribeUser(user: any): Observable<any> {
    return this._http.post<any>(this._subscriberRegisterUrl, user)
                      .pipe(catchError(this.handleError));
  }

  // Login user/staff and returns observable
  loginUser(user: any): Observable<any> {
    return this._http.post<any>(this._loginUrl, user)
                     .pipe(catchError(this.handleError));
  }

  // Check if the user is logged in or not.
  // returns boolean value
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  // Logout the user
  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/cleansystem']);
  }

  // Getting token for authentication
  getToken() {
    return localStorage.getItem('token');
  }

  // Handling Errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error:', errorResponse.error.message);
    } else {
      console.error('Server Side Error:', errorResponse);
    }
    return throwError('There is a problem with the service. We are working on it.');
  }

}
