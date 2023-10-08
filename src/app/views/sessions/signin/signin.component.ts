import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    loginForm: UntypedFormGroup;
    submitted = false;
    error = '';
    public passwordTextType: boolean;


    constructor(
        private auth: AuthService,
        private router: Router,
        private formBuilder: UntypedFormBuilder,
        private _toastrService: ToastrService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
          });




        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });


    }
    get f() { return this.loginForm.controls; }

    signin() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        } else {
            this.loading = true;
            this.loadingText = 'Sigining in...';
          this.loading = true;
            this.auth.signin(this.f.email.value, this.f.password.value).subscribe((res: any) => {

                this.loading = false;
                this._toastrService.success(' Login Success', "Welcome In Amr Dashboard 😊.", { timeOut: 6000 ,closeButton: true,tapToDismiss:false, progressBar: true,positionClass:"toast-top-center"});
            },

            (error: any) => {


                this.loading = false;

              this._toastrService.error(' Login Error', error, { timeOut: 6000 ,closeButton: true,tapToDismiss:false, progressBar: true,positionClass:"toast-top-center"});


            }

            )


        }

    }
    togglePasswordTextType() {
        this.passwordTextType = !this.passwordTextType;
      }
}
