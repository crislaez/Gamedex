import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@gamedex/core/services/core-config.service';
import { Game } from '@gamedex/shared/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Developer, DeveloperFilter, ResponseDeveloper } from '../models';


@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  baseURL: string = this._coreConfig.baseEndpoint;
  perPage: string = `${this._coreConfig.perPage}`;
  apiKey: string = this._coreConfig.apiKey;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getDevelopers(page:number = 0, filter?: DeveloperFilter): Observable<{developers:Developer[], totalCount:number}> {
    const { search = null } = filter || {};

    let params = new HttpParams();
    if (search) params = params.append('search', search);

    return this.http.get<ResponseDeveloper>(`${this.baseURL}/developers?key=${this.apiKey}&page=${page}&page_size=${this.perPage}`, { params }).pipe( //, {'headers': headers, params}
      map(({ results, count }) => {
        return {developers: results || [], totalCount: Math.ceil(count / Number(this.perPage))}
      }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }

  getDeveloperById(developerId: number): Observable<Game | {}> {
    return this.http.get<Game>(`${this.baseURL}/developers/${developerId}?key=${this.apiKey}`).pipe(
      map((developer) => {
        return developer || {};
      }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }



}
