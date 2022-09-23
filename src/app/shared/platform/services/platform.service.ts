import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@gamedex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Platform, PlatformFilter, PlatformResponse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  baseURL: string = this._coreConfig.baseEndpoint;
  perPage: string = `${this._coreConfig.perPage}`;
  apiKey: string = this._coreConfig.apiKey;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getPlatforms(page: number, filter?: PlatformFilter): Observable<{platforms:Platform[], totalCount:number}> {
    const { search } = filter || {};

    let params = new HttpParams();
    if (search) params = params.append('search', search);

    return this.http.get<PlatformResponse>(`${this.baseURL}/platforms?key=${this.apiKey}&page=${page}&page_size=${this.perPage}`, { params }).pipe(
      map(({ results, count }) => {
        return { platforms: results || [], totalCount: Math.ceil(count / Number(this.perPage)) }
      }),
      // map(() => {
      //   throw 405
      // }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }

  getPlatformById(platformId: number): Observable<Platform | {}> {
    return this.http.get<Platform>(`${this.baseURL}/platforms/${platformId}?key=${this.apiKey}`).pipe(
      map((platform) => {
        return platform || {}
      }),
      // map(() => {
      //   throw 405
      // }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }




}
