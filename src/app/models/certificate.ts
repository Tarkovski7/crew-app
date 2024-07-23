export class Certificate {
  name: string;
  issueDate: Date;
  expiryDate?: Date; 

  constructor(name: string, issueDate: Date, expiryDate?: Date) {
    this.name = name;
    this.issueDate = issueDate;
    this.expiryDate = expiryDate;
  }
}
