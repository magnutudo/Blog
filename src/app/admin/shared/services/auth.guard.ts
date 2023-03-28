import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard {
  constructor(private authService:AuthService,private route:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isAuthenticated()){
      return true
    }
    else {
      this.authService.logout()
      return this.route.navigate(["/admin",'login'],{
        queryParams:{
          loginAgain: true
        }
      })
    }

  }

}
