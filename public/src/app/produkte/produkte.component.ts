import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Lieferant } from '../lieferanten/lieferanten.component';
import { Produzent } from '../produzenten/produzenten.component';

/**
 * defines a 'Produkt' object (entry in the table)
 */
export interface Produkt {
  Bezeichnung: string;
  Herkunft: string;
  Kategorie: string;
  Verkaufspreis: number;
  Lieferant: string;
  Produzent: string;
  Anzahl: number;
}

/**
 * defines a drop-down object in the table
 */
interface DropDown {
  value: string;
}

@Component({
  selector: 'app-bestand',
  templateUrl: './produkte.component.html',
  styleUrls: ['./produkte.component.css']
})

export class ProdukteComponent implements OnInit {
  iBezeichnung: string;
  iHerkunft: string;
  iKategorie: string;
  iVerkaufspreis: number;
  iLieferant: string;
  iProduzent: string;
  iAnzahl: number;
  editIndex: number;
  selected: Produkt;
  dataSource = new MatTableDataSource();

  ELEMENT_DATA: Produkt[] = [];
  Lieferanten: Lieferant[] = [];
  DDLief: DropDown[] = [];
  Produzenten: Produzent[] = [];
  DDProd: DropDown[] = [];

  ddProd: string;
  ddLief: string;

  displayedColumns: string[] = ['Bezeichnung', 'Herkunft', 'Kategorie', 'Verkaufspreis', 'Lieferant',
    'Produzent', 'Anzahl'];

  constructor() { }

  /**
   * function to load data from local storage and stores it in an array when component is loaded
   */
  ngOnInit(): void {
    this.ELEMENT_DATA = JSON.parse(localStorage.getItem('ProduktData'));
    this.Lieferanten = JSON.parse(localStorage.getItem('LieferantData'));
    this.Lieferanten.forEach(lief => {
      this.DDLief.push({value: lief.Name});
    });
    this.Produzenten = JSON.parse(localStorage.getItem('ProduzentData'));
    this.Produzenten.forEach(prod => {
      this.DDProd.push({value: prod.Name});
    });
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  /**
   * functions to get data from the table input fields (text and drop-down)
   * function names indicate which field is read
   */
  changeBezeichnung(event: Event): void {
    this.iBezeichnung = (event.target as HTMLInputElement).value;
    console.log(this.iBezeichnung);
  }
  changeHerkunft(event: Event): void {
    this.iHerkunft = (event.target as HTMLInputElement).value;
  }
  changeKategorie(event: Event): void {
    this.iKategorie = (event.target as HTMLInputElement).value;
  }
  changeVerkaufspreis(event: Event): void {
    this.iVerkaufspreis = parseInt((event.target as HTMLInputElement).value, 10);
  }
  changeLieferant(Lief: string): void {
    this.iLieferant = Lief;
  }
  changeProduzent(Prod: string): void {
    this.iProduzent = Prod;
  }
  changeAnzahl(event: Event): void {
    this.iAnzahl = parseInt((event.target as HTMLInputElement).value, 10);
  }

  /**
   * function to add the data entered by the user in the table form to the table
   */
  add(): void {
    this.ELEMENT_DATA.push(
    {Bezeichnung: this.iBezeichnung, Herkunft: this.iHerkunft, Kategorie: this.iKategorie,
      Verkaufspreis: this.iVerkaufspreis, Lieferant: this.iLieferant, Produzent: this.iProduzent, Anzahl: this.iAnzahl});
    console.log(this.ELEMENT_DATA);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  /**
   * function to modify an entry
   * first the entry that is selected by the user is searched in the array cwith table entries
   * second, the data of the entry is overwritten with the data from the input field
   */
  edit(): void {
    this.editIndex = this.ELEMENT_DATA.findIndex(x => (
      x.Bezeichnung === this.selected.Bezeichnung &&
      x.Herkunft === this.selected.Herkunft &&
      x.Kategorie === this.selected.Kategorie &&
      x.Verkaufspreis === this.selected.Verkaufspreis &&
      x.Lieferant === this.selected.Lieferant &&
      x.Produzent === this.selected.Produzent &&
      x.Anzahl === this.selected.Anzahl)
    );

    this.ELEMENT_DATA[this.editIndex].Bezeichnung = this.iBezeichnung;
    this.ELEMENT_DATA[this.editIndex].Herkunft = this.iHerkunft;
    this.ELEMENT_DATA[this.editIndex].Kategorie = this.iKategorie;
    this.ELEMENT_DATA[this.editIndex].Verkaufspreis = this.iVerkaufspreis;
    this.ELEMENT_DATA[this.editIndex].Lieferant = this.iLieferant;
    this.ELEMENT_DATA[this.editIndex].Produzent = this.iProduzent;
    this.ELEMENT_DATA[this.editIndex].Anzahl = this.iAnzahl;
  }

  /**
   * function to delete an entry that is selected by the user
   */
  delete(): void {
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(prod => prod !== this.selected);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log('Deleted ' + this.selected);
  }

  /**
   * function to get an entry of the table that was selected by the user
   * @param row is the row selected by the user
   */
  getRecord(row: Produkt): void {
    this.selected = row;
    (document.getElementById('i-bez') as HTMLInputElement).value = row.Bezeichnung;
    this.iBezeichnung = row.Bezeichnung;
    (document.getElementById('i-her') as HTMLInputElement).value = row.Herkunft;
    this.iHerkunft = row.Herkunft;
    (document.getElementById('i-kat') as HTMLInputElement).value = row.Kategorie;
    this.iKategorie = row.Kategorie;
    (document.getElementById('i-vp') as HTMLInputElement).value = row.Verkaufspreis.toString();
    this.iVerkaufspreis = row.Verkaufspreis;
    this.ddLief = row.Lieferant;
    this.iLieferant = row.Lieferant;
    this.ddProd = row.Produzent;
    this.iProduzent = row.Produzent;
    (document.getElementById('i-anz') as HTMLInputElement).value = row.Anzahl.toString();
    this.iAnzahl = row.Anzahl;
  }

  /**
   * function that loads data from array in local storage (saves changes in the data)
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    localStorage.setItem('ProduktData', JSON.stringify(this.ELEMENT_DATA));
  }

  /**
   * function is called when user searches for an entry in the table
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
