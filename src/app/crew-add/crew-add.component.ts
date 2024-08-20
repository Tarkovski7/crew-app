import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrewService } from '../crew.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Crew, Currency } from '../models/crew';
import { CertificateSelectionDialogComponent } from '../certificate-selection-dialog/certificate-selection-dialog.component';
import { Certificate } from '../models/certificate';

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
    public dialogRef: MatDialogRef<CrewAddComponent>,
    private dialog: MatDialog
  ) {
    this.crewForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      daysOnBoard: ['', Validators.required],
      dailyRate: ['', Validators.required],
      currency: [Currency.USD, Validators.required],
      certificates: this.fb.array([]),
    });
  }

  get certificates(): FormArray {
    return this.crewForm.get('certificates') as FormArray;
  }

  openCertificateSelectionDialog(): void {
    const dialogRef = this.dialog.open(CertificateSelectionDialogComponent, {
      width: '600px',
      data: { selectedCertificates: this.certificates.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.certificates.clear();
        result.forEach((element: Certificate) => {
          this.certificates.push(
            this.fb.group({
              name: [element.name, Validators.required],
              issueDate: [
                element.issueDate.toISOString().split('T')[0],
                Validators.required,
              ],
              expiryDate: [
                element.expiryDate
                  ? element.expiryDate.toISOString().split('T')[0]
                  : '',
              ],
            })
          );
        });
      }
    });
  }

  removeCertificate(index: number): void {
    this.certificates.removeAt(index);
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
