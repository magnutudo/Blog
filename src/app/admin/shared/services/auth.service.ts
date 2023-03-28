import {Injectable} from "@angular/core";
import {FbResponse, User} from "../../../shared/components/interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {Observable, tap} from "rxjs";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem("fb-token-exp"))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem("fb-token")
  }

  logout() {
    this.setToken(null)
  }
  isAuthenticated():boolean{
    return !!this.token
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(tap(this.setToken))
  }
  setToken(response: FbResponse) {
    const expDate = new Date(+response.expiresIn * 1000 + new Date().getTime())
    localStorage.setItem("fb-token-exp", expDate.toString())
    localStorage.setItem("fb-token", response.idToken)
  }
}
