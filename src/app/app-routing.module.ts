import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChampionsComponent} from './champions/champions.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChampionDetailComponent} from './champion-detail/champion-detail.component';

const routes: Routes = [
  {path: 'champions', component: ChampionsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: ChampionDetailComponent}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRoutingModule { }
