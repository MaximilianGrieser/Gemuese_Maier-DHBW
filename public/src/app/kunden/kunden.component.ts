import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

/**
 * defines the columns of the table 'Kunden'
 */
// tslint:disable-next-line:class-name
export interface periodicElement {
  Name: string;
  KundenNr: number;
  Anschrift: string;
  Ansprechpartner: string;
}

/**
 * example entry/entries that will be shown in the table 'Kunden'
 */
const elementData: periodicElement[] = [
  {
    Name: 'Saltzmann Markt',
    KundenNr: 1864,
    Anschrift: 'Nackarstrasse 134, Stuttgart',
    Ansprechpartner: 'Alaric Saltzmann'
  }
];


@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.css']
})
/**
 * component for the "Kunden" page. Stores all information about customers.
 */
export class KundenComponent implements OnInit {


  ngOnInit(): void {
  }

  displayedColumns: string[] = ['Name', 'Kunden-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(elementData);

  /**
   * function is called when user searches for an entry in the table
   * @param event is a key event
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
