import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import  *  as  datafile  from  './produkte.json';

export interface Produkt {
  Bezeichnung: string,
  Herkunft: string,
  Kategorie: string,
  Verkaufspreis: number,
  Lieferant: string,
  Produzent: string,
  Anzahl: number
}

@Component({
  selector: 'app-bestand',
  templateUrl: './produkte.component.html',
  styleUrls: ['./produkte.component.css']
})

export class ProdukteComponent implements OnInit {
  iBezeichnung: string;
  iHerkunft: string;
  iKategorie: string;
  iVerkaufspreis: number;
  iLieferant: string;
  iProduzent: string;
  iAnzahl: number;

  ELEMENT_DATA: Produkt[] = (datafile as any).default;

  constructor() { }

  ngOnInit(): void {
    console.log (this.ELEMENT_DATA);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  changeBezeichnung(event: Event) {
    this.iBezeichnung = (event.target as HTMLInputElement).value;
  }
  changeHerkunft(event: Event) {
    this.iHerkunft = (event.target as HTMLInputElement).value;
  }
  changeKategorie(event: Event) {
    this.iKategorie = (event.target as HTMLInputElement).value;
  }
  changeVerkaufspreis(event: Event) {
    this.iVerkaufspreis = parseInt((event.target as HTMLInputElement).value);
  }
  changeLieferant(event: Event) {
    this.iLieferant = (event.target as HTMLInputElement).value;
  }
  changeProduzent(event: Event) {
    this.iProduzent = (event.target as HTMLInputElement).value;
  }
  changeAnzahl(event: Event) {
    this.iAnzahl = parseInt((event.target as HTMLInputElement).value);
  }
  
  add() {
    this.ELEMENT_DATA.push(
    {Bezeichnung: this.iBezeichnung, Herkunft: this.iHerkunft, Kategorie: this.iKategorie, Verkaufspreis: this.iVerkaufspreis, Lieferant: this.iLieferant, Produzent: this.iProduzent, Anzahl: this.iAnzahl})
    console.log(this.ELEMENT_DATA)
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }  

  displayedColumns: string[] = ['Bezeichnung', 'Herkunft', 'Kategorie', 'Verkaufspreis', 'Lieferant', 'Produzent', 'Anzahl'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
