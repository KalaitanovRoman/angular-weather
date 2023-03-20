import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
    template: '',
})
export abstract class SubscriberComponent implements OnDestroy {
    protected _subs: Subscription = new Subscription();

    protected constructor() {}

    ngOnDestroy() {
        this._subs.unsubscribe();
    }
}
