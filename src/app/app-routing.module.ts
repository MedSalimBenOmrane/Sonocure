import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DetectionComponent } from './pages/detection/detection.component';
import { TreatementComponent } from './pages/treatement/treatement.component';
import { PateintsComponent } from './pages/pateints/pateints.component';
import { DetailDetectionComponent } from './pages/detail-detection/detail-detection.component';
import { DetailTreatementComponent } from './pages/detail-treatement/detail-treatement.component';
import { PatientItemComponent } from './components/patient-item/patient-item.component';

const routes: Routes = [
  { path: '', component:LandingPageComponent  },
  {
    path: 'Sonocure', children: [
      { path: '', component: LandingPageComponent },
      { path: 'home', component: HomeComponent },
      { path: 'Detection', component: DetectionComponent },
      { path: 'treatment', component:TreatementComponent  },
      { path: 'patients', component: PateintsComponent },
      { path: 'patients/:id', component: PatientItemComponent },
      { path: 'detection/:id', component: DetailDetectionComponent},
      { path: 'treatment/:id', component: DetailTreatementComponent },
    ]
  },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }