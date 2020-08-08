import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../alert.service';
import { ConfirmAlert } from '../alert/alertModels';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit, OnDestroy {
  display: boolean;
  context: ConfirmAlert;
  sub1: Subscription;

  constructor(private srv:AlertService ) { }

  ngOnInit(): void {
    this.sub1 = this.srv.ConfirmSubject$.subscribe(model => {
      //this.confirm(false);
      this.context = model;
      this.display = true;
    });

  }
  confirm(bln: boolean) {
    if(this.context) {
      this.context.confirm(bln);
      this.context = null;
    }
    this.display = false;
  }

  ngOnDestroy(): void {
    //this.confirm(false);
    if (this.sub1) this.sub1.unsubscribe();
  }

}
