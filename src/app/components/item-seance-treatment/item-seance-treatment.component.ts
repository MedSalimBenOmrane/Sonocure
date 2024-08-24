import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SeanceTreatment } from 'src/app/model/seanceTreatment';
import { ImageIrmService } from 'src/app/services/image-irm.service';

@Component({
  selector: 'app-item-seance-treatment',
  templateUrl: './item-seance-treatment.component.html',
  styleUrls: ['./item-seance-treatment.component.css']
})
export class ItemSeanceTreatmentComponent implements OnInit {

  constructor(private imageirmService:ImageIrmService){}

  imagePath :string =""
  @Input() seance!:SeanceTreatment;
  @ViewChild('dialogRef') dialogRef: any;

  openDialog() {
      this.dialogRef.nativeElement.showModal();
  }

  closeDialog() {
      this.dialogRef.nativeElement.close();
  }
  ngOnInit(): void {
    this.imageirmService.getPathById(this.seance.idImage).subscribe((imagePath: string) => {
        this.imagePath = imagePath;
    });
    
}
}
