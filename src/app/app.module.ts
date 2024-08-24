import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetectionComponent } from './pages/detection/detection.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ImageMagnifierComponent } from './components/image-magnifier/image-magnifier.component';
import { DetectionDetailsComponent } from './pages/detection-details/detection-details.component';
import { DetailDetectionComponent } from './pages/detail-detection/detail-detection.component';
import { HomeComponent } from './pages/home/home.component';
import { TreatementComponent } from './pages/treatement/treatement.component';
import { PateintsComponent } from './pages/pateints/pateints.component';
import { DetailTreatementComponent } from './pages/detail-treatement/detail-treatement.component';
import { BotComponent } from './components/bot/bot.component';
import { PatientItemComponent } from './components/patient-item/patient-item.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientService } from './services/patients.service';
import { ItemSeanceDetecionComponent } from './components/item-seance-detecion/item-seance-detecion.component';
import { ItemSeanceTreatmentComponent } from './components/item-seance-treatment/item-seance-treatment.component';
import { BarChartComponent } from './components/dashboard/bar-chart/bar-chart.component';
import { CustomLineChartComponent } from './components/dashboard/custom-line-chart/custom-line-chart.component';
import { LineChartComponent } from './components/dashboard/line-chart/line-chart.component';
import { PieChartComponent } from './components/dashboard/pie-chart/pie-chart.component';
import { DialogDetailSeanceComponent } from './components/dialog-detail-seance/dialog-detail-seance.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DetectionComponent,
    LandingPageComponent,
    NavbarComponent,
    ImageMagnifierComponent,
    DetectionDetailsComponent,
    DetailDetectionComponent,
    HomeComponent,
    TreatementComponent,
    PateintsComponent,
    DetailTreatementComponent,
    BotComponent,
    PatientItemComponent,
    PatientListComponent,
    ItemSeanceDetecionComponent,
    ItemSeanceTreatmentComponent,
    BarChartComponent,
    CustomLineChartComponent,
    LineChartComponent,
    PieChartComponent,
    DialogDetailSeanceComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
