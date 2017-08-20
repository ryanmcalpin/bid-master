import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component'
import { BidSheetFormComponent } from './bid-sheet-form/bid-sheet-form.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: BidSheetFormComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
