import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Lieferant} from '../lieferanten/lieferanten.component';
import {Produzent} from '../produzenten/produzenten.component';

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
interface dropDown {
  value: string;
}

@Component({
  selector: 'app-bestand',
  templateUrl: './produkte.component.html',
  styleUrls: ['./produkte.component.css']
})

/**
 * component for the "Produkte" page. Stores all information about available products. 
 */
export class ProdukteComponent implements OnInit {
  BezeichnungIndex: string;
  HerkunftIndex: string;
  KategorieIndex: string;
  VerkaufspreisIndex: number;
  LieferantIndex: string;
  ProduzentIndex: string;
  AnzahlIndex: number;
  editIndex: number;
  selected: Produkt;
  dataSource = new MatTableDataSource();

  elementData: Produkt[] = [];
  Lieferanten: Lieferant[] = [];
  LieferantenDropDown: dropDown[] = [];
  Produzenten: Produzent[] = [];
  ProduzentenDropDown: dropDown[] = [];

  ProduzentenDropDownContent: string;
  LieferantenDropDownContent: string;

  displayedColumns: string[] = ['Bezeichnung', 'Herkunft', 'Kategorie', 'Verkaufspreis', 'Lieferant',
    'Produzent', 'Anzahl'];

  constructor() {
  }

  /**
   * function to load data from local storage and stores it in an array when component is loaded
   */
  ngOnInit(): void {
    this.elementData = JSON.parse(localStorage.getItem('ProduktData'));
    this.Lieferanten = JSON.parse(localStorage.getItem('LieferantData'));
    this.Lieferanten.forEach(lief => {
      this.LieferantenDropDown.push({
        value: lief.Name
      });
    });
    this.Produzenten = JSON.parse(localStorage.getItem('ProduzentData'));
    this.Produzenten.forEach(prod => {
      this.ProduzentenDropDown.push({
        value: prod.Name
      });
    });
    this.dataSource = new MatTableDataSource(this.elementData);
  }

  /**
   * functions to get data from the table input fields (text and drop-down)
   * function names indicate which field is read
   * @param event is a key event /
   * @param string is a string of a drop-down option
   */
  changeBezeichnung(event: Event): void {
    this.BezeichnungIndex = (event.target as HTMLInputElement).value;
    console.log(this.BezeichnungIndex);
  }

  changeHerkunft(event: Event): void {
    this.HerkunftIndex = (event.target as HTMLInputElement).value;
  }

  changeKategorie(event: Event): void {
    this.KategorieIndex = (event.target as HTMLInputElement).value;
  }

  changeVerkaufspreis(event: Event): void {
    this.VerkaufspreisIndex = parseInt((event.target as HTMLInputElement).value, 10);
  }

  changeLieferant(Lief: string): void {
    this.LieferantIndex = Lief;
  }

  changeProduzent(Prod: string): void {
    this.ProduzentIndex = Prod;
  }

  changeAnzahl(event: Event): void {
    this.AnzahlIndex = parseInt((event.target as HTMLInputElement).value, 10);
  }

  /**
   * function to add the data entered by the user in the table form to the table
   */
  addTableEntry(): void {
    if (this.BezeichnungIndex == null 
        || this.HerkunftIndex == null 
        || this.KategorieIndex == null 
        || this.VerkaufspreisIndex == null
        || this.LieferantIndex == null 
        || this.ProduzentIndex == null 
        || this.AnzahlIndex == null) {
      alert('Bitte Tragen Sie etwas in die Felder ein!');
    } else {
      this.elementData.push({
        Bezeichnung: this.BezeichnungIndex, 
        Herkunft: this.HerkunftIndex, 
        Kategorie: this.KategorieIndex,
        Verkaufspreis: this.VerkaufspreisIndex, 
        Lieferant: this.LieferantIndex, 
        Produzent: this.ProduzentIndex, 
        Anzahl: this.AnzahlIndex
      });
      console.log(this.elementData);
      this.dataSource = new MatTableDataSource(this.elementData);
    }
  }

  /**
   * function to modify an entry
   * first the entry that is selected by the user is searched in the array cwith table entries
   * second, the data of the entry is overwritten with the data from the input field
   */
  editTableEntry(): void {
    this.editIndex = this.elementData.findIndex(x => (
      x.Bezeichnung === this.selected.Bezeichnung &&
      x.Herkunft === this.selected.Herkunft &&
      x.Kategorie === this.selected.Kategorie &&
      x.Verkaufspreis === this.selected.Verkaufspreis &&
      x.Lieferant === this.selected.Lieferant &&
      x.Produzent === this.selected.Produzent &&
      x.Anzahl === this.selected.Anzahl)
    );

    this.elementData[this.editIndex].Bezeichnung = this.BezeichnungIndex;
    this.elementData[this.editIndex].Herkunft = this.HerkunftIndex;
    this.elementData[this.editIndex].Kategorie = this.KategorieIndex;
    this.elementData[this.editIndex].Verkaufspreis = this.VerkaufspreisIndex;
    this.elementData[this.editIndex].Lieferant = this.LieferantIndex;
    this.elementData[this.editIndex].Produzent = this.ProduzentIndex;
    this.elementData[this.editIndex].Anzahl = this.AnzahlIndex;
  }

  /**
   * function to delete an entry that is selected by the user
   */
  deleteTableEntry(): void {
    this.elementData = this.elementData.filter(prod => prod !== this.selected);
    this.dataSource = new MatTableDataSource(this.elementData);
    console.log('Deleted ' + this.selected);
  }

  /**
   * function to get an entry of the table that was selected by the user
   * @param row is the row selected by the user
   */
  getRecord(row: Produkt): void {
    this.selected = row;
    (document.getElementById('i-bez') as HTMLInputElement).value = row.Bezeichnung;
    this.BezeichnungIndex = row.Bezeichnung;
    (document.getElementById('i-her') as HTMLInputElement).value = row.Herkunft;
    this.HerkunftIndex = row.Herkunft;
    (document.getElementById('i-kat') as HTMLInputElement).value = row.Kategorie;
    this.KategorieIndex = row.Kategorie;
    (document.getElementById('i-vp') as HTMLInputElement).value = row.Verkaufspreis.toString();
    this.VerkaufspreisIndex = row.Verkaufspreis;
    this.LieferantenDropDownContent = row.Lieferant;
    this.LieferantIndex = row.Lieferant;
    this.ProduzentenDropDownContent = row.Produzent;
    this.ProduzentIndex = row.Produzent;
    (document.getElementById('i-anz') as HTMLInputElement).value = row.Anzahl.toString();
    this.AnzahlIndex = row.Anzahl;
  }

  /**
   * function that loads data from array in local storage (saves changes in the data)
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    localStorage.setItem('ProduktData', JSON.stringify(this.elementData));
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
