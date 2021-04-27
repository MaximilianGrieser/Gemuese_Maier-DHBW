import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

/**
 * defines the columns of the table 'Kunden'
 */
export interface PeriodicElement {
  Name: string;
  KundenNr: number;
  Anschrift: string;
  Ansprechpartner: string;
}

/**
 * example entry/entries that will be shown in the table 'Kunden'
 */
const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 'Saltzmann Markt', KundenNr: 1864, Anschrift: 'Nackarstrasse 134, Stuttgart', Ansprechpartner: 'Alaric Saltzmann'}
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

  /**
   * function is called when user searches for an entry in the table
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
