import { Component } from '@angular/core';
import { Crew } from '../models/crew';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.scss',
})
export class CrewListComponent {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard ',
    'dailyRate',
    'currency',
    'totalIncome',
    'actions',
  ];
  dataSource: Crew[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      nationality: 'American',
      title: 'Captain',
      daysOnBoard: 30,
      dailyRate: 100,
      currency: 'USD',
    },
  ];
  constructor(public dialog: MatDialog, private translate: TranslateService) {}
  deleteCrew(crew: Crew) {
    this.dataSource = this.dataSource.filter((data) => data !== crew);
  }
  openEditDialog(crew:Crew) {
    
  }
}
