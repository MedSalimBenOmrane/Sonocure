import { Injectable } from '@angular/core';
import { SeanceTreatment } from '../model/seanceTreatment'; 
import { Observable, of } from 'rxjs';
import { SeanceDetection } from '../model/seanceDetection';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SeancesDetectionService {
  private apiUrl = 'http://localhost:5000/predict_ultrasound'; // Adjust the URL according to your Flask API
  private seances: SeanceDetection[] = [
    new SeanceDetection(1, new Date('2023-01-01'), 1, 45,2, 'Male', 'deep', 8.85,0.75882,15.43805, 25.5478 ),
    new SeanceDetection(2, new Date('2023-02-01'), 1, 50,3, 'Male','deep', 3.0, 23.31, 15.64, 23.31 ),
    new SeanceDetection(3, new Date('2023-03-01'), 1, 60,3, 'Male','deep', 4.0, 23.31, 15.64, 23.31 )
  ];

  constructor(private http: HttpClient) { }

  getSeancesDetection(): SeanceDetection[] {
    return this.seances;
  }
  getSeancesDetectionLength(): number {
    return this.seances.length;
  }

  generateWithIA(patientAge: number, patientGender: string, tumorSize: number, tumorLocation: string): Observable<{ frequency: number, intensity: number, duration: number }> {
    // Convert inputs to the required format
    const inputData = {
      tumor_size_cm: tumorSize,
      tumor_location: tumorLocation === 'superficial' ? 0 : 1,
      age: patientAge,
      sex: patientGender === 'Male' ? 0 : 1
    };
    console.log("input", inputData);
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<{ predictions: number[] }>(this.apiUrl, inputData, httpOptions).pipe(
      map(response => {
        // Format each prediction to three decimal places
        const [intensity,frequency, duration] = response.predictions.map(value => 
          parseFloat(value.toFixed(3))
        );
        console.log('output', [intensity,frequency, duration]);
        return { intensity,frequency,  duration };
      }),
      catchError(error => {
        console.error('Error:', error);
        return of({ intensity: 0,frequency: 0,  duration: 0 }); // Fallback in case of an error
      })
    );
  }
  getSeanceById(id: number): Observable<SeanceDetection> {
    const seance = this.seances.find(s => s.id === id);
    return of(seance || new SeanceDetection());
  }
  getSeanceByPatientId(id: number): Observable<SeanceDetection[]> {
    const seances = this.seances.filter(s => s.patientID === id);
    return of(seances);
  }

  create(seance: SeanceDetection): void {
    this.seances.push(seance);
  }

  update(seance: SeanceDetection): void {
    const index = this.seances.findIndex(s => s.id === seance.id);
    if (index !== -1) {
      this.seances[index] = seance;
    }
  }

  delete(id: number): void {
    this.seances = this.seances.filter(seance => seance.id !== id);
  }
  length():number{
    return this.seances.length;
  }  
}
