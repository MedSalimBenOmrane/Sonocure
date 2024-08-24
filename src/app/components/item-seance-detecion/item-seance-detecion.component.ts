import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SeanceDetection } from 'src/app/model/seanceDetection';
import { ImageIrmService } from 'src/app/services/image-irm.service';

@Component({
  selector: 'app-item-seance-detecion',
  templateUrl: './item-seance-detecion.component.html',
  styleUrls: ['./item-seance-detecion.component.css']
})
export class ItemSeanceDetecionComponent  implements OnInit{
  constructor(private imageirmService:ImageIrmService){}

  imagePath :string ="assets"
  
  @Input() seance!:SeanceDetection;
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

detail(){

}

}
