import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';



@Injectable({
	providedIn: 'root'
})
export class ResourcesService {
	private heroesUrl = 'http://localhost:3000/heroes';
	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	  };

	constructor(
		private http: HttpClient,
		private messageService: MessageService) { }


	getList(): Observable<Hero[]> {
		return this.http.get<Hero[]>('http://localhost:3000/heroes') //Recibes la información y se completa
			.pipe(
				tap(_ => this.log('fetched heroes')),
				catchError(this.handleError<Hero[]>('getHeroes', []))
			)
	}

	searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
			return of([]); // Lo que quiere decir que si no existe el término, devuelve un array vacío
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
			tap(x => x.length ?
				this.log(`found heroes matching "${term}`) :
				this.log(`no heroes matching ${term}`)),
			catchError(this.handleError<Hero[]>('searchHeroes', []))
		);
	}

	updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
			tap(_ => this.log(`updated hero id = ${ hero.id })`),
			catchError(this.handleError<any>('updateHero'))
		))
	}

	addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
        );
    }

	private log(mesagge: string) {
		this.messageService.add(`HeroService: ${mesagge}`)
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		}
	}
}