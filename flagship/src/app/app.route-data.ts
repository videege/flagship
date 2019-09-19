import { ActivatedRouteSnapshot, Data } from '@angular/router';

export class FlagshipRouteData {
    constructor(private title: string | ((data: Data) => string), 
        private parentLabel: string | ((data: Data) => string), 
        private parentLink: string | ((data: Data) => string)) {
    }
    private evaluate(prop: string | ((data: Data) => string), 
        data: Data): string {
        if (!prop) return null;
        if (typeof prop === 'string') return prop;
        return prop(data);
    }
    public getTitle(data: Data): string {
        return this.evaluate(this.title, data);
    }
    public getParentLabel(data: Data): string {
        return this.evaluate(this.parentLabel, data);
    }
    public getParentLink(data: Data): string {
        return this.evaluate(this.parentLink, data);
    }
}

