import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../requests.service';
import { style } from '@angular/animations';
import Swal from "sweetalert2";

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-rider-requestes',
  templateUrl: './rider-requestes.component.html',
  styleUrls: ['./rider-requestes.component.scss']
})
export class RiderRequestesComponent implements OnInit {
  isSubmitted = false;
 branches: any ;

 selectedbranch :any="";

 searchControl: UntypedFormControl = new UntypedFormControl();

 RequestData;
 filteredRequests;
 Requests;
 style = {
   'width': '100%',
   'height': '75vh',
   'margin': '15px ',
   "background": "linear-gradient(to right, #c9d6ff, #e2e2e2)" 
 };

   loading: boolean=true;




  constructor( private modalService: NgbModal,public fb: FormBuilder,private req_service:RequestsService) { }

  ngOnInit(): void {


    this.req_service.getAllRequests().subscribe((response:any)=>{
      this.loading=false;
      this.Requests = response;
     this.RequestData=response;
      this.filteredRequests = response;
    console.log(this.filteredRequests);

    },(error:any)=>{


      console.log(error);

    })



    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filerData(value);
    });


    this.update_branches();
  }



  registrationForm = this.fb.group({
    cityName: ['', [Validators.required]],
    count:['', [Validators.required]],
    Shift:[ 8,[Validators.required]],
  });
  changebranch(branch:any) {
    this.registrationForm.get("cityName").setValue(branch.id)
  
  this.selectedbranch = branch;
  
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }



  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
    console.log("skskks")
      false;

    } else {
        //   const     data = this.selectedbranch;


               console.log(this.registrationForm.get('Shift').value);
               

          this.req_service.request_rider({"branch_id":this.registrationForm.get('cityName').value,"count":this.registrationForm.get('count').value,
          "Shift":this.registrationForm.get('Shift').value}).subscribe((res) =>{
 
  console.log(res);
  
  let timerInterval
  Swal.fire({
    title: 'Send rider Request!',
    html: 'Reviewing your  <b></b> Request .',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = `${Swal.getTimerLeft()}` 
      }, 200)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
 
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Request has been sent successfully',
        showConfirmButton: false,
        timer: 1500
      })

    document.getElementById('cl').click()





    }
  })


},

(err)=>{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>'
  })
  document.getElementById('cl').click()



}
);



   
    }
  }

  



  incrementValue()
  {
      var value = parseInt((document.getElementById('number') as any).value, 10);
      value = isNaN(value) ? 0 : value;
      if(value<10){
          value++;
          (document.getElementById('number') as any).value = value;
          this.registrationForm.get("count").setValue(`${value}`);
  
      }
  
  }
   decrementValue()
  {
      var value = parseInt((document.getElementById('number') as any).value, 10);
      value = isNaN(value) ? 0 : value;
      if(value>1){
          value--;
          (document.getElementById('number') as any).value = value;
          this.registrationForm.get("count").setValue(`${value}`);
      }



      
    }




    
   update_branches(){


    this.req_service.  getAllBranches().subscribe((res) =>{
 
             console.log(res);
             this.branches = res
 
 
    },
 
    (err)=>{
 
 
 
    }
    )
 
 
 
    }


    filerData(val) {
      if (val) {
        val = val.toLowerCase();
      } else {
        return this.filteredRequests = [...this.RequestData];
      }
  
      const columns = Object.keys(this.RequestData[0]);
      if (!columns.length) {
        return;
      }
  
      const rows = this.RequestData.filter(function(d) {
        for (let i = 0; i <= columns.length; i++) {
          const column = columns[i];
          // console.log(d[column]);
          if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
            return true;
          }
        }
      });
      this.filteredRequests = rows;
    }











}
