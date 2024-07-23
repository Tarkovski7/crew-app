import { Component, OnInit } from '@angular/core';
import { Crew } from '../models/crew';
import { ActivatedRoute } from '@angular/router';
import { CrewService } from '../crew.service';

@Component({
  selector: 'app-crew-card',
  templateUrl: './crew-card.component.html',
  styleUrl: './crew-card.component.scss'
})
export class CrewCardComponent implements OnInit {
  crew!: Crew;
  constructor(private route: ActivatedRoute , private crewService: CrewService) {

  }
  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        this.crewService.getCrewById(id).subscribe(crew  => this.crew = crew);
      })
  }
}
