import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  getPlaces(p: any) {
    throw new Error("Method not implemented.");
  }
  
  public host:String="http://localhost:8080"
  constructor(public http:HttpClient) { }

  getProjections(s) {
    let url=s._links.projections.href.replace("{?projection}","")
    return this.http.get(url+"?projection=p1")
  }
  getSalles(c) {
    return this.http.get(c._links.salles.href)
  }
  getCinemas(v) {
    return this.http.get(v._links.cinemas.href)
  }

  public getVilles(){
    return this.http.get(this.host+"/villes");

  }
  onGetTicketPlaces(p){
    let url=p._links.tickets.href.replace("{?projection}","")
    return this.http.get(url+"?projection=t1")

  }
  payerTicket(formData){
    return this.http.post(this.host+"/payement",formData)
  }
  
}
