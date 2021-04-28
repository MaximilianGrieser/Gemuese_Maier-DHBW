import {Component, OnInit} from '@angular/core';
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

/**
 * Component for the "Produzent" page. Stores all information about product producers. 
 */
export class ProduzentenComponent implements OnInit {
  NameIndex: string;
  ProduzentenNrIndex: number;
  AnschriftIndex: string;
  AnsprechpartnerIndex: string;
  editIndex: number;

  selected: Produzent;

  elementData: Produzent[] = [];

  displayedColumns: string[] = ['Name', 'Produzenten-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(this.elementData);

  /**
   * loads data from local storage and stores it in an array when component is loaded
   */
  ngOnInit(): void {
    this.elementData = JSON.parse(localStorage.getItem('ProduzentData'));
    this.dataSource = new MatTableDataSource(this.elementData);
  }

  /**
   * functions to get data from the table input fields (text and drop-down)
   * function names indicate which field is read
   * @param event is a key event
   */
  changeName(event: Event): void {
    this.NameIndex = (event.target as HTMLInputElement).value;
  }

  changeProduzent(event: Event): void {
    this.ProduzentenNrIndex = parseInt((event.target as HTMLInputElement).value, 10);
  }

  changeAnschrift(event: Event): void {
    this.AnschriftIndex = (event.target as HTMLInputElement).value;
  }

  changeAnsprechpartner(event: Event): void {
    this.AnsprechpartnerIndex = (event.target as HTMLInputElement).value;
  }

  /**
   * function to add the data entered by the user in the table form to the table
   */
  addTableEntry(): void {
    if (this.NameIndex == null 
        || this.ProduzentenNrIndex == null 
        || this.AnschriftIndex == null 
        || this.AnsprechpartnerIndex == null) {
      alert('Bitte Trage etwas in die Felder ein!');
    } else {
      this.elementData.push({
        Name: this.NameIndex,
        ProduzentenNr: this.ProduzentenNrIndex,
        Anschrift: this.AnschriftIndex,
        Ansprechpartner: this.AnsprechpartnerIndex
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
      x.Name === this.selected.Name &&
      x.ProduzentenNr === this.selected.ProduzentenNr &&
      x.Anschrift === this.selected.Anschrift &&
      x.Ansprechpartner === this.selected.Ansprechpartner)
    );

    this.elementData[this.editIndex].Name = this.NameIndex;
    this.elementData[this.editIndex].ProduzentenNr = this.ProduzentenNrIndex;
    this.elementData[this.editIndex].Anschrift = this.AnschriftIndex;
    this.elementData[this.editIndex].Ansprechpartner = this.AnsprechpartnerIndex;
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
  getRecord(row: Produzent): void {
    this.selected = row;
    (document.getElementById('i-name') as HTMLInputElement).value = row.Name;
    this.NameIndex = row.Name;
    (document.getElementById('i-prodNr') as HTMLInputElement).value = row.ProduzentenNr.toString();
    this.ProduzentenNrIndex = row.ProduzentenNr;
    (document.getElementById('i-ans') as HTMLInputElement).value = row.Anschrift;
    this.AnschriftIndex = row.Anschrift;
    (document.getElementById('i-anp') as HTMLInputElement).value = row.Ansprechpartner;
    this.AnsprechpartnerIndex = row.Ansprechpartner;
  }

  /**
   * function that loads data from array in local storage (saves changes in the data)
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    localStorage.setItem('ProduzentData', JSON.stringify(this.elementData));
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
