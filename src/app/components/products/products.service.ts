import { Injectable } from '@angular/core';
import { Products } from './products.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private baseurl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '',
    }),
  };

  createOne(product: Products) {
    return this.http
    .post<any>(`${this.baseurl}/products/`, product)
    .pipe(retry(1), map((res) => res?.data?.product || null), catchError(this.errorHandl));
  }
  updateOne(id: string, product: Products) {
    return this.http
    .patch<any>(`${this.baseurl}/products/${id}`, product)
    .pipe(retry(1), map((res) => res?.status === 'success' || 'fail'), catchError(this.errorHandl));
  }
  deleteOne(id: string) {
    return this.http
    .delete<any>(`${this.baseurl}/products/${id}`)
    .pipe(retry(1), map((res) => res?.status === 'success' || 'fail'), catchError(this.errorHandl));

  }
  findAll() {
    return this.http
    .get<any>(this.baseurl + '/products/')
    .pipe(retry(1), map((res) => res?.data?.products || []), catchError(this.errorHandl));
  }
  findOne(id: string) {
    return this.http
    .get<any>(`${this.baseurl}/products/${id}`)
    .pipe(retry(1), map((res) => res?.data?.product || null), catchError(this.errorHandl));
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
