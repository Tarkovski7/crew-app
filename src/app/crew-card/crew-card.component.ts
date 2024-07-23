import { Component, OnInit } from '@angular/core';
import { Crew } from '../models/crew';
import { ActivatedRoute, Router } from '@angular/router';
import { CrewService } from '../crew.service';

@Component({
  selector: 'app-crew-card',
  templateUrl: './crew-card.component.html',
  styleUrl: './crew-card.component.scss',
})
export class CrewCardComponent implements OnInit {
  crew?: Crew;
  constructor(
    private route: ActivatedRoute,
    private crewService: CrewService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.crewService.getCrewById(id).subscribe((crew) => {
        this.crew = crew;
      });
    });
  }
  goBack() {
    this.router.navigate(['/crew-list']);
  }
}
