import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

/**
 * defines a 'Lieferanten' object (entry in the table)
 */
export interface Lieferant {
  Name: string;
  LieferantenNr: number;
  Anschrift: string;
  Ansprechpartner: string;
}

@Component({
  selector: 'app-lieferanten',
  templateUrl: './lieferanten.component.html',
  styleUrls: ['./lieferanten.component.css']
})

export class LieferantenComponent implements OnInit {
  NameIndex: string;
  LieferantenNrIndex: number;
  AnschriftIndex: string;
  AnsprechpartnerIndex: string;
  editIndex: number;

  selected: Lieferant;

  elementData: Lieferant[] = [];

  displayedColumns: string[] = ['Name', 'Lieferanten-Nr.', 'Anschrift', 'Ansprechpartner'];
  dataSource = new MatTableDataSource(this.elementData);

  /**
   * loads data from local storage and stores it in an array when component is loaded
   */
  ngOnInit(): void {
    this.elementData = JSON.parse(localStorage.getItem('LieferantData'));
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

  changeLieferantenNr(event: Event): void {
    this.LieferantenNrIndex = parseInt((event.target as HTMLInputElement).value, 10);
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
      || this.LieferantenNrIndex == null
      || this.AnschriftIndex == null
      || this.AnsprechpartnerIndex == null) {
      alert('Bitte Tragen Sie etwas in die Felder ein!');
    } else {
      this.elementData.push({
        Name: this.NameIndex,
        LieferantenNr: this.LieferantenNrIndex,
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
      x.LieferantenNr === this.selected.LieferantenNr &&
      x.Anschrift === this.selected.Anschrift &&
      x.Ansprechpartner === this.selected.Ansprechpartner)
    );

    this.elementData[this.editIndex].Name = this.NameIndex;
    this.elementData[this.editIndex].LieferantenNr = this.LieferantenNrIndex;
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
  getRecord(row: Lieferant): void {
    this.selected = row;
    (document.getElementById('i-Name') as HTMLInputElement).value = row.Name;
    this.NameIndex = row.Name;
    (document.getElementById('i-Lief') as HTMLInputElement).value = row.LieferantenNr.toString();
    this.LieferantenNrIndex = row.LieferantenNr;
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
    localStorage.setItem('LieferantData', JSON.stringify(this.elementData));
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
