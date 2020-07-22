import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CinemaComponent } from './cinema/cinema.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: "cinema",
    component: CinemaComponent
  },
  {
    path: "home",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
