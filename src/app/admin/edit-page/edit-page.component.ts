import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/components/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {Subscription, switchMap} from "rxjs";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit,OnDestroy{
  form: FormGroup
  post: Post
  submitted = false
  uSub:Subscription
  constructor(private route: ActivatedRoute, private postService: PostService,
              private router:Router) {
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => {
          return this.postService.getById(params['id'])
        })
      ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    this.uSub = this.postService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,

    }).subscribe(()=>{
      this.submitted = false
    })
    this.form.reset()
    this.router.navigate(['/admin','dashboard'])

  }

  ngOnDestroy() {
    if(this.uSub){
      this.uSub.unsubscribe()
    }
  }
}
