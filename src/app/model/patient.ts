export class Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    tel: string;
    tumorType: string;
  
    constructor(id = 0, name = "", age = 0, gender = "", tel = "", tumorType = "") {
      this.id = id;
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.tel = tel;
      this.tumorType = tumorType;
    }
  }
  