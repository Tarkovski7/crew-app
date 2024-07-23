import { Component, Input } from '@angular/core';
import { Certificate } from '../models/certificate';

@Component({
  selector: 'app-crew-certificates',
  templateUrl: './crew-certificates.component.html',
  styleUrl: './crew-certificates.component.scss'
})
export class CrewCertificatesComponent {
  @Input() certificates : Certificate[] = []; 
}
