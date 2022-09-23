import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@gamedex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PublisherFilter, Publisher, ResponsePublisher } from '../models';


@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  baseURL: string = this._coreConfig.baseEndpoint;
  perPage: string = `${this._coreConfig.perPage}`;
  apiKey: string = this._coreConfig.apiKey;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getPublishers(page:number = 0, filter?: PublisherFilter): Observable<{publishers:Publisher[], totalCount:number}> {
    const { search = null } = filter || {};

    let params = new HttpParams();
    if (search) params = params.append('search', search);

    return this.http.get<ResponsePublisher>(`${this.baseURL}/publishers?key=${this.apiKey}&page=${page}&page_size=${this.perPage}`, { params }).pipe( //, {'headers': headers, params}
      map(({ results, count }) => {
        return {publishers: results || [], totalCount: Math.ceil(count / Number(this.perPage))}
      }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }

  getPublisherById(publisherId: number): Observable<Publisher | {}> {
    return this.http.get<Publisher>(`${this.baseURL}/publishers/${publisherId}?key=${this.apiKey}`).pipe( //, {'headers': headers, params}
      map((publisher) => {
        return publisher || {};
      }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }



}
