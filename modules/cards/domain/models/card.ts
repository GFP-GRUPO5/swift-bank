export interface ICreditCard {
  id: string;
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  isActive?: boolean;
}
