import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeanceDetection } from 'src/app/model/seanceDetection';
import { SeancesDetectionService } from 'src/app/services/seances-detection.service';

@Component({
  selector: 'app-detail-detection',
  templateUrl: './detail-detection.component.html',
  styleUrls: ['./detail-detection.component.css']
})
export class DetailDetectionComponent implements OnInit, AfterViewInit{
  seance!:SeanceDetection;
  constructor(
    private SeancesDetection: SeancesDetectionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Route params:', params);
        if (params['id']) {
          this.SeancesDetection.getSeanceById(Number(params['id'])).subscribe(
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

  @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const videoElement = this.videoRef.nativeElement;

    // Arrêter la vidéo après 10 secondes
    setTimeout(() => {
      videoElement.pause();
    }, 10000); // 10000 ms = 10 secondes
  }
}
