import { Injectable } from '@angular/core';
import { Crew, Currency } from './models/crew';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { Certificate } from './models/certificate';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private crewData: Crew[] = [
    new Crew(1, 'John', 'Doe', 'American', 'Captain', 30, 100, Currency.USD, [
      new Certificate('First Aid', new Date('2020-01-01')),
      new Certificate('Safety Training', new Date('2021-02-01')),
      new Certificate('Marine Engineering', new Date('2019-03-01')),
      new Certificate('Navigation', new Date('2018-04-01')),
      new Certificate('Communication', new Date('2022-05-01')),
    ]),
    new Crew(
      2,
      'Jeyn',
      'Doe',
      'American',
      'First Officer',
      25,
      90,
      Currency.EUR,
      [
        new Certificate('First Aid', new Date('2020-01-01')),
        new Certificate('Safety Training', new Date('2021-02-01')),
        new Certificate('Marine Engineering', new Date('2019-03-01')),
        new Certificate('Navigation', new Date('2018-04-01')),
        new Certificate('Communication', new Date('2022-05-01')),
      ]
    ),
    new Crew(
      3,
      'Dom',
      'Doe',
      'American',
      'Second Officer',
      20,
      85,
      Currency.USD,
      [
        new Certificate('First Aid', new Date('2020-01-01')),
        new Certificate('Safety Training', new Date('2021-02-01')),
        new Certificate('Marine Engineering', new Date('2019-03-01')),
        new Certificate('Navigation', new Date('2018-04-01')),
        new Certificate('Communication', new Date('2022-05-01')),
      ]
    ),
    new Crew(
      4,
      'Michel',
      'Doe',
      'American',
      'Chief Engineer',
      15,
      95,
      Currency.EUR,
      [
        new Certificate('First Aid', new Date('2020-01-01')),
        new Certificate('Safety Training', new Date('2021-02-01')),
        new Certificate('Marine Engineering', new Date('2019-03-01')),
        new Certificate('Navigation', new Date('2018-04-01')),
        new Certificate('Communication', new Date('2022-05-01')),
      ]
    ),
    new Crew(
      5,
      'Gabriel',
      'Doe',
      'American',
      'Deckhand',
      10,
      80,
      Currency.USD,
      [
        new Certificate('First Aid', new Date('2020-01-01')),
        new Certificate('Safety Training', new Date('2021-02-01')),
        new Certificate('Marine Engineering', new Date('2019-03-01')),
        new Certificate('Navigation', new Date('2018-04-01')),
        new Certificate('Communication', new Date('2022-05-01')),
      ]
    ),
  ];
  private crewSubject = new BehaviorSubject<Crew[]>(this.crewData);
  crew$ = this.crewSubject.asObservable();
  constructor() {}
  getCrew(): Observable<Crew[]> {
    return of(this.crewData).pipe(
      catchError(error => throwError(() => new Error('Error fetching crew data')))
    );
  }
  getCrewById(id: number): Observable<Crew> {
    const crew = this.crewData.find(c => c.id === id);
    if (!crew) {
      return throwError(() => new Error('Crew not found'));
    }
    return of(crew);
  }
  updateCrew(updatedCrew: Crew): Observable<void> {
    const index = this.crewData.findIndex(c => c.id === updatedCrew.id);
    if (index !== -1) {
      this.crewData.splice(index, 1, updatedCrew);
      this.crewSubject.next([...this.crewData]);
    }
    return of(undefined);
  }
  addCrew(newCrew: Crew): Observable<void> {
    newCrew.id = Math.max(...this.crewData.map(c => c.id), 0) + 1;
    this.crewData.push(newCrew);
    this.crewSubject.next([...this.crewData]);
    return of(undefined);
  }
  deleteCrew(id: number): Observable<void> {
    this.crewData = this.crewData.filter((c) => c.id !== id);
    this.crewSubject.next(this.crewData);
    return of(undefined);
  }
}
