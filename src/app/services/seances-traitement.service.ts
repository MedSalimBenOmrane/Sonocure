import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SeanceTreatment } from '../model/seanceTreatment';

@Injectable({
  providedIn: 'root'
})
export class SeancesTraitementService {
  private seances: SeanceTreatment[] = [
    new SeanceTreatment(1, new Date('2023-08-01'), 1, 45, 2,'Male', 'Brain', 2.5, 'Meningioma', 2.3,2320, 120),
    new SeanceTreatment(2, new Date('2023-08-02'), 1, 55, 2,'Female', 'Liver', 3.1, 'Meningioma', 2.3,2320, 120),
    
    // Ajoutez d'autres séances ici
  ];

  constructor() {}

  
  genrateWithIA(patientAge:number ,patientGender:string ,tumorSize:number,tumorLocation:string,tumorType:string): Observable<{ frequency: number, intensity: number , duration:number }> {
    return new Observable(observer => {
      // Simule une attente de 5 secondes
      setTimeout(() => {
        const frequency =1.234;
        const intensity = 2410.721;
        const duration = 150;
  
        // Émission des données après 5 secondes
        observer.next({ frequency, intensity, duration });
  
        // Fin de l'observable
        observer.complete();
      }, 3000);
    });
  }
 
  getSeances(): Observable<SeanceTreatment[]> {
    return of(this.seances);
  }

  getSeanceById(id: number): Observable<SeanceTreatment> {
    const seance = this.seances.find(s => s.id === id);
    return of(seance || new SeanceTreatment());
  }

  addSeance(seance: SeanceTreatment): Observable<SeanceTreatment> {
    seance.id = this.seances.length > 0 ? Math.max(...this.seances.map(s => s.id)) + 1 : 1;
    this.seances.push(seance);
    return of(seance);
  }

  getSeanceByPatientId(id: number): Observable<SeanceTreatment[]> {
    const seances = this.seances.filter(s => s.patientID === id);
    return of(seances);
  }
  editSeance(seance: SeanceTreatment): Observable<SeanceTreatment> {
    const index = this.seances.findIndex(s => s.id === seance.id);
    if (index !== -1) {
      this.seances[index] = seance;
      return of(seance);
    } 
    
    return of(new SeanceTreatment())
  }

  deleteSeance(id: number): Observable<boolean> {
    const index = this.seances.findIndex(s => s.id === id);
    if (index !== -1) {
      this.seances.splice(index, 1);
      return of(true);
    } else {
      return of(false);
    }
  }
  length():number{
    return this.seances.length;
  }  
}
