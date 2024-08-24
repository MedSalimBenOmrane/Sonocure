import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { SeanceTreatment } from 'src/app/model/seanceTreatment';
import { ImageIrmService } from 'src/app/services/image-irm.service';
import { PatientService } from 'src/app/services/patients.service';
import { SeancesTraitementService } from 'src/app/services/seances-traitement.service';

@Component({
  selector: 'app-treatement',
  templateUrl: './treatement.component.html',
  styleUrls: ['./treatement.component.css']
})
export class TreatementComponent implements OnInit{
  show:boolean=false;
  constructor(private seanceTreatment :SeancesTraitementService,private router: Router,
    private patientService:PatientService,private imageIrmService:ImageIrmService,){}
    
    tumorTypes: string[] = [
      'Meningioma',
      'Lung carcinoma',
      'Breast carcinoma',
      'Colorectal carcinoma',
      'Melanoma',
      'Prostate carcinoma',
      'Lymphoma',
      'Leukemia'
    ];
    suggestions: string[] = [
      "Channel",
      "CodingLab",
      "CodingNepal",
      "YouTube",
      "YouTuber",
      "YouTube Channel",
      "Blogger",
      "Bollywood",
      "Vlogger",
      "Vehicles",
      "Facebook",
    ];

  patientName: string = '';
  tumorType: string = '';
  imagePath: string = "";
  seance!:SeanceTreatment;
  userInput: string = '';
  filteredSuggestions: string[] = [];
  showSuggestions: boolean = false;
  patient!:Patient;
  loader:boolean=false;
  loader2:boolean=false;
  ngOnInit() {
this.seance=new SeanceTreatment()


  }

  getdataSeance(): void {
    this.seance.id = this.seanceTreatment.length() + 1;
    this.seance.dateSeance = new Date();
    this.imageIrmService.getImageByPath(this.imagePath).subscribe((res: { id: number }) => {
      this.seance.idImage = res.id;
    });
    this.patientService.getPatientByName(this.patientName).subscribe((res: Patient) => {
      this.seance.patientAge = res.age;
      this.seance.patientGender = res.gender;
      this.seance.patientID=res.id;
    });
    this.seance.tumorType=this.tumorType;
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
  

 

  generateTreatmentData() {
    this.getdataSeance()
    this.loader2=true;
    this.seanceTreatment.genrateWithIA(this.seance.patientAge,this.seance.patientGender,
      this.seance.tumorSize,this.seance.tumorLocation,this.seance.tumorType).subscribe(result => {
        this.seance.frequency = result.frequency;
        this.seance.intensity = result.intensity;
        this.seance.duration = result.duration;  
        this.patientService.getPatientById(this.seance.patientID).subscribe(res=>{
          this.patient=res;
        })
        this.patient.tumorType=this.tumorType;
        this.seance.tumorType=this.patient.tumorType;
        this.patientService.updatePatient(this.patient)
        this.seanceTreatment.addSeance(this.seance)
      const link=['Sonocure/treatment', this.seance.id];
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
      setTimeout(() => {
        this.imagePath = `assets/images/${file.name}`;
      });
    }
  }
  
  showtumorType(){
    this.show=true

  }
}

