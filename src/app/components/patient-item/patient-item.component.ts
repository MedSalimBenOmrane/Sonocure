import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { SeanceDetection } from 'src/app/model/seanceDetection';
import { SeanceTreatment } from 'src/app/model/seanceTreatment';
import { PatientService } from 'src/app/services/patients.service';
import { SeancesDetectionService } from 'src/app/services/seances-detection.service';
import { SeancesTraitementService } from 'src/app/services/seances-traitement.service';

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.css']
})
export class PatientItemComponent {
  patient!: Patient;
  seance!:SeanceDetection;
  seancesTraitement :SeanceTreatment[]=[]
  seancesDetection :SeanceDetection[]=[]

  constructor(
    private patientService: PatientService,
    private detectionService: SeancesDetectionService,
    private traitementService: SeancesTraitementService,
    private activatedRoute: ActivatedRoute,

    private router: Router,

  ) { }

     ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Route params:', params);
        if (params['id']) {
          this.patientService.getPatientById(Number(params['id'])).subscribe(
            patient => {
              console.log('Patient data received:', patient);
              this.patient = patient;
            },
            
          );
        } else {
          console.error("ID is undefined");
        }
      }
    );
    this.detectionService.getSeanceByPatientId(this.patient.id).subscribe((seances: SeanceDetection[]) => {
      this.seancesDetection = seances;
    });
    this.traitementService.getSeanceByPatientId(this.patient.id).subscribe((seances: SeanceTreatment[]) => {
      this.seancesTraitement = seances;
    });
    
  }

}
