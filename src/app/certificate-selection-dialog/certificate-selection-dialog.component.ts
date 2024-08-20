import { Component, Inject } from '@angular/core';
import { Certificate } from '../models/certificate';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-certificate-selection-dialog',
  templateUrl: './certificate-selection-dialog.component.html',
  styleUrl: './certificate-selection-dialog.component.scss',
})
export class CertificateSelectionDialogComponent {
  certificates: Certificate[] = [
    new Certificate('First Aid', new Date('2020-01-01')),
    new Certificate('Safety Training', new Date('2021-02-01')),
    new Certificate('Marine Engineering', new Date('2019-03-01')),
    new Certificate('Navigation', new Date('2018-04-01')),
    new Certificate('Communication', new Date('2022-05-01')),
  ];

  selectedCertificates: Certificate[] = [];
  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<CertificateSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedCertificates = data.selectedCertificates || [];
  }
  onSelectCertificate(certificate: Certificate): void {
    const index = this.selectedCertificates.findIndex(
      (selected) =>
        selected.name === certificate.name &&
        selected.issueDate.getTime() === certificate.issueDate.getTime()
    );
    if (index === -1) {
      this.selectedCertificates.push(certificate);
    } else {
      this.selectedCertificates.splice(index, 1);
    }
  }

  onSave(): void {
    this.dialogRef.close(this.selectedCertificates);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  isSelected(certificate: Certificate): boolean {
    return this.selectedCertificates.some(
      (selected) =>
        selected.name === certificate.name &&
        selected.issueDate.getTime() === certificate.issueDate.getTime()
    );
  }
}
