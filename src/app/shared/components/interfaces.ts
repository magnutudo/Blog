export interface User {
  email:string,
  password:string,
  returnSecureToken:boolean
}
export interface FbResponse {
  idToken:string,
  expiresIn:string
}
