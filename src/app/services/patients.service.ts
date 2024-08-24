// patient.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../model/patient';



@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patients: Patient[] = [
    new Patient(1, 'X', 30, 'Male', '51181080', 'Undefined'),
    new Patient(2, 'Doe John', 62, 'Male', '21744845', 'Meningioma'),
    new Patient(3, 'Smith Jane', 25, 'Female', '987654321', 'Pituitary Adenoma')
  ];

  constructor() {}

  getPatients(): Observable<Patient[]> {
    return of(this.patients);  // Utilisez `of` pour renvoyer un Observable
    // return this.http.get<Patient[]>(apiUrl);  // Pour une API réelle
  }

  getPatientById(id: number): Observable<Patient> {
    const patient = this.patients.find(p => p.id === id);
    console.log('Patient found:', patient);
    return of(patient || new Patient());
  }

  getPatientByName(name: string): Observable<Patient> {
    const patient = this.patients.find(p => p.name === name);
    console.log('Patient found:', patient);
    return of(patient || new Patient());
  }
  createPatient(patient: Patient): Observable<Patient> {
    patient.id = this.patients.length + 1;  // Simule l'auto-incrémentation de l'ID
    this.patients.push(patient);
    return of(patient);
    // return this.http.post<Patient>(apiUrl, patient);  // Pour une API réelle
  }

  updatePatient(patient: Patient): Observable<Patient> {
    const index = this.patients.findIndex(p => p.id === patient.id);
    if (index !== -1) {
      this.patients[index] = patient;
    }
    return of(patient);
    // return this.http.put<Patient>(`${apiUrl}/${patient.id}`, patient);  // Pour une API réelle
  }

  deletePatient(id: number): Observable<any> {
    this.patients = this.patients.filter(p => p.id !== id);
    return of(null);
    // return this.http.delete(`${apiUrl}/${id}`);  // Pour une API réelle
  }
  length():number{
    return this.patients.length;
  }  
}
