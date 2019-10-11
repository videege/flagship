// import { Observable } from 'rxjs';

// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { first } from 'rxjs/operators';

// export abstract class HotResolve<T extends Observable<any>> implements Resolve<Promise<T>> {
//     public abstract hotResolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): T;
//     public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<T> {
//         return new Promise((resolve, reject) => {
//             const observable = this.hotResolve(route, state);
//             observable.pipe(first()).subscribe(() => resolve(observable));
//         }
//     }
// }