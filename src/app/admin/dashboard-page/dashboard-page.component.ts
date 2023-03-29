import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../../shared/components/interfaces";
import {PostService} from "../../shared/post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[]

  constructor(private postService: PostService) {
  }

  sSub: Subscription

  ngOnInit() {
    this.sSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  ngOnDestroy() {
    if (this.sSub) {
      this.sSub.unsubscribe()
    }
  }

  remove(id: string) {
    this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id)
    })

  }
}
