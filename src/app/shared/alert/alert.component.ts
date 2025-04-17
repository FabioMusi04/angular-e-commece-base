import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class AlertComponent implements OnInit {
  colorClass = '';

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string; 
      message: string;
      status?: 'warn' | 'error' | 'info' | 'success';
      buttons?: 'ok' | 'ok-cancel'; 
      autoClose?: boolean;
    }
  ) {}

  ngOnInit() {
    this.setColorClass();
    if (this.data.autoClose) {
      setTimeout(() => this.dialogRef.close(), 3000);
    }
  }

  setColorClass() {
    switch (this.data.status) {
      case 'warn': this.colorClass = 'alert-warn'; break;
      case 'error': this.colorClass = 'alert-error'; break;
      case 'info': this.colorClass = 'alert-info'; break;
      case 'success': this.colorClass = 'alert-success'; break;
      default: this.colorClass = '';
    }
  }

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}
