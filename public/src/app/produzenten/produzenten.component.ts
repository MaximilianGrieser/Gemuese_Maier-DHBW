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
  ELEMENT_DATA: Produzent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.ELEMENT_DATA = JSON.parse(localStorage.getItem("ProduzentData"));
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log(this.ELEMENT_DATA)
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
