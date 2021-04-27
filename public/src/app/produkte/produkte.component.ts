import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Lieferant } from '../lieferanten/lieferanten.component';
import { Produzent } from '../produzenten/produzenten.component';

export interface Produkt {
  Bezeichnung: string,
  Herkunft: string,
  Kategorie: string,
  Verkaufspreis: number,
  Lieferant: string,
  Produzent: string,
  Anzahl: number
}

interface DropDown {
  value: string;
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
  edit_index: number;

  selected: Produkt;

  ELEMENT_DATA: Produkt[] = [];
  Lieferanten: Lieferant[] = [];
  DDLief: DropDown[] = [];
  Produzenten: Produzent[] = [];
  DDProd: DropDown[] = [];

  ddProd: string;
  ddLief: string;

  constructor() { }

  ngOnInit(): void {
    this.ELEMENT_DATA = JSON.parse(localStorage.getItem("ProduktData"));
    this.Lieferanten = JSON.parse(localStorage.getItem("LieferantData"));
    this.Lieferanten.forEach(lief => {
      this.DDLief.push({value: lief.Name})
    })
    this.Produzenten = JSON.parse(localStorage.getItem("ProduzentData"));
    this.Produzenten.forEach(prod => {
      this.DDProd.push({value: prod.Name})
    })
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
  changeLieferant(Lief: string) {
    this.iLieferant = Lief; 
  }
  changeProduzent(Prod: string) {
    this.iProduzent = Prod;
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

  edit() {
    this.edit_index = this.ELEMENT_DATA.findIndex(x => (
      x.Bezeichnung == this.selected.Bezeichnung &&
      x.Herkunft == this.selected.Herkunft &&
      x.Kategorie == this.selected.Kategorie &&
      x.Verkaufspreis == this.selected.Verkaufspreis &&
      x.Lieferant == this.selected.Lieferant &&
      x.Produzent == this.selected.Produzent &&
      x.Anzahl == this.selected.Anzahl)
    )

    this.ELEMENT_DATA[this.edit_index].Bezeichnung = this.iBezeichnung
    this.ELEMENT_DATA[this.edit_index].Herkunft = this.iHerkunft
    this.ELEMENT_DATA[this.edit_index].Kategorie = this.iKategorie
    this.ELEMENT_DATA[this.edit_index].Verkaufspreis = this.iVerkaufspreis
    this.ELEMENT_DATA[this.edit_index].Lieferant = this.iLieferant
    this.ELEMENT_DATA[this.edit_index].Produzent = this.iProduzent
    this.ELEMENT_DATA[this.edit_index].Anzahl = this.iAnzahl
  }

  delete() {
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(prod => prod !== this.selected);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log("Deleted "+ this.selected)
  }
  
  getRecord(row: Produkt) {
    this.selected = row;
    (document.getElementById("i-bez") as HTMLInputElement).value = row.Bezeichnung;
    this.iBezeichnung = row.Bezeichnung;
    (document.getElementById("i-her") as HTMLInputElement).value = row.Herkunft;
    this.iHerkunft = row.Herkunft;
    (document.getElementById("i-kat") as HTMLInputElement).value = row.Kategorie;
    this.iKategorie = row.Kategorie;
    (document.getElementById("i-vp") as HTMLInputElement).value = row.Verkaufspreis.toString();
    this.iVerkaufspreis = row.Verkaufspreis;
    this.ddLief = row.Lieferant
    this.iLieferant = row.Lieferant;
    this.ddProd = row.Produzent;
    this.iProduzent = row.Produzent;
    (document.getElementById("i-anz") as HTMLInputElement).value = row.Anzahl.toString();
    this.iAnzahl = row.Anzahl;
  }

  ngOnDestroy(){
    localStorage.setItem("ProduktData", JSON.stringify(this.ELEMENT_DATA))
  }

  displayedColumns: string[] = ['Bezeichnung', 'Herkunft', 'Kategorie', 'Verkaufspreis', 'Lieferant', 'Produzent', 'Anzahl'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
