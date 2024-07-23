import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrewService } from '../crew.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Crew, Currency } from '../models/crew';

@Component({
  selector: 'app-crew-add',
  templateUrl: './crew-add.component.html',
  styleUrl: './crew-add.component.scss',
})
export class CrewAddComponent {
  crewForm: FormGroup;
  currencies = Object.values(Currency);
  constructor(
    private fb: FormBuilder,
    private crewService: CrewService,
    public dialogRef: MatDialogRef<CrewAddComponent>
  ) {
    this.crewForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      daysOnBoard: ['', Validators.required],
      dailyRate: ['', Validators.required],
      currency: [Currency.USD, Validators.required],
    });
  }

  onSave(): void {
    if (this.crewForm.valid) {
      const newCrew: Crew = {
        id: 0,
        ...this.crewForm.value,
      };
      this.crewService.addCrew(newCrew).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
