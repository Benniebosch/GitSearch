
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, empty, throwError } from 'rxjs';
import { Alert, AlertType, ConfirmAlert } from './alert/alertModels';
import { filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<Alert>();

    private ConfirmSubject = new Subject<ConfirmAlert>();
    ConfirmSubject$ = this.ConfirmSubject.asObservable();

    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    // subscribe to alerts
    getAlert(alertId?: string): Observable<any> {
        return this.subject.asObservable().pipe(filter((x: Alert) => x && x.alertId === alertId));
    }

    // convenience methods
    success(message: string) {
        this.alert(new Alert({ message, type: AlertType.Success }));
    }

    error(message: string) {
        this.alert(new Alert({ message, type: AlertType.Error }));
    }

    info(message: string) {
        this.alert(new Alert({ message, type: AlertType.Info }));
    }

    warn(message: string) {
        this.alert(new Alert({ message, type: AlertType.Warning }));
    }

    confirm(message: string):Observable<boolean> {
        let context = new ConfirmAlert({ message, type: AlertType.Confirm })
        this.ConfirmSubject.next(context);
        return context.asyncConfirmSubject$;
    }

    // main alert method    
    alert(alert: Alert) {
        this.keepAfterRouteChange = alert.keepAfterRouteChange;
        this.subject.next(alert);
    }

    // clear alerts
    clear(alertId?: string) {
        this.subject.next(new Alert({ alertId }));
    }

}