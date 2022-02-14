import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  /**
   * Required fields tp update user info
   */
  @Input() userData = { Username: '', Password: '', Name: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Updates user details
   */
  editUserProfile(): void {
    this.fetchApiData.editUserProfile(this.userData).subscribe((res) => {
      this.dialogRef.close();
      window.location.reload();
      localStorage.setItem('username', res.Username)
      console.log(res)
      this.snackBar.open(this.userData.Username, 'Successfully updated user details!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
    })
  }

}