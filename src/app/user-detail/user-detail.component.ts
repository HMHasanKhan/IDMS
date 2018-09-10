import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {Web3Service} from '../shared/web3.service'
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private router: Router,private web3Service: Web3Service, private route: ActivatedRoute) { }
  add: any;
  password: string;

  ngOnInit() {
    this.add=this.route.snapshot.queryParams["address"];
    this.password = this.route.snapshot.queryParams["passw"];
  }

}
