import { Component, OnInit,Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-demo-child-form',
  templateUrl: './demo-child-form.component.html',
  styleUrls: ['./demo-child-form.component.css']
})
export class DemoChildFormComponent implements OnInit {

  @Input()
  childForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
