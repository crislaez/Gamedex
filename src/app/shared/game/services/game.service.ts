import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@gamedex/core/services/core-config.service';
import { Game } from '@gamedex/shared/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GameFilter, ResponseGame } from '../models';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseURL: string = this._coreConfig.baseEndpoint;
  perPage: string = `${this._coreConfig.perPage}`;
  apiKey: string = this._coreConfig.apiKey;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getGames(page:number = 0, filter?: GameFilter): Observable<{games:Game[], totalCount:number}> {
    const { search = null } = filter || {};

    let params = new HttpParams();
    if (search) params = params.append('search', search);

    return this.http.get<ResponseGame>(`${this.baseURL}/games?key=${this.apiKey}&page=${page}&page_size=${this.perPage}&ordering=released`, { params }).pipe( //, {'headers': headers, params}
      map(({ results, count }) => {
        return {games: results || [], totalCount: Math.ceil(count / Number(this.perPage))}
      }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }

  getGameById(gameId: number): Observable<Game | {}> {
    return this.http.get<Game>(`${this.baseURL}/games/${gameId}?key=${this.apiKey}`).pipe(
      map((game) => {
        return game || {};
      }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }



}
