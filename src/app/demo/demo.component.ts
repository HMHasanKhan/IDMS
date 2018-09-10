import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  sample1(){
    this.router.navigate(['/sample1']);

  }
  sample2(){
    this.router.navigate(['/sample2']);

  }

}
