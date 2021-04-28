import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

/**
 * defines a 'Produzenten' object (entry in the table)
 */
export interface Produzent {
  Name: string;
  ProduzentenNr: number;
  Anschrift: string;
  Ansprechpartner: string;
}

@Component({
  selector: 'app-produzenten',
  templateUrl: './produzenten.component.html',
  styleUrls: ['./produzenten.component.css']
})
export class ProduzentenComponent implements OnInit {

  constructor() { }
  iName: string;
  iProduzentenNr: number;
  iAnschrift: string;
  iAnsprechpartner: string;
  editIndex: number;

  selected: Produzent;

  ELEMENT_DATA: Produzent[] = [];

  displayedColumns: string[] = ['Name', 'Produzenten-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  /**
   * loads data from local storage and stores it in an array when component is loaded
   */
  ngOnInit(): void {
    this.ELEMENT_DATA = JSON.parse(localStorage.getItem('ProduzentData'));
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  /**
   * functions to get data from the table input fields (text and drop-down)
   * function names indicate which field is read
   * @param ebent is a key event
   */
  changeName(event: Event): void {
    this.iName = (event.target as HTMLInputElement).value;
  }
  changeProduzent(event: Event): void {
    this.iProduzentenNr = parseInt((event.target as HTMLInputElement).value, 10);
  }
  changeAnschrift(event: Event): void {
    this.iAnschrift = (event.target as HTMLInputElement).value;
  }
  changeAnsprechpartner(event: Event): void {
    this.iAnsprechpartner = (event.target as HTMLInputElement).value;
  }

  /**
   * function to add the data entered by the user in the table form to the table
   */
  addTableEntry(): void {
    this.ELEMENT_DATA.push(
    {Name: this.iName, ProduzentenNr: this.iProduzentenNr, Anschrift: this.iAnschrift, Ansprechpartner: this.iAnsprechpartner});
    console.log(this.ELEMENT_DATA);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  /**
   * function to modify an entry
   * first the entry that is selected by the user is searched in the array cwith table entries
   * second, the data of the entry is overwritten with the data from the input field
   */
  editTableEntry(): void {
    this.editIndex = this.ELEMENT_DATA.findIndex(x => (
      x.Name === this.selected.Name &&
      x.ProduzentenNr === this.selected.ProduzentenNr &&
      x.Anschrift === this.selected.Anschrift &&
      x.Ansprechpartner === this.selected.Ansprechpartner)
    );

    this.ELEMENT_DATA[this.editIndex].Name = this.iName;
    this.ELEMENT_DATA[this.editIndex].ProduzentenNr = this.iProduzentenNr;
    this.ELEMENT_DATA[this.editIndex].Anschrift = this.iAnschrift;
    this.ELEMENT_DATA[this.editIndex].Ansprechpartner = this.iAnsprechpartner;
  }

  /**
   * function to delete an entry that is selected by the user
   */
  deleteTableEntry(): void {
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(prod => prod !== this.selected);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log('Deleted ' + this.selected);
  }

  /**
   * function to get an entry of the table that was selected by the user
   * @param row is the row selected by the user
   */
  getRecord(row: Produzent): void {
    this.selected = row;
    (document.getElementById('i-name') as HTMLInputElement).value = row.Name;
    this.iName = row.Name;
    (document.getElementById('i-prodNr') as HTMLInputElement).value = row.ProduzentenNr.toString();
    this.iProduzentenNr = row.ProduzentenNr;
    (document.getElementById('i-ans') as HTMLInputElement).value = row.Anschrift;
    this.iAnschrift = row.Anschrift;
    (document.getElementById('i-anp') as HTMLInputElement).value = row.Ansprechpartner;
    this.iAnsprechpartner = row.Ansprechpartner;
  }

  /**
   * function that loads data from array in local storage (saves changes in the data)
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void{
    localStorage.setItem('ProduzentData', JSON.stringify(this.ELEMENT_DATA));
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
