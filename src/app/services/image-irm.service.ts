import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Irm } from '../model/irm';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ImageIrmService {
  private apiUrl = 'http://localhost:5000/predict_image'; // Update with your Flask API URL

  private images: Irm[] = [
    new Irm(1, 'assets/images/irm3.jpg', new Date('2024-08-08'), 'Deep', 2.5),
    new Irm(2, 'assets/images/irm.jpg', new Date('2024-08-09'), 'Deep', 3.1),
    new Irm(3, 'assets/images/output_image.jpg', new Date('2024-08-09'), 'Deep', 3.1),
    // Ajoutez d'autres images ici
  ];

  constructor(private http: HttpClient) { }

  createImageIrm(imagePath: string, tumorLocation: string, tumorSize: number): Observable<Irm> {
    const newId = this.images.length > 0 ? Math.max(...this.images.map(img => img.id)) + 1 : 1;
    const newImage = new Irm(newId, imagePath, new Date(), tumorLocation, tumorSize);
    console.log(newId);
    this.images.push(newImage);
    return of(newImage);
  }
  /*
  generateFromImage(imagePath: string): Observable<{ tumorLocation: string, tumorSize: number ,outputimage:string }> {
    // Simule l'analyse d'une image et la génération de données
    return new Observable(observer => {
      // Simule une attente de 5 secondes
      setTimeout(() => {
        const tumorLocation = "deep";
        const tumorSize = 8.58; // Taille simulée
        const outputimage = "assets/images/output_image.jpg";
  
        // Emission des données après 5 secondes
        observer.next({ tumorLocation, tumorSize, outputimage });
  
        // Fin de l'observable
        observer.complete();
      }, 3000);
    });
  
  }*/
    generateFromImage(imagePath: string): Observable<{ tumorLocation: string, tumorSize: number, outputimage: string }> {
      return new Observable(observer => {
        this.http.get(imagePath, { responseType: 'blob' }).subscribe(blob => {
          console.log('Image found');
          const imageFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });
          const formData: FormData = new FormData();
          formData.append('file', imageFile);
    
          this.http.post<{ depth: string, size_cm: number, image_path: string }>(this.apiUrl, formData, {
            headers: new HttpHeaders({
              'Accept': 'application/json'
            })
          }).subscribe(
            response => {
              console.log('AI works', response);
    
              // Map the response fields to your desired variables
              const tumorLocation = response.depth;
              const tumorSize = response.size_cm;
              // Extract only the filename from the full path
              const outputimage = "assets/OutputImages/"+response.image_path.split('/').pop() || ''; 
              console.log('output file name', outputimage);
              // Emit the mapped values
              observer.next({ tumorLocation, tumorSize, outputimage });
              observer.complete();
            },
            error => {
              console.log("AI doesn't work");
              observer.error(error);
            }
          );
        }, error => {
          console.log('Image not found');
          observer.error(error);
        });
      });
    }
  getImageById(id: number): Observable<Irm> {
    const image = this.images.find(img => img.id === id);
    return of(image || new Irm());
  }
  getImageByPath(path: string): Observable<Irm> {
    const image = this.images.find(img => img.imagePath === path);
    return of(image || new Irm());
  }

  editImage(updatedImage: Irm): Observable<Irm> {
    const index = this.images.findIndex(img => img.id === updatedImage.id);
    if (index !== -1) {
      this.images[index] = updatedImage;
      return of(updatedImage);
    } else {
      return of(new Irm);
    }
  }

  deleteImage(id: number): Observable<boolean> {
    const index = this.images.findIndex(img => img.id === id);
    if (index !== -1) {
      this.images.splice(index, 1);
      return of(true);
    } else {
      return of(false);
    }
  }

  getPathById(id: number): Observable<string> {
    const image = this.images.find(img => img.id === id);
    return of(image ? image.imagePath : '');
  }
}