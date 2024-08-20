import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateSelectionDialogComponent } from './certificate-selection-dialog.component';

describe('CertificateSelectionDialogComponent', () => {
  let component: CertificateSelectionDialogComponent;
  let fixture: ComponentFixture<CertificateSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificateSelectionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
