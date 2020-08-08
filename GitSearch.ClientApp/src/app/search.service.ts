import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, of, empty, BehaviorSubject } from 'rxjs';
import { catchError, retry, flatMap, concatMap, filter, tap, finalize } from 'rxjs/operators';
//import { AuthService } from './auth/auth.service';
import { AuthenticationService } from './authentication.service';
import { IGitSearchResult, GitSearchResultItem } from './models';
import { AlertService } from './alert.service';

@Injectable(
  {providedIn: 'root'}
)
export class SearchService {

  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable();

  private searchApiUrl: string;

  constructor(private http: HttpClient,  private authService: AuthenticationService, private alertService:AlertService) {     
    this.searchApiUrl = `${environment.apiUrl}/Search`;
  }

  search(query: string):Observable<GitSearchResultItem[]> {
        this.loading.next(true);
        let params = new HttpParams().set("q",query);
        return this.http.get<IGitSearchResult>(this.searchApiUrl, {
          params: params
        }).pipe(
        flatMap( res => {
            var hasItems = res && Array.isArray(res.items) && res.items.length > 0;
            if (!hasItems){
              console.warn('no search results');
              return empty();
            }
            let newItems = res.items.map(m=> new GitSearchResultItem(m.id, m.full_name, m.html_url, m.description, m.forks, m.open_issues, m.watchers));
            return of(newItems);
         }),
      catchError(this.handleError),
      finalize(() => this.loading.next(false))
    );
  }
  
  checkPrivate() {
    //return this.authService.getTokenSilently$().pipe(
      //concatMap(token => {
        //console.log('getTokenSilently', token);
        return this.http.get<any>(`${environment.apiUrl}/Account/Private`, {
          //headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        }).pipe(
      //}),
      catchError(this.handleError)
    );
  }

  handleError = (err: HttpErrorResponse | any) => {
    console.error('An error occurred', err);
    this.alertService.error(environment.messages.serverError);
    //return throwError(err.message || err);
    return empty();
  }
  
}
