export class SeanceTreatment {
  id: number;
  dateSeance: Date;
  idImage: number;
  patientAge: number;
  patientID:number;
  patientGender: string;
  tumorLocation: string;
  tumorSize: number;
  tumorType: string;
  frequency: number;
  intensity: number;
  duration: number;

  constructor(
    id = 0,
    dateSeance = new Date(),
    idImage = 0,
    patientAge = 0,
    patientID = 0,
    patientGender = '',
    tumorLocation = '',
    tumorSize = 0.0,
    tumorType = '',
    frequency = 0.0,
    intensity = 0.0,
    duration = 0.0
  ) {
    this.id = id;
    this.dateSeance = dateSeance;
    this.idImage = idImage;
    this.patientAge = patientAge;
    this.patientID = patientID;
    this.patientGender = patientGender;
    this.tumorLocation = tumorLocation;
    this.tumorSize = tumorSize;
    this.tumorType = tumorType;
    this.frequency = frequency;
    this.intensity = intensity;
    this.duration = duration;
  }
}