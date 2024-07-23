import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Crew, Currency } from '../models/crew';
import { CrewEditComponent } from '../crew-edit/crew-edit.component';
import { CrewService } from '../crew.service';
import { CrewAddComponent } from '../crew-add/crew-add.component';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.scss'],
})
export class CrewListComponent implements OnInit {
  displayedColumns: string[] = [
    'card',
    'id',
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
  dataSource: Crew[] = [];
  totalIncomeCurrency: Record<Currency, number> = {
    [Currency.USD]: 0,
    [Currency.EUR]: 0
  };
  currencies = Currency;

  constructor(
    public dialog: MatDialog,
    private crewService: CrewService
  ) {}

  ngOnInit() {
    this.loadCrewData();
  }

  loadCrewData() {
    this.crewService.getCrew().subscribe((data) => {
      this.dataSource = data;
      this.calculateTotalIncomeByCurrency();
    });
  }

  calculateTotalIncomeByCurrency() {
    this.totalIncomeCurrency = this.dataSource.reduce((acc, crew) => {
      const totalIncome = crew.dailyRate * crew.daysOnBoard;
      acc[crew.currency] += totalIncome;
      return acc;
    }, {
      [Currency.USD]: 0,
      [Currency.EUR]: 0
    } as Record<Currency, number>);
  }

  deleteCrew(crew: Crew) {
    this.crewService.deleteCrew(crew.id).subscribe(() => {
      this.dataSource = this.dataSource.filter((c) => c.id !== crew.id);
      this.calculateTotalIncomeByCurrency();
    });
  }

  openEditDialog(crew: Crew) {
    const dialogRef = this.dialog.open(CrewEditComponent, {
      data: { crew: crew },
    });

    dialogRef.afterClosed().subscribe((updatedCrew: Crew) => {
      if (updatedCrew) {
        const index = this.dataSource.findIndex((c) => c.id === updatedCrew.id);
        if (index !== -1) {
          this.dataSource[index] = updatedCrew;
          this.calculateTotalIncomeByCurrency();
        }
        this.loadCrewData();
      }
    });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(CrewAddComponent);

    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.loadCrewData();
      }
    });
  }
}
