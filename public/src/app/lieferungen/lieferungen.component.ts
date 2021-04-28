import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

/**
 * defines the columns of the table 'eingehende Lieferungen'
 */
export interface PeriodicElement {
  Datum: string;
  Produzent: string;
  Produkt: string;
  Menge: number;
  Preis: number;
  Lieferschein: string;
}

/**
 * example entry/entries that will be shown in the table 'eingehende Lieferungen'
 */
const ELEMENT_DATA: PeriodicElement[] = [
  {Datum: '29.03.2021', Produzent: 'MysticFalls Gruenderfarm', Produkt: 'Eisenkraut', Menge: 5, Preis: 90, Lieferschein: '29-03-21'}
];

@Component({
  selector: 'app-lieferungen',
  templateUrl: './lieferungen.component.html',
  styleUrls: ['./lieferungen.component.css']
})
export class LieferungenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['Datum', 'Produzent', 'Produkt', 'Menge', 'Preis', 'Lieferschein'];
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
