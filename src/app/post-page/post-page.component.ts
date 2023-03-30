import {Component, OnInit} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {Post} from "../shared/components/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../shared/post.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit{
  post$:Observable<Post>
  constructor(private route:ActivatedRoute,private postServise:PostService) {
  }

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      switchMap((params:Params)=>{
        return this.postServise.getById(params['id'])
      })
    )
  }

}
