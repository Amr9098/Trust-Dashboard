import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { SearchService } from '../../../../services/search.service';
import { AuthService } from '../../../../services/auth.service';
import Echo from 'laravel-echo';
import { EchoRequestServiceService } from 'src/app/shared/services/echo-request-service.service';
import Pusher from "pusher-js"
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-header-sidebar-large',
  templateUrl: './header-sidebar-large.component.html',
  styleUrls: ['./header-sidebar-large.component.scss']
})
export class HeaderSidebarLargeComponent implements OnInit {

    notifications: any;
    user$;
    echo: Echo;
    count=0;
    show=true
    link='requests'
    constructor(
      private navService: NavigationService,
      public searchService: SearchService,
      private auth: AuthService,private echoService: EchoRequestServiceService, private notfication_serv :NotificationService

    ) {



    //  this.getSocketsId();




    }

    ngOnInit() {
      JSON.parse( localStorage.getItem( 'currentUser' ) )
     this.user$=       JSON.parse( localStorage.getItem( 'currentUser' ) );


    }

 










    //  notifyMe = (data) => {
    //   if (!window.Notification) {
    //     console.log('Browser does not support notifications.')
    //   } else {
    //     // check if permission is already granted
    //     if (Notification.permission === 'granted') {
    //       let audio: HTMLAudioElement = new Audio('../../../../../../assets/images/excuseme_boss.mp3');
    //       audio.play();
    //       //console.log(data.response.status);
    //       if (data.response.status ==='finished'){


    //         const notify = new Notification('Hi there!', {
    //           body: `your request for adding riders has been finished successfully `,
    //           icon: 'https://bit.ly/2DYqRrh'
    //         })

    //       }

    //       if (data.response.status ==='pending'){


    //         const notify = new Notification('Hi there!', {
    //           body: `congratulation your request for adding riders has been accepted`,
    //           icon: 'https://bit.ly/2DYqRrh'
    //         })


    //       }







    //     } else {
    //       // request permission from the user
    //       Notification.requestPermission()
    //         .then(function (p) {
    //           if (p === 'granted') {





    //             // show notification here

    //             if (data.response.status ==='finished'){


    //               const notify = new Notification('Hi there!', {
    //                 body: `your request for adding riders has been finished successfully `,
    //                 icon: 'https://bit.ly/2DYqRrh'
    //               })

    //             }

    //             if (data.response.status ==='pending'){


    //               const notify = new Notification('Hi there!', {
    //                 body: `congratulation your request for adding riders has been accepted`,
    //                 icon: 'https://bit.ly/2DYqRrh'
    //               })

    //             }

    //           } else {
    //             console.log('User has blocked notifications.')
    //           }
    //         })
    //         .catch(function (err) {
    //           console.error(err)
    //         })
    //     }
    //   }
    // }


        // get_notifications(){


        //     this.notfication_serv.getAllRequestsNotifications().subscribe((response:any)=> {

        //  this.notifications=response.data
        //   this.count=response.count


        //     },(err)=>{})




        // }









    toggelSidebar() {
      const state = this.navService.sidebarState;
      if (state.childnavOpen && state.sidenavOpen) {
        return state.childnavOpen = false;
      }
      if (!state.childnavOpen && state.sidenavOpen) {
        return state.sidenavOpen = false;
      }
      // item has child items
      if (!state.sidenavOpen && !state.childnavOpen
        && this.navService.selectedItem.type === 'dropDown') {
          state.sidenavOpen = true;
          setTimeout(() => {
              state.childnavOpen = true;
          }, 50);
      }
      // item has no child items
      if (!state.sidenavOpen && !state.childnavOpen) {
        state.sidenavOpen = true;
      }
    }


    display(){
  this.show=!this.show



    }

    // empty_notifcation(){

    //      if (this.count !=0){
    //   this.notfication_serv.EmptyNotifications().subscribe(data => {

    //     // console.log(data);
    //     this.count=0;


    //   },error => {})}


    // }









    signout() {
      this.auth.signout();
    }

}
