import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ScheduleServicesService } from "../schedule-services.service";
import { debounceTime } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FlatpickrOptions } from "ng2-flatpickr";
import { ToastrService } from "ngx-toastr";
import { formatDate } from "@angular/common";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { PasswordValidator } from "../../account/password.validator";

@Component({
  selector: "app-view-all-riders-schedule",
  templateUrl: "./view-all-riders-schedule.component.html",
  styleUrls: ["./view-all-riders-schedule.component.scss"],
})
export class ViewAllRidersScheduleComponent implements OnInit {
  searchControl: UntypedFormControl = new UntypedFormControl();
  public ReactiveSubmitted = false;
  public ReactiveUserDetailsForm: UntypedFormGroup;
  public ReactiveUDFormSubmitted = false;

  loadingBtn=false;
  products;
  filteredProducts;
  orderData;
  riderData;
  style = {
    width: "100%",
    height: "65vh",
    margin: "15px ",
    background: "linear-gradient(to right, #c9d6ff, #e2e2e2)",
  };

  loading: boolean = true;
  public dateTimeOptions: FlatpickrOptions = {
    altFormat: "Y-m-d H:i:S",
    altInput: true,
    enableTime: true,
    time_24hr: true,
    enableSeconds: true,
    minDate: formatDate(new Date(), "yyyy-MM-dd H:MM:SS", "en-EG", "+3"),
    singleDatePicker: true,
  };
  public dateTimeOptions2: FlatpickrOptions = {
    altFormat: "Y-m-d H:i:S",
    altInput: true,
    enableTime: true,
    time_24hr: true,
    enableSeconds: true,
    minDate: formatDate(new Date(), "yyyy-MM-dd H:MM:SS", "en-EG", "+3"),
    singleDatePicker: true,
  };
  constructor(
    private ScheduleService: ScheduleServicesService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private _toastrService: ToastrService,
    private _router: Router,
  ) {
    this.ReactiveUserDetailsForm = this.formBuilder.group({
      first_name: [
        "",
        [Validators.required, Validators.min(3), Validators.max(50)],
      ],
      last_name: [
        "",
        [Validators.required, Validators.min(3), Validators.max(50)],
      ],
      phone: ["", [Validators.required, Validators.min(8), Validators.max(15)]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.min(8), PasswordValidator.strong],
      ],
    });
  }

  ngOnInit(): void {


    this.getAllRidersSchedule();

    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.filerData(value);
      });
  }

  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return (this.filteredProducts = [...this.orderData]);
    }

    const columns = Object.keys(this.orderData[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.orderData.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredProducts = rows;
  }

  getAllRidersSchedule() {
    this.ScheduleService.getAllRidersSchedule().subscribe((response: any) => {
      this.loading = false;
      this.orderData = response;
        console.log(response);
      this.filteredProducts = response;
    });
  }

  open(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        backdrop: false,
        fullscreen: "xxl",
        size: "lg",
        backdropClass: "light-blue-backdrop",
      })
      .result.then(
        (result) => {},
        (reason) => {
          console.log("Err!", reason);
        }
      );
  }



  get ReactiveUDForm() {
    return this.ReactiveUserDetailsForm.controls;
  }

  ReactiveUDFormOnSubmit() {
    this.loadingBtn=true;
    this.ReactiveUDFormSubmitted = true;

    if (this.ReactiveUserDetailsForm.invalid) {
      this.loadingBtn=false;

      return;
    }
    alert("ReactiveUDForm");

    this.ScheduleService
      .AddNewRiderSchedule(this.ReactiveUserDetailsForm.value)
      .subscribe(
        (re: any) => {
          this._toastrService.success(
            " success😎",
            "Rider Schedule Add Successfully",
            {
              timeOut: 6000,
              closeButton: true,
              tapToDismiss: false,
              progressBar: true,
              positionClass: "toast-top-center",
            }
          );
            this.getAllRidersSchedule();
          this.ReactiveUserDetailsForm.reset();
          document.getElementById("myCheck").click();

        },

        (er: any) => {
          this.loadingBtn=false;

          this._toastrService.error(
            " Danger",
            `👋 ${er}`,
            {
              timeOut: 6000,
              closeButton: true,
              tapToDismiss: false,
              progressBar: true,
              positionClass: "toast-top-center",
            }
          );

        }
      );
  }




  deleteUser(id: number, name: string) {
    Swal.fire({
      title: `Are you sure you want to delete User ${name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#663399',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ScheduleService.DeleteUser(id).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'User has been deleted successfully.',
              'success'
            );
            this.getAllRidersSchedule();
          },
          (err: any) => {
            Swal.fire(
              'Error!',
              err,
              'error'
            );
          }
        );
      }
    });
  }

  BanUser(id: number, name: string) {
    Swal.fire({
      title: `Are you sure you want to ban User ${name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#663399',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ban it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ScheduleService.BanUser(id).subscribe(
          () => {
            Swal.fire(
              'Banned!',
              'User has been banned successfully.',
              'success'
            );
            this.getAllRidersSchedule();
          },
          (err: any) => {
            Swal.fire(
              'Error!',
              err,
              'error'
            );
          }
        );
      }
    });
  }


  UserProfile(id: string){
    this._router.navigateByUrl("/account");

  }



}
