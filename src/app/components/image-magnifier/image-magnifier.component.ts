import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

  @Component({
    selector: 'app-image-magnifier',
    templateUrl: './image-magnifier.component.html',
    styleUrls: ['./image-magnifier.component.css']
  })
  export class ImageMagnifierComponent  implements AfterViewInit {
    @Input() pathImage: string = '';
    @ViewChild('featured') imageRef!: ElementRef<HTMLImageElement>;
  
    ngAfterViewInit() {
    
    }
  
   
    
  }