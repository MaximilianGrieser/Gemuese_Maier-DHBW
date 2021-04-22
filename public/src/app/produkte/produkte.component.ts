import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  Bezeichnung: string,
  Herkunft: string,
  Kategorie: string,
  Verkaufspreis: number,
  Lieferant: string,
  Produzent: string,
  Anzahl: number
}

@Component({
  selector: 'app-bestand',
  templateUrl: './produkte.component.html',
  styleUrls: ['./produkte.component.css']
})

export class ProdukteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ELEMENT_DATA: PeriodicElement[] = [
    {Bezeichnung: "Gurke", Herkunft: "Deutschland", Kategorie: "Gemuese", Verkaufspreis: 5, Lieferant: "Thomas Müller", Produzent: "Theos Erdhof", Anzahl: 2}
  ];
  

  displayedColumns: string[] = ['Bezeichnung', 'Herkunft', 'Kategorie', 'Verkaufspreis', 'Lieferant', 'Produzent', 'Anzahl'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
