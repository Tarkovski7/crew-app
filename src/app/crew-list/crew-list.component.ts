import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Crew, Currency } from '../models/crew';
import { CrewEditComponent } from '../crew-edit/crew-edit.component';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.scss'],
})
export class CrewListComponent {
  displayedColumns: string[] = [
    'card',
    'firstName',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'totalIncome',
    'actions',
  ];
  dataSource: Crew[] = [
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

  constructor(public dialog: MatDialog, private translate: TranslateService) {}

  deleteCrew(crew: Crew) {
    this.dataSource = this.dataSource.filter((c) => c !== crew);
  }

  openEditDialog(crew: Crew) {
    const dialogref = this.dialog.open(CrewEditComponent, {
      data: { crew: crew },
    });
    dialogref.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
