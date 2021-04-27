import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { BestandComponent } from './bestand/bestand.component';
import { ProdukteComponent } from './produkte/produkte.component';
import { LagerComponent } from './lager/lager.component';
import { LieferantenComponent } from './lieferanten/lieferanten.component';
import { LieferungenComponent } from './lieferungen/lieferungen.component';
import { KundenComponent } from './kunden/kunden.component';
import { ProduzentenComponent } from './produzenten/produzenten.component';
import { InformationenComponent } from './informationen/informationen.component';
import { ErrorComponent } from './error/error.component';

import { AppRoutingModule } from './app-routing.module';
import { AusLieferungenComponent } from './aus-lieferungen/aus-lieferungen.component';


@NgModule({
  declarations: [
    AppComponent,
    BestandComponent,
    ProdukteComponent,
    LagerComponent,
    LieferantenComponent,
    LieferungenComponent,
    KundenComponent,
    ProduzentenComponent,
    InformationenComponent,
    ErrorComponent,
    AusLieferungenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [ 
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
