import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  Name: string;
  ProduzentenNr: number;
  Anschrift: string;
  Ansprechpartner: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 'MysticFalls Gruenderfarm', ProduzentenNr: 1864, Anschrift: 'Wickery Bridge 2, Mystic Falls', Ansprechpartner: 'Carol Lockwood'}
];

@Component({
  selector: 'app-produzenten',
  templateUrl: './produzenten.component.html',
  styleUrls: ['./produzenten.component.css']
})
export class ProduzentenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['Name', 'Produzenten-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
