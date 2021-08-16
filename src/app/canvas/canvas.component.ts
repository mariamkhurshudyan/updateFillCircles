import { Component, OnInit } from '@angular/core';
import {ICircle} from "../interfaces/circle.interface";
import {ECircleCount} from "../enums/circle-count.enum";
import {LocalStorageService} from "../services/storage.service";
import {IProject} from "../interfaces/project.interface";
import { Router } from '@angular/router';
import { CircleComponent } from '../circle/circle.component';
import { Circle } from '../interfaces/circle.model';
import { Project } from '../interfaces/circle.model';
import { User } from '../interfaces/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  circles: ICircle[] = [];
  projectName: string = '';
  projectList: IProject[] = [];
  projectListName = 'circlesProject';
  currentUserProjects: IProject[] = [];
  isEditable = false;
  currentUser!: User;
  canvasSizes: number[] = [
    ECircleCount.MIN, // 100
    ECircleCount.MID, // 225
    ECircleCount.MAX, // 400
  ];
  selectedSize: number = this.canvasSizes[0];
  currentColor: string = '#000';
  currentName:string ='';
  constructor(private storage: LocalStorageService, private router: Router) { }

  // ngOnInit(): void {
  //   this.getProjects();
  //   console.log(this.projectList)
  // }
  ngOnInit(): void {
    const email = this.storage.get('currentUser');
    if (!email) {
      this.onLogout();
    } else {
      this.getProjects(email);
    }
  }

  onGenerateCircles(): void {
    this.resetColors()
    console.log('this.circles: ', this.circles);
  }

  onSizeSelect(): void {
     this.circles = [];
  }

  onCircleClick(circle: ICircle): void {
    this.circles[circle.id].color = this.currentColor !== circle.color ?
     this.currentColor : '#FFFFFF';
  }

  onResetColor(): void {
    if (!this.isEmpty(this.circles)) {
      this.resetColors();
    }
  }

  resetColors(): void {
    this.circles = [];
    this.isEditable = false;
    for (let i = 0; i < this.selectedSize; i++) {
      // this.circles.push({
      //   id: i,
      //   uid: this.newId(),
      //   color: '',
      // });
      const value = new Circle (i, this.newId(), '');
      this.circles.push(value);
    }
  }

  onFillCircles(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }
    this.circles.forEach((item) => {
      item.color = this.currentColor;
    })
  }

  isEmpty(arr: ICircle[]): boolean {
    return !arr.length;
  }

  newId(): string {
    return String(Date.now());
  }
  nameExist(): boolean {
    return this.projectList.some((input) => input.name === this.projectName);
   } 
  onSave(): void {
    if (this.isEmpty(this.circles) || !this.projectName ||  this.nameExist()) {
      alert("Try to use another name, this one is already taken.")
      return;
    }
    // this.projectList.push({
    //   id: this.newId(),
    //   name: this.projectName,
    //   size: this.selectedSize,
    //   circles: this.circles,
    // })
    const projs = new Project (this.storage.get('curUser') || '',this.newId(), this.projectName, this.selectedSize, this.circles);
    this.projectList.push(projs);    
    this.projectName = '';
    this.currentUserProjects.push(new Project (this.storage.get('curUser') || '',this.newId(), this.projectName, this.selectedSize, this.circles))
    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
  }

    onLogout(): void {
      this.storage.remove('currentUser');
      this.router.navigate(['/']);
    }
    selectProject(project: IProject): void {
      this.circles = project.circles;
      this.selectedSize = project.size;
      this.currentName = project.name;
      this.isEditable = true;
      //console.log(this.currentName);
      //console.log(this.selectedSize);
    }
    onDeletePicture(project: IProject) : void{
      const updateProjectList = this.projectList.filter((item) => {
        return item.id !== project.id;
      });
      this.projectList = updateProjectList;
    }
    getProjects(email: string): void {
      this.currentUserProjects = [];
      const projects = this.storage.get(this.projectListName);
      if (projects) {
        this.projectList = JSON.parse(projects);
        this.projectList.map(el => {
          if (el.email === email) {
            this.currentUserProjects.push(el);
          }
        });
      }
    }
    }

 
  



