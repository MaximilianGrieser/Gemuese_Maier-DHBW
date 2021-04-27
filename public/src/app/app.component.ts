import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import  *  as  datafile  from  './data.json';
import { Produkt } from './produkte/produkte.component';
import { Lieferant } from './lieferanten/lieferanten.component';
import { Produzent } from './produzenten/produzenten.component';

export interface Data {
  Produkte: Produkt[]
  Lieferanten: Lieferant[]
  Produzenten: Produzent[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'businesssite';
  currentRoute: string;

  ELEMENT_DATA: Data = (datafile as any).default;

  constructor(private router: Router){
    this.initStorrage();
    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd ? console.log(event.url): null;
    })
  }

  initStorrage(){
    console.log(this.ELEMENT_DATA[0])

    if(!(localStorage.getItem("ProduktData"))) {
      console.log(this.ELEMENT_DATA[0].Produkte)
      localStorage.setItem("ProduktData", JSON.stringify(this.ELEMENT_DATA[0].Produkte))
    }
    if(!(localStorage.getItem("LieferantData"))) {
      console.log(this.ELEMENT_DATA[0].Lieferanten)
      localStorage.setItem("LieferantData", JSON.stringify(this.ELEMENT_DATA[0].Lieferanten))
    }
    if(!(localStorage.getItem("ProduzentData"))) {
      console.log(this.ELEMENT_DATA[0].Produzent)
      localStorage.setItem("ProduzentData", JSON.stringify(this.ELEMENT_DATA[0].Produzenten))
    }
  }
}
