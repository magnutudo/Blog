import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/components/interfaces";
import {PostService} from "../../shared/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup
  constructor(private postService:PostService,private router:Router) {
  }



  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl("", [Validators.required]),
      author: new FormControl("",[Validators.required]),
      text: new FormControl("",[Validators.required])
    })
  }
  submit() {
    if(this.form.invalid){
      return
    }
    const post:Post = {
      title:this.form.value.title,
      text:this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    }
    this.postService.create(post).subscribe(()=>{
      this.form.reset()
    })
    this.router.navigate(["/admin","dashboard"])



  }
}
