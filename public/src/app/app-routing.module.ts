import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AusLieferungenComponent } from './aus-lieferungen/aus-lieferungen.component';
import { BestandComponent } from './bestand/bestand.component';
import { ProdukteComponent } from './produkte/produkte.component';
import { LagerComponent } from './lager/lager.component';
import { LieferantenComponent } from './lieferanten/lieferanten.component';
import { LieferungenComponent } from './lieferungen/lieferungen.component';
import { KundenComponent } from './kunden/kunden.component';
import { ProduzentenComponent } from './produzenten/produzenten.component';
import { InformationenComponent } from './informationen/informationen.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: '', redirectTo: '/bestand', pathMatch: 'full' },
  { path: 'ausLieferungen', component: AusLieferungenComponent },
  { path: 'bestand', component: BestandComponent },
  { path: 'produkte', component: ProdukteComponent },
  { path: 'lager', component: LagerComponent },
  { path: 'lieferanten', component: LieferantenComponent },
  { path: 'lieferungen', component: LieferungenComponent },
  { path: 'kunden', component: KundenComponent },
  { path: 'produzenten', component: ProduzentenComponent },
  { path: 'informationen', component: InformationenComponent },
  { path: '**', component: ErrorComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
