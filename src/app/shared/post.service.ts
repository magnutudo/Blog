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

}
