import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  Name: string;
  LieferantenNr: number;
  Anschrift: string;
  Ansprechpartner: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 'Siren Express', LieferantenNr: 1789, Anschrift: 'Unter den Linden 4, Berlin', Ansprechpartner: 'Sibil Siren'}
];

@Component({
  selector: 'app-lieferanten',
  templateUrl: './lieferanten.component.html',
  styleUrls: ['./lieferanten.component.css']
})
export class LieferantenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['Name', 'Lieferanten-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
