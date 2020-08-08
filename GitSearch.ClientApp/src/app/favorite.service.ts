import { Injectable } from '@angular/core';
import { GitSearchResultItem } from './models';
import { Observable, of, empty } from 'rxjs';
import { AlertService } from './alert.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { concatMap, catchError, filter, flatMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  readonly favoriteApiUrl: string;

  constructor(private http: HttpClient,  private authService: AuthenticationService, private alertService:AlertService) { 
    this.favoriteApiUrl = `${environment.apiUrl}/Favorite`;
  }

  add(item: GitSearchResultItem):Observable<void>{
    //if(!item && item.id) return empty();

    return this.http.post<any>(this.favoriteApiUrl, item).pipe(
      flatMap(f=> {
        this.alertService.success(environment.messages.saveDone); 
        return of(null);
      }),
      catchError(this.handleError),
    );
  }

  getItems():Observable<GitSearchResultItem[]>{
    return this.http.get<any>(this.favoriteApiUrl).pipe(
      tap(t=>console.log('favorit-getItems')),
      catchError(this.handleError),
    );
  }

  deleteItem(item: GitSearchResultItem ):Observable<any>{
    return this.alertService.confirm(`Would you like to remove "${item.full_name}"?`).pipe(
      filter(confirm=>confirm),
      flatMap(f => this.http.delete<any>(`${this.favoriteApiUrl}/${item.id}`)),
      catchError(this.handleError),
      );    
  }
  
  handleError = (err: HttpErrorResponse | any) => {
    console.error('An error occurred', err);
    this.alertService.error(environment.messages.serverError);
    return empty();
  }
}
