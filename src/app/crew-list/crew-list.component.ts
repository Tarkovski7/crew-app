import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Crew, Currency } from '../models/crew';
import { CrewEditComponent } from '../crew-edit/crew-edit.component';
import { Subscription } from 'rxjs';
import { CrewService } from '../crew.service';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.scss'],
})
export class CrewListComponent implements OnInit, OnDestroy {
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
  private subscription = new Subscription();

  constructor(public dialog: MatDialog, private translate: TranslateService , private crewService: CrewService) {}
  ngOnInit() {
    this.subscription.add(
      this.crewService.crew$.subscribe(data => {
        this.dataSource = data;
      })
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteCrew(crew: Crew) {
    this.dataSource = this.dataSource.filter((c) => c !== crew);
  }

  openEditDialog(crew: Crew) {
    const dialogRef = this.dialog.open(CrewEditComponent, {
      data: { crew: crew },
    });

    dialogRef.afterClosed().subscribe((updatedCrew: Crew) => {
      if (updatedCrew) {
        const index = this.dataSource.findIndex(c => c.id === updatedCrew.id);
        if (index !== -1) {
          // Güncellenmiş crew'ü listeye yansıt
          this.dataSource[index] = updatedCrew;
          // Listeyi güncellemek için Angular'ın değişiklik algılama mekanizmasını kullan
          this.dataSource = [...this.dataSource];
        }
      }
    });
  }
  updateCrew(updatedCrew: Crew) {
    const index = this.dataSource.findIndex((c) => c.id === updatedCrew.id);
    if (index !== -1) {
      this.dataSource[index] = updatedCrew;
    }

  }
}
