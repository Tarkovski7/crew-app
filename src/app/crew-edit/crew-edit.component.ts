import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crew-edit',
  templateUrl: './crew-edit.component.html',
  styleUrl: './crew-edit.component.scss'
})
export class CrewEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data : any) {

  }
  onNoClick(): void {
    // Implement this method if necessary
  }

}
