import {ICircle} from "./circle.interface";

export interface IProject {
  email: string;
  id: string ;
  name: string;
  size:number;
  circles: ICircle[];
}
