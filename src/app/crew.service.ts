import { Injectable } from '@angular/core';
import { Crew, Currency } from './models/crew';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private crewData: Crew[] = [
    new Crew(
      1,
      'John',
      'Doe',
      'American',
      'Captain',
      30,
      100,
      Currency.USD,
      []
    ),
    new Crew(
      2,
      'Jeyn',
      'Doe',
      'American',
      'First Officer',
      25,
      90,
      Currency.EUR,
      []
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
      []
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
      []
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
      []
    ),
  ];
  constructor() {}
  getCrewById(id: number): Observable<Crew> {
    const crew = this.crewData.find((c) => c.id === id);
    return of(crew!);
  }
}
