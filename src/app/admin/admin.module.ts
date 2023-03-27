import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CreatePageComponent} from "./create-page/create-page.component";
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "", component: AdminLayoutComponent, children: [
          {path:"", redirectTo:"/admin/login",pathMatch:"full"},
          {path:"login",component:LoginPageComponent},
          {path:"create",component:CreatePageComponent},
          {path:"dashboard",component:DashboardPageComponent},
          {path:"post/:id/edit",component:EditPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    CreatePageComponent,
    DashboardPageComponent,
    LoginPageComponent,
    EditPageComponent
  ]
})
export class AdminModule {

}
