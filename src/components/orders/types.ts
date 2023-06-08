export interface IOrdersResponse {
  id: number;
  user: User;
  amount: number;
  createdAt: Date;
  products: Product[];
  status: StatusClass;
  adress: Dress;
  store: Store;
  courier: Courier;
  events: Event[];
  orderNumber: number;
}

interface Dress {
  text: string;
  coordinate: string[];
}

interface Courier {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: Gender;
  gsm: string;
  createdAt: Date;
  accountNumber: number;
  licensePlate: string;
  address: string;
  store: Store;
  avatar: Avatar[];
}

interface Avatar {
  name: string;
  percent: number;
  size: number;
  status: StatusEnum;
  type: Type;
  uid: string;
  url: string;
}

enum StatusEnum {
  Done = "done",
}

enum Type {
  ImageJPEG = "image/jpeg",
}

enum Gender {
  Female = "Female",
  Male = "Male",
}

interface Store {
  id: number;
  title: string;
  email: string;
  gsm: string;
  isActive: boolean;
  createdAt: Date;
  address: Dress;
  products: any[];
}

interface Event {
  date?: Date;
  status: Status;
}

export enum Status {
  Cancelled = "Cancelled",
  Delivered = "Delivered",
  OnTheWay = "On The Way",
  Pending = "Pending",
  Ready = "Ready",
}

interface Product {
  id: number;
  name: string;
  isActive: boolean;
  description: string;
  images: Image[];
  createdAt: Date;
  price: number;
  category: Category;
}

interface Category {
  id: number;
  title: string;
  isActive: boolean;
  cover?: string;
}

interface Image {
  url: string;
  name: string;
  status: StatusEnum;
  type: Type;
  uid: string;
}

interface StatusClass {
  id: number;
  text: Status;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: Gender;
  gsm: string;
  createdAt: Date;
  isActive: boolean;
  avatar: Avatar[];
  addresses: Dress[];
}
