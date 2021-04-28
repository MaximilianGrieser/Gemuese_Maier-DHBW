import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  Regal: string;
  Standort: string;
  Kapazitaet: string;
}

@Component({
  selector: 'app-bestand',
  templateUrl: './lager.component.html',
  styleUrls: ['./lager.component.css']
})

export class LagerComponent implements OnInit {

  constructor() { }

  elementData: PeriodicElement[] = [
    {Regal: 'Gurke', Standort: 'Deutschland', Kapazitaet: 'Gemuese'}
  ];


  displayedColumns: string[] = ['Regal', 'Standort', 'Kapazitaet'];
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

