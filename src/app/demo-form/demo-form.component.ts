import { Component, OnInit } from '@angular/core';
import { DemoFormService } from "src/app/demo-form/demo-form.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnInit {

  demoForm :FormGroup;

  get childrenForms(){
    return this.demoFormService.currentChildrenForms;
  }

  constructor(
    private demoFormService:DemoFormService
  ) { }

  ngOnInit() {
    this.demoFormService.teamForm$
    .subscribe((form) => {
      this.demoForm = form;
    })
  }

  addChild(){
    this.demoFormService.addChild();
  }

  removeLastChild(){
    const lastIndex = this.childrenForms.length - 1;
    this.childrenForms.splice(lastIndex,1);
  }

}
