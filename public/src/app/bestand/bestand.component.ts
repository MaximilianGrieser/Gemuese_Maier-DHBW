import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';


/**
 * defines the columns of the table 'Bestand'
 */
// tslint:disable-next-line:class-name
export interface periodicElement {
  Bezeichnung: string;
  Kategorie: string;
  Regal: number;
  Haltbar: number;
  Anzahl: number;
}

@Component({
  selector: 'app-bestand',
  templateUrl: './bestand.component.html',
  styleUrls: ['./bestand.component.css']
})

/**
 * component for the "Bestand" page. Stores all information about products in stock.
 */
export class BestandComponent implements OnInit {

  constructor() {
  }

  elementData: periodicElement[] = [
    {Bezeichnung: 'Gurke', Kategorie: 'Gemuese', Regal: 1, Haltbar: 2, Anzahl: 2}
  ];


  displayedColumns: string[] = ['Bezeichnung', 'Kategorie', 'Regal', 'Haltbar', 'Anzahl'];
  dataSource = new MatTableDataSource(this.elementData);

  ngOnInit(): void {
  }

  /**
   * function is called when user searches for an entry in the table
   * @param event is a key event
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
