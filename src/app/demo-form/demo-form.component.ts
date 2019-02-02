import { Component, OnInit } from '@angular/core';
import { DemoFormService } from "src/app/demo-form/demo-form.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css']
})
export class DemoFormComponent implements OnInit {

  demoForm :FormGroup;

  constructor(
    private demoFormService:DemoFormService
  ) { }

  ngOnInit() {
    this.demoFormService.teamForm$
    .subscribe((form) => {
      this.demoForm = form;
    })
  }

}
