import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component'
import { BidSheetFormComponent } from './bid-sheet-form/bid-sheet-form.component';
import { BidSheetComponent } from './bid-sheet/bid-sheet.component';
import { RatesComponent } from './rates/rates.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: BidSheetFormComponent
  },
  {
    path: 'bids/:bidId',
    component: BidSheetComponent
  },
  {
    path: 'rates',
    component: RatesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
