import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

  @Component({
    selector: 'app-image-magnifier',
    templateUrl: './image-magnifier.component.html',
    styleUrls: ['./image-magnifier.component.css']
  })
  export class ImageMagnifierComponent  implements AfterViewInit {
    @ViewChild('featured') imageRef!: ElementRef<HTMLImageElement>;
  
    ngAfterViewInit() {
      this.imageZoom();
    }
  
    imageZoom() {
      const img = this.imageRef.nativeElement;
      const lens = document.getElementById('lens')!;
  
      lens.style.backgroundImage = `url(${img.src})`;
      const ratio = 3;
      lens.style.backgroundSize = `${img.width * ratio}px ${img.height * ratio}px`;
  
      img.addEventListener("mousemove", this.moveLens.bind(this, img, lens, ratio));
      lens.addEventListener("mousemove", this.moveLens.bind(this, img, lens, ratio));
      img.addEventListener("touchmove", this.moveLens.bind(this, img, lens, ratio));
    }
  
    moveLens(img: HTMLImageElement, lens: HTMLElement, ratio: number, event: MouseEvent | TouchEvent) {
      event.preventDefault();
      const pos = this.getCursorPos(event, img);
      
      let positionLeft = pos.x - (lens.offsetWidth / 2);
      let positionTop = pos.y - (lens.offsetHeight / 2);
  
      if (positionLeft < 0) positionLeft = 0;
      if (positionTop < 0) positionTop = 0;
  
      if (positionLeft > img.width - lens.offsetWidth / ratio) {
        positionLeft = img.width - lens.offsetWidth / ratio;
      }
      if (positionTop > img.height - lens.offsetHeight / ratio) {
        positionTop = img.height - lens.offsetHeight / ratio;
      }
  
      lens.style.left = `${positionLeft}px`;
      lens.style.top = `${positionTop}px`;
      lens.style.backgroundPosition = `-${pos.x * ratio}px -${pos.y * ratio}px`;
    }
  
    getCursorPos(event: MouseEvent | TouchEvent, img: HTMLImageElement) {
      const bounds = img.getBoundingClientRect();
      let x = 0;
      let y = 0;
  
      if (event instanceof MouseEvent) {
        x = event.pageX - bounds.left;
        y = event.pageY - bounds.top;
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        x = touch.pageX - bounds.left;
        y = touch.pageY - bounds.top;
      }
  
      x -= window.pageXOffset;
      y -= window.pageYOffset;
  
      return { x: x, y: y };
    }
  }