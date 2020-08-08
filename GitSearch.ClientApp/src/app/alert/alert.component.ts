import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../alert.service';
import { Alert, AlertType } from './alertModels';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    @Input() id: string;

    alerts: Alert[] = [];

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getAlert(this.id).subscribe((alert: Alert) => {
            if (!alert.message) {
                this.alerts = [];
                return;
            }
            this.alerts.push(alert);
            console.log('AlertComponent:', this.alerts);
            setTimeout(() => { this.removeAlert(alert); }, 5000);
        });
    }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'w3-panel w3-highway-green';
            case AlertType.Error:
                return 'w3-panel w3-highway-red';
            case AlertType.Info:
                return 'w3-panel w3-blue';
            case AlertType.Warning:
                return 'w3-panel w3-yellow';
        }
    }
}
