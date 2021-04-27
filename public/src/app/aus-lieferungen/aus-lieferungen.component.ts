import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

/**
 * defines the columns of the table "ausgehende Lieferungen"
 */
export interface PeriodicElement {
  Datum: string;
  Kunde: string;
  Produkt: string;
  Menge: number;
  Preis: number;
  Lieferschein: string;
}

/**
 * example entry/entries that will be shown in the table "ausgehende Lieferungen"
 */
const ELEMENT_DATA: PeriodicElement[] = [
  {Datum: '21.03.2021', Kunde: 'Salvators Shop', Produkt: 'Erdnuesse', Menge: 4, Preis: 5, Lieferschein: '21-03-21'}
];

@Component({
  selector: 'app-aus-lieferungen',
  templateUrl: './aus-lieferungen.component.html',
  styleUrls: ['./aus-lieferungen.component.css']
})
export class AusLieferungenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['Datum', 'Kunde', 'Produkt', 'Menge', 'Preis', 'Lieferschein'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
