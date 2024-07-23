export class Crew {
  firstName: string;
  lastName: string;
  nationality: string;
  title: string;
  daysOnBoard: number;
  dailyRate: number;
  currency: string;

  constructor(
    firstName: string,
    lastName: string,
    nationality: string,
    title: string,
    daysOnBoard: number,
    dailyRate: number,
    currency: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nationality = nationality;
    this.title = title;
    this.daysOnBoard = daysOnBoard;
    this.dailyRate = dailyRate;
    this.currency = currency;
  }
}
