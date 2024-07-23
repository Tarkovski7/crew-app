import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Crew, Currency } from '../models/crew';
import { CrewService } from '../crew.service';

@Component({
  selector: 'app-crew-edit',
  templateUrl: './crew-edit.component.html',
  styleUrls: ['./crew-edit.component.scss'],
})
export class CrewEditComponent {
  crewForm: FormGroup;
  currencies = Object.values(Currency);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { crew: Crew },
    private fb: FormBuilder,
    private crewService: CrewService,
    public dialogRef: MatDialogRef<CrewEditComponent>
  ) {
    this.crewForm = this.fb.group({
      firstName: [data.crew.firstName, Validators.required],
      lastName: [data.crew.lastName, Validators.required],
      nationality: [data.crew.nationality, Validators.required],
      title: [data.crew.title, Validators.required],
      daysOnBoard: [data.crew.daysOnBoard, Validators.required],
      dailyRate: [data.crew.dailyRate, Validators.required],
      currency: [data.crew.currency, Validators.required],
    });
  }
  onSave() {
    if (this.crewForm.valid) {
      const updatedCrew: Crew = {
        ...this.data.crew,
        ...this.crewForm.value,
      };
      this.crewService.updateCrew(updatedCrew).subscribe(() => {
        this.dialogRef.close(updatedCrew);
      });
    }
  }


  onCancel(): void {
    this.dialogRef.close(false);
  }

  onNoClick(): void {

  }
}
