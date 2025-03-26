import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Example component
// import { WhatsappComponent } from './whatsapp/whatsapp.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Catch-all route
  // { path: 'whatsapp', component: WhatsappComponent }, // Home route
];
