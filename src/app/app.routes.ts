import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Routes = [
  {
    path: 'account/signup',
    component: SignupComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
