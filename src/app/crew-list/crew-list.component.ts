import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Crew } from '../models/crew';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.scss']
})
export class CrewListComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'nationality', 'title', 'daysOnBoard', 'dailyRate', 'currency', 'totalIncome', 'actions'];
  dataSource: Crew[] = [
    { firstName: 'John', lastName: 'Doe', nationality: 'American', title: 'Captain', daysOnBoard: 30, dailyRate: 100, currency: 'USD' },
    { firstName: 'Jeyn', lastName: 'Doe', nationality: 'American', title: 'First Officer', daysOnBoard: 25, dailyRate: 90, currency: 'USD' },
    { firstName: 'Dom', lastName: 'Doe', nationality: 'American', title: 'Second Officer', daysOnBoard: 20, dailyRate: 85, currency: 'USD' },
    { firstName: 'Michel', lastName: 'Doe', nationality: 'American', title: 'Chief Engineer', daysOnBoard: 15, dailyRate: 95, currency: 'USD' },
    { firstName: 'Gabriel', lastName: 'Doe', nationality: 'American', title: 'Deckhand', daysOnBoard: 10, dailyRate: 80, currency: 'USD' },
    // Diğer kayıtlar...
  ];

  constructor(public dialog: MatDialog, private translate: TranslateService) { }

  deleteCrew(crew: Crew) {
    this.dataSource = this.dataSource.filter(c => c !== crew);
  }

  openEditDialog(crew: Crew) {
    // Popup açma işlemleri...
  }
}
