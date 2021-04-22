import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  Name: string;
  KundenNr: number;
  Anschrift: string;
  Ansprechpartner: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 'MysticFalls Gruenderfarm', KundenNr: 1864, Anschrift: 'Wickery Bridge 2, Mystic Falls', Ansprechpartner: 'Carol Lockwood'}
];

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.css']
})
export class KundenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['Name', 'Kunden-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
