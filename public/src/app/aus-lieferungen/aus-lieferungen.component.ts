import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

/**
 * defines a 'ausgehende Lieferungen' object (entry in the table)
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

  /**
   * function is called when user searches for an entry in the table
   * @param event is a key event
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
