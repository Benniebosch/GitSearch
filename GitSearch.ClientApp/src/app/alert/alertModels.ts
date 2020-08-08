import { Observable, AsyncSubject } from 'rxjs';

export class Alert {
    type: AlertType;
    message: string;
    alertId: string;
    keepAfterRouteChange: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export class ConfirmAlert extends Alert {
    private asyncConfirmSubject = new AsyncSubject<boolean>();
    asyncConfirmSubject$ = this.asyncConfirmSubject.asObservable();

    constructor(init?:Partial<Alert>) {
        super(init);
    }

    confirm(bln: boolean ){
        this.asyncConfirmSubject.next(bln);
        this.asyncConfirmSubject.complete();
    }

}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning,
    Confirm
}