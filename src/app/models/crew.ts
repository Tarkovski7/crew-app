import { Certificate } from "./certificate";

export class Crew {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  title: string;
  daysOnBoard: number;
  dailyRate: number;
  currency: Currency;
  certificates: Certificate[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    nationality: string,
    title: string,
    daysOnBoard: number,
    dailyRate: number,
    currency: Currency,
    certificates: Certificate[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.nationality = nationality;
    this.title = title;
    this.daysOnBoard = daysOnBoard;
    this.dailyRate = dailyRate;
    this.currency = currency;
    this.certificates = certificates;
  }
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR'
}
