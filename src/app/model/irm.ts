// irm.model.ts
export class Irm {
    id: number;
    imagePath: string;
    creationDate: Date;
    tumorLocation: string;
    tumorSize: number;
  
    constructor(
      id = 0,
      imagePath = "",
      creationDate = new Date(),
      tumorLocation = "",
      tumorSize = 0.0
    ) {
      this.id = id;
      this.imagePath = imagePath;
      this.creationDate = creationDate;
      this.tumorLocation = tumorLocation;
      this.tumorSize = tumorSize;
    }
  }