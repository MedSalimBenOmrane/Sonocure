import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { SeanceDetection } from 'src/app/model/seanceDetection';
import { ImageIrmService } from 'src/app/services/image-irm.service';
import { PatientService } from 'src/app/services/patients.service';
import { SeancesDetectionService } from 'src/app/services/seances-detection.service';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent implements OnInit {
  patientName: string = '';
  imagePath: string = "";
  userInput: string = '';
  filteredSuggestions: string[] = [];
  seance!:SeanceDetection;
  showSuggestions: boolean = false;
  Name:string="";
  Age:number=0;
  gender:string=""
  Tel:string="";
  loader:boolean=false;
  loader2:boolean=false;
  suggestions: string[] = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
  ];
patient !:Patient;

  constructor(private router: Router,private patientservice:PatientService,private imageIrmService:ImageIrmService,
    private patientService :PatientService,private seanceDetectionserv:SeancesDetectionService) { }

  ngOnInit() {
    this.patient=new Patient();
    this.seance=new SeanceDetection()
  }
  getPatientData()
  {this.patient.id=this.patientservice.length() + 1;
    this.patient.name=this.Name;
    this.patient.age=this.Age;
    this.patient.gender=this.gender;
    this.patient.tel=this.Tel;
    this.patient.tumorType="undifined"
}
getdata(): void {
  this.seance.id = this.seanceDetectionserv.getSeancesDetectionLength() +1;
  this.seance.dateSeance = new Date();


  this.imageIrmService.getImageByPath(this.imagePath).subscribe((res: { id: number }) => {
    this.seance.idImage = res.id;
  });
  console.log("patient Name",this.patientName)
  console.log("image path",this.imagePath)
  console.log("before add seance",this.seance.idImage)
  this.patientService.getPatientByName(this.patientName).subscribe((res: Patient) => {
    this.seance.patientAge = res.age;
    this.seance.patientGender = res.gender;
    this.seance.patientID=res.id;
  });
  console.log("patient id",this.seance.patientID)
}


  addPatient(){
    this.getPatientData()
    this.patientservice.createPatient(this.patient);

  }
  generate() {

   this.loader=true;
   console.log("loader before",this.loader)
    this.imageIrmService.generateFromImage(this.imagePath).subscribe(result => {
      this.seance.tumorLocation = result.tumorLocation;
      this.seance.tumorSize = result.tumorSize;
      this.imagePath=result.outputimage;
      this.loader=false;
    });
    this.imageIrmService.createImageIrm(this.imagePath, this.seance.tumorLocation,this.seance.tumorSize)
  }
  generateDetectionData() {
    this.getdata();
    this.loader2 = true;
    
    this.seanceDetectionserv.generateWithIA(
      this.seance.patientAge,
      this.seance.patientGender,
      this.seance.tumorSize,
      this.seance.tumorLocation
    ).subscribe((result: { frequency: number, intensity: number, duration: number }) => {
        this.seance.frequency = result.frequency;
        this.seance.intensity = result.intensity;
        this.seance.duration = result.duration;
        this.loader2 = false;
        console.log(this.seance);
        
        this.seanceDetectionserv.create(this.seance);
        
        const link = ['Sonocure/detection', this.seance.id];
        this.router.navigate(link);
      });
  }

  onKeyUp() {
    const userData = this.userInput;
    this.filteredSuggestions = [];

    if (userData) {
      this.filteredSuggestions = this.suggestions.filter((data) =>
        data.toLowerCase().startsWith(userData.toLowerCase())
      );

      this.showSuggestions = this.filteredSuggestions.length > 0;
    } else {
      this.showSuggestions = false;
    }
  }

  selectSuggestion(suggestion: string) {
    this.userInput = suggestion;
    this.showSuggestions = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagePath = `assets/images/${file.name}`;
      console.log('Selected file path:', this.imagePath);
    }
  }
}
