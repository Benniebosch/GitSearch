import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../auth/auth.service';
import { AuthenticationService } from '../authentication.service';
//import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(public authService: AuthenticationService) { 
    //authService.isLoggedIn
     }

  ngOnInit() {
  }

}
