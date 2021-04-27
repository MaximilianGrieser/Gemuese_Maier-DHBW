import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

export interface Produzent {
  Name: string;
  ProduzentenNr: number;
  Anschrift: string;
  Ansprechpartner: string;
}

@Component({
  selector: 'app-produzenten',
  templateUrl: './produzenten.component.html',
  styleUrls: ['./produzenten.component.css']
})
export class ProduzentenComponent implements OnInit {
  iName: string;
  iProduzentenNr: number;
  iAnschrift: string;
  iAnsprechpartner: string;
  edit_index: number;

  selected: Produzent;

  ELEMENT_DATA: Produzent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.ELEMENT_DATA = JSON.parse(localStorage.getItem("ProduzentData"));
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  changeName(event: Event) {
    this.iName = (event.target as HTMLInputElement).value;
  }
  changeProduzent(event: Event) {
    this.iProduzentenNr = parseInt((event.target as HTMLInputElement).value);
  }
  changeAnschrift(event: Event) {
    this.iAnschrift = (event.target as HTMLInputElement).value;
  }
  changeAnsprechpartner(event: Event) {
    this.iAnsprechpartner = (event.target as HTMLInputElement).value;
  }

  add() {
    this.ELEMENT_DATA.push(
    {Name: this.iName, ProduzentenNr: this.iProduzentenNr, Anschrift: this.iAnschrift, Ansprechpartner: this.iAnsprechpartner})
    console.log(this.ELEMENT_DATA)
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  edit() {
    this.edit_index = this.ELEMENT_DATA.findIndex(x => (
      x.Name == this.selected.Name &&
      x.ProduzentenNr == this.selected.ProduzentenNr &&
      x.Anschrift == this.selected.Anschrift &&
      x.Ansprechpartner == this.selected.Ansprechpartner)
    )

    this.ELEMENT_DATA[this.edit_index].Name = this.iName
    this.ELEMENT_DATA[this.edit_index].ProduzentenNr = this.iProduzentenNr
    this.ELEMENT_DATA[this.edit_index].Anschrift = this.iAnschrift
    this.ELEMENT_DATA[this.edit_index].Ansprechpartner = this.iAnsprechpartner
  }

  delete() {
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(prod => prod !== this.selected);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log("Deleted "+ this.selected)
  }

  getRecord(row: Produzent) {
    this.selected = row;
    (document.getElementById("i-name") as HTMLInputElement).value = row.Name;
    this.iName = row.Name;
    (document.getElementById("i-prodNr") as HTMLInputElement).value = row.ProduzentenNr.toString();
    this.iProduzentenNr = row.ProduzentenNr;
    (document.getElementById("i-ans") as HTMLInputElement).value = row.Anschrift;
    this.iAnschrift = row.Anschrift;
    (document.getElementById("i-anp") as HTMLInputElement).value = row.Ansprechpartner;
    this.iAnsprechpartner = row.Ansprechpartner;
  }

  displayedColumns: string[] = ['Name', 'Produzenten-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  ngOnDestroy(){
    localStorage.setItem("ProduzentData", JSON.stringify(this.ELEMENT_DATA))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
