
import { ICircle } from "src/app/interfaces/circle.interface";
import { IProject } from "./project.interface";
export class Circle implements ICircle{
    id:number;
    uid: string;
    color: string;
constructor (id:number,uid:string, color:string) {
    this.id = id;
    this.uid = uid;
    this.color = color;
    }
};
export class Project implements IProject{
      email:string = '';
      id: string = '';
      name: string = '';
      size: number = 0;
      circles: ICircle[] = [];

      constructor (email:string,id:string,name:string, size:number, circles: ICircle[]) {
        this.email = email;
        this.id = id;
        this.name = name;
        this.size = size;
        this.circles = circles;
        }
}