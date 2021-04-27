import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

export interface Lieferant {
  Name: string;
  LieferantenNr: number;
  Anschrift: string;
  Ansprechpartner: string;
}

@Component({
  selector: 'app-lieferanten',
  templateUrl: './lieferanten.component.html',
  styleUrls: ['./lieferanten.component.css']
})
export class LieferantenComponent implements OnInit {
  iName: string;
  iLieferantenNr: number;
  iAnschrift: string;
  iAnsprechpartner: string;
  edit_index: number;

  selected: Lieferant;

  ELEMENT_DATA: Lieferant[] = [];

  constructor() { }

  ngOnInit(): void {
    this.ELEMENT_DATA = JSON.parse(localStorage.getItem("LieferantData"));
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  changeName(event: Event) {
    this.iName = (event.target as HTMLInputElement).value;
  }
  changeLieferantenNr(event: Event) {
    this.iLieferantenNr = parseInt((event.target as HTMLInputElement).value);
  }
  changeAnschrift(event: Event) {
    this.iAnschrift = (event.target as HTMLInputElement).value;
  }
  changeAnsprechpartner(event: Event) {
    this.iAnsprechpartner = (event.target as HTMLInputElement).value;
  }

  add() {
    this.ELEMENT_DATA.push(
    {Name: this.iName, LieferantenNr: this.iLieferantenNr, Anschrift: this.iAnschrift, Ansprechpartner: this.iAnsprechpartner})
    console.log(this.ELEMENT_DATA)
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  edit() {    
    this.edit_index = this.ELEMENT_DATA.findIndex(x => (
      x.Name == this.selected.Name &&
      x.LieferantenNr == this.selected.LieferantenNr &&
      x.Anschrift == this.selected.Anschrift &&
      x.Ansprechpartner == this.selected.Ansprechpartner)
    )

    this.ELEMENT_DATA[this.edit_index].Name = this.iName
    this.ELEMENT_DATA[this.edit_index].LieferantenNr = this.iLieferantenNr
    this.ELEMENT_DATA[this.edit_index].Anschrift = this.iAnschrift
    this.ELEMENT_DATA[this.edit_index].Ansprechpartner = this.iAnsprechpartner
  }

  delete() {
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(prod => prod !== this.selected);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log("Deleted "+ this.selected)
  }

  getRecord(row: Lieferant) {
    this.selected = row;
    (document.getElementById("i-Name") as HTMLInputElement).value = row.Name;
    this.iName = row.Name;
    (document.getElementById("i-Lief") as HTMLInputElement).value = row.LieferantenNr.toString();
    this.iLieferantenNr = row.LieferantenNr;
    (document.getElementById("i-ans") as HTMLInputElement).value = row.Anschrift;
    this.iAnschrift = row.Anschrift;
    (document.getElementById("i-anp") as HTMLInputElement).value = row.Ansprechpartner;
    this.iAnsprechpartner = row.Ansprechpartner;
  }

  ngOnDestroy(){
    localStorage.setItem("LieferantData", JSON.stringify(this.ELEMENT_DATA))
  }

  displayedColumns: string[] = ['Name', 'Lieferanten-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
