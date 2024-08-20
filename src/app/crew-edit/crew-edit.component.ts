import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Crew, Currency } from '../models/crew';
import { CrewService } from '../crew.service';
import { CertificateSelectionDialogComponent } from '../certificate-selection-dialog/certificate-selection-dialog.component';
import { Certificate } from '../models/certificate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crew-edit',
  templateUrl: './crew-edit.component.html',
  styleUrls: ['./crew-edit.component.scss'],
})
export class CrewEditComponent implements OnInit {
  crewForm: FormGroup;
  currencies = Object.values(Currency);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private fb: FormBuilder,
    private crewService: CrewService,
    private dialog : MatDialog,
    private router : Router,
    public dialogRef: MatDialogRef<CrewEditComponent>

  ) {
    this.crewForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      daysOnBoard: ['', Validators.required],
      dailyRate: ['', Validators.required],
      currency: ['', Validators.required],
      certificates: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    if (this.data.id) {
      this.loadCrew(this.data.id);
    }
  }
  loadCrew(id: number): void {
    this.crewService.getCrewById(id).subscribe((crew : Crew) => {
      this.crewForm.patchValue({
        firstName: crew.firstName,
        lastName: crew.lastName,
        nationality: crew.nationality,
        title: crew.title,
        daysOnBoard: crew.daysOnBoard,
        dailyRate: crew.dailyRate,
        currency: crew.currency,
      });
      this.populateCertificates(crew.certificates);
    });
  }
  populateCertificates(certificates: any[]): void {
    const certificateFormGroups = certificates.map((cert) =>
      this.fb.group({
        name: [cert.name, Validators.required],
        issueDate: [cert.issueDate, Validators.required],
        expiryDate: [cert.expiryDate],
      })
    );
    const formArray  = this.fb.array(certificateFormGroups);
    this.crewForm.setControl('certificates', formArray);
  }

  get certificates(): FormArray {
    return this.crewForm.get('certificates') as FormArray;
  }

  addCertificate(): void {
    this.certificates.push(
      this.fb.group({
        name: ['', Validators.required],
        issueDate: ['', Validators.required],
        expiryDate: [''],
      })
    );
  }
  removeCertificate(index: number): void {
    this.certificates.removeAt(index);
  }

  openCertificateSelectionDialog(): void {
    const selectedCertificates = this.crewForm.get('certificates')?.value;
    const dialogRef = this.dialog.open(CertificateSelectionDialogComponent, {
      data: { selectedCertificates: selectedCertificates }
    });

    dialogRef.afterClosed().subscribe((result: Certificate[]) => {
      if (result) {
        this.updateCertificates(result);
      }
    });
  }
  updateCertificates(selectedCertificates: Certificate[]): void {
    const certificateArray = this.crewForm.get('certificates') as FormArray;
    certificateArray.clear();
    selectedCertificates.forEach(cert => {
      certificateArray.push(this.fb.group({
        name: [cert.name],
        issueDate: [cert.issueDate],
        expiryDate: [cert.expiryDate]
      }));
    });
  }

  onSave() {
    if (this.crewForm.valid) {
      const updatedCrew: Crew = {
        ...this.crewForm.value,
        id: this.data.id,
      };
      this.crewService.updateCrew(updatedCrew).subscribe(() => {
        this.dialogRef.close(updatedCrew);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
