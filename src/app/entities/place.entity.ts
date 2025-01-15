import { Zone } from "./zone.entity";

export interface Place
{
  id?:string;
  zone:Zone;
  placeName:string;
  longitude:number;
  latitude:number;
}