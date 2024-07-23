import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrewListComponent } from './crew-list/crew-list.component';
import { CrewCardComponent } from './crew-card/crew-card.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crew-list', component: CrewListComponent },
  { path: 'crew-card/:id', component: CrewCardComponent },
  { path: '', redirectTo: '/crew-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
