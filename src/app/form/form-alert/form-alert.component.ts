import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.scss'],
})
export class FormAlertComponent implements OnInit {
  @Input() invalid: boolean;
  @Input() zeroField: boolean;
  @Input() check: boolean;

  @Input() invalidMessage: string;
  @Input() zeroFieldMessage: string;
  @Input() checkMessage: string;
  constructor() {}

  ngOnInit(): void {}
}
