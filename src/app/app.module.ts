import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetectionComponent } from './pages/detection/detection.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ImageMagnifierComponent } from './components/image-magnifier/image-magnifier.component';
import { DetectionDetailsComponent } from './pages/detection-details/detection-details.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetectionComponent,
    LandingPageComponent,
    NavbarComponent,
    ImageMagnifierComponent,
    DetectionDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
