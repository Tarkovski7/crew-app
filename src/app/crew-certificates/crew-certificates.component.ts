import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Certificate } from '../models/certificate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crew-certificates',
  templateUrl: './crew-certificates.component.html',
  styleUrl: './crew-certificates.component.scss',
})
export class CrewCertificatesComponent {
  @Input() certificates: Certificate[] = [];
}
