import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeanceTreatment } from 'src/app/model/seanceTreatment';
import { SeancesTraitementService } from 'src/app/services/seances-traitement.service';

@Component({
  selector: 'app-detail-treatement',
  templateUrl: './detail-treatement.component.html',
  styleUrls: ['./detail-treatement.component.css']
})
export class DetailTreatementComponent implements OnInit{
  seance!:SeanceTreatment;
  constructor(
    private SeancesTraitement: SeancesTraitementService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Route params:', params);
        if (params['id']) {
          this.SeancesTraitement.getSeanceById(Number(params['id'])).subscribe(
            seance => {
              console.log('Patient data received:', seance);
              this.seance = seance;
            },
            
          );
        } else {
          console.error("ID is undefined");
        }
      }
    );
  }

}
