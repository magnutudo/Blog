import {Injectable} from "@angular/core";
import {FbCreateResponse,Post} from "./components/interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {map, Observable} from "rxjs";



@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private http: HttpClient) {
  }

  create(post: Post):Observable<Post> {
    return this.http.post(`${environment.fbUrl}/posts.json`, post)
      .pipe(map((resp: FbCreateResponse) => {
        return {
          ...post,
          id: resp.name,
          date:new Date(post.date)
        }
      }))
  }
  getAll():Observable<Post[]>{
    return this.http.get(`${environment.fbUrl}/posts.json`)
      .pipe(map((resp:{[key:string]:any})=>{
        return Object.keys(resp).map(key =>({
          ...resp[key],
          id:key,
          date: new Date(resp[key].date)
        }))
    }))
  }
  remove(id:string):Observable<any> {
    return this.http.delete(`${environment.fbUrl}/posts/${id}.json`)
  }
  getById(id: string):Observable<Post> {
    return this.http.get(`${environment.fbUrl}/posts/${id}.json`).pipe(
      map((post:Post) => {
        return {
          ...post,
          id:id,
          date:new Date(post.date)
        }
      })
    )
  }
  update(post:Post):Observable<Post>{
    return this.http.patch<Post>(`${environment.fbUrl}/posts/${post.id}.json`,post)
  }

}
