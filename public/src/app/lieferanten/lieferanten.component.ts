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
  ELEMENT_DATA: Lieferant[] = [];

  constructor() { }

  ngOnInit(): void {
    this.ELEMENT_DATA = JSON.parse(localStorage.getItem("LieferantData"));
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  displayedColumns: string[] = ['Name', 'Lieferanten-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
