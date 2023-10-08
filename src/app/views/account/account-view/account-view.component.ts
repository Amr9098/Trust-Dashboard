import {
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MustMatch } from "./must-match.validator";
import Swal from "sweetalert2";
import { AccountService } from "../account.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { PasswordValidator } from "../password.validator";

@Component({
  selector: "app-account-view",
  templateUrl: "./account-view.component.html",
  styleUrls: ["./account-view.component.scss"],
})
export class AccountViewComponent implements OnInit {
  user$;
  public Reactive: UntypedFormGroup;
  public ReactiveFormSubmitted = false;
  loading = false;
  public passwordTextTypeNew = false;
  public passwordViewText = "View Password";

  constructor(
    private formB: UntypedFormBuilder,
    private AccountService: AccountService,
    private _authService: AuthService
  ) {
    this.Reactive = this.formB.group(
      {
        old_password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ],
        ],
        new_password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(1000),
            PasswordValidator.strong,

          ],
        ],
        confirm_password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            PasswordValidator.strong,

          ],
        ],
      },
      {
        validator: MustMatch("new_password", "confirm_password"),
      }
    );
  }

  ngOnInit(): void {
    this.getAccountData();

  
  }

  getAccountData() {
    JSON.parse(localStorage.getItem("currentUser"));
    this.user$ = JSON.parse(localStorage.getItem("currentUser"));
  }

  onUploadSuccess() {
    alert("Upload");
  }

  get ReactiveForm() {
    return this.Reactive.controls;
  }

  ReactiveFormOnSubmit() {
    this.ReactiveFormSubmitted = true;

    if (this.Reactive.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.Reactive.value);

    this.AccountService.changeAuthUserPassword(this.Reactive.value).subscribe(
      (re: any) => {
        this.loading = false;
        Swal.fire({
          icon: "success",
          title: this.user$.name,
          text: "Password Updated successfully 👌",
          position: "center",
          showConfirmButton: false,
          timer: 3500,
          showClass: {
            popup: "animate__animated animate__zoomInDown",
          },
          hideClass: {
            popup: "animate__animated animate__backOutDown",
          },
        });

        setTimeout(()=>{

          this._authService.signout();
        }, 5000)
      },
      (er: any) => {
        this.loading = false;


        Swal.fire({
          icon: "error",
          title: this.user$.name,
          text: er,
          position: "center",
          showConfirmButton: false,
          timer: 3500,
          showClass: {
            popup: "animate__animated animate__zoomInDown",
          },
          hideClass: {
            popup: "animate__animated animate__backOutDown",
          },
        });


        console.log(er);
      }
    );
  }


  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
     this.passwordViewText = ( this.passwordTextTypeNew == false) ? "View Password"  : "Hide Password";

  }
}
