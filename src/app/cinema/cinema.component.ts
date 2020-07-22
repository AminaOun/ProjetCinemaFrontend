import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public villes; public cinemas;
  public currentVille;public salles;
  public currentCinema;public currentProjection;
  selectedTickets: any[];


  constructor(public cinemaService:CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles()
       .subscribe(data=>{
         this.villes=data;

       },err=>{
         console.log(err);

       })

  }
  onGetCinema(v){
    this.currentVille=v;
    this.salles=undefined;
    this.cinemaService.getCinemas(v)
         .subscribe(data=>{
          this.cinemas=data;
 
        },err=>{
          console.log(err);
 
        })
  }
  onGetTicketPlaces(p){
    this.currentProjection=p;
    this.cinemaService.onGetTicketPlaces(p)
    .subscribe(data=>{
      this.currentProjection.tickets=data;
      this.selectedTickets=[]

    },err=>{
      console.log(err);

    })

  }
  onPayTicket(formData){
    let tickets=[]
    this.selectedTickets.forEach(t=>{
      tickets.push(t.id)
    })
    formData.tickets=tickets
    this.cinemaService.payerTicket(formData)
    .subscribe(data=>{
      alert("Vos tickets sont bien réservés et payés")
      this.onGetTicketPlaces(this.currentProjection)

    },err=>{
      console.log(err);

    })

  }
  onSelectTicket(t){
    if(!t.selected){
      t.selected=true
      this.selectedTickets.push(t)
    }
    else{
      t.selected=false
      this.selectedTickets.pop()
    }
    console.log(this.selectedTickets)

  }
  onGetSalles(c){
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
         .subscribe(data=>{
          this.salles=data;
          this.salles._embedded.salles.forEach(salle => {
            this.cinemaService.getProjections(salle)
            .subscribe(data=>{
              salle.projections=data;
            },err=>{
              console.log(err);
            })       
          })
        },err=>{
          console.log(err);
 
        })
  }
  getTicketClass(t){
    let str="btn ticket "
    if(t.reserve==true){
      str+="btn-danger"
    }
    else if(t.selected==true){
      str+="btn-info"
    }
    else{
      str+="btn-primary"
    }
    return str;


  }
  


}
