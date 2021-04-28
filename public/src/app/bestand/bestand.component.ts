import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
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

export class BestandComponent implements OnInit {

  constructor() { }

  ELEMENT_DATA: PeriodicElement[] = [
    {Bezeichnung: 'Gurke', Kategorie: 'Gemuese', Regal: 1, Haltbar: 2, Anzahl: 2}
  ];


  displayedColumns: string[] = ['Bezeichnung', 'Kategorie', 'Regal', 'Haltbar', 'Anzahl'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

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
