import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecordComponent } from './record/record.component';
import { ReportComponent } from './report/report.component';
import { OtherComponent } from './other/other.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

const routes: Routes = [
  { path: 'cleansystem', component: NavMenuComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'about', component: AboutComponent },
      { path: 'report', component: ReportComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'record', component: RecordComponent},
      { path: 'record/:recordParameter', component: RecordComponent},
    ]
  },
  { path: 'other/:id', component: OtherComponent },
  { path: '', redirectTo: 'cleansystem', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
