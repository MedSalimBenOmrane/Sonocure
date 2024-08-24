import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  patient !:Patient;
  Name:string="";
  Age:number=0;
  gender:string=""
  Tel:string="";
  constructor(private patientService: PatientService,private router:Router) {}

  ngOnInit(): void {
    this.loadPatients();
    this.patient=new Patient();
    
  }
  loadPatients(): void {
    this.patientService.getPatients().subscribe(patients => this.patients = patients);
  }

  deletePatient(id: number): void {
    this.patientService.deletePatient(id).subscribe(() => this.loadPatients());
  }

  createPatient(): void {
    const newPatient = new Patient(0, 'New', 20, 'Male', '555555555', 'Type C');
    this.patientService.createPatient(newPatient).subscribe(() => this.loadPatients());
  }

  updatePatient(patient: Patient): void {
    patient.name = 'Updated Name';  // Juste un exemple de mise à jour
    this.patientService.updatePatient(patient).subscribe(() => this.loadPatients());
  }
  details(id:number) {
      const link=['Sonocure/patients', id];
      this.router.navigate(link);
    }

  sortTable(column: keyof Patient, sortAsc: boolean) {
    this.patients.sort((a, b) => {
      let firstRow = a[column].toString().toLowerCase();
      let secondRow = b[column].toString().toLowerCase();
      
      if (sortAsc) {
        return firstRow < secondRow ? -1 : (firstRow > secondRow ? 1 : 0);
      } else {
        return firstRow < secondRow ? 1 : (firstRow > secondRow ? -1 : 0);
      }
    });
  }
  getPatientData()
  {this.patient.id=this.patientService.getPatients.length+1;
    this.patient.name=this.Name;
    this.patient.age=this.Age;
    this.patient.gender=this.gender;
    this.patient.tel=this.Tel;
    this.patient.tumorType="undifined"
}
  addPatient(){
    this.getPatientData()
    this.patientService.createPatient(this.patient);
    
  }
  /*
  patient_Id(id:number){
    this.router.navigate(['/Sonocure/patients/:'+id']);

  }*/
}

