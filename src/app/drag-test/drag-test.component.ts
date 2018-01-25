import { Component, OnInit } from '@angular/core';

class Emp {
  constructor(public name: string, public age: number) {

  }
}

@Component({
  selector: 'app-drag-test',
  templateUrl: './drag-test.component.html',
  styleUrls: ['./drag-test.component.scss']
})
export class DragTestComponent implements OnInit {
  emps : Emp[] = [];
  emp: Emp;

  constructor() { }

  ngOnInit() {
    this.emps.push(new Emp('Balwinder', 40));
    this.emps.push(new Emp('Dravid', 45));
    this.emps.push(new Emp('Sachin', 32));
    this.emps.push(new Emp('Mike Hussy', 38));
    this.emps.push(new Emp('Giles Clark', 22));
    this.emps.push(new Emp('Joe Root', 20));
  }

  onDrop(emp : Emp) {
    this.emp = emp;
  }
}
