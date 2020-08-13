import { Component, OnInit } from '@angular/core';

import { Users } from './../model/users';
import { UsersService } from './../users.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private _uS: UsersService) {}

  users: Users[];

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this._uS.getUser().subscribe((users: Users[]) => {
      this.users = users;
    });
  }
}
