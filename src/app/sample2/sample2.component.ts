import { Component, OnInit,ViewChild } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Web3Service } from '../shared/web3.service';
import { Router } from '@angular/router';

//import {QrScannerComponent} from 'angular2-qrscanner';
@Component({
  selector: 'app-sample2',
  templateUrl: './sample2.component.html',
  styleUrls: ['./sample2.component.css']
})
export class Sample2Component implements OnInit {

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;
  
  constructor(private web3Service:Web3Service, private router:Router) { }
  rqr:any;
  name:string;
  name1:string;
  numberOfEndorsements:number;

  login(add:string, pw:string){

    this.web3Service.SimpleContract.deployed().then((instance)=>{
      return instance.getNumberofEndorsementOfUser1.call(add, { from: this.web3Service.web3.eth.accounts[0], gas: 4472414});

  }).then((result)=>{
      //this.numberOfEndorsements = result[0];
      console.log(result.toNumber());
      
      //n = result.toNumber();
      this.numberOfEndorsements= result.toNumber();
      console.log(this.numberOfEndorsements);

  });

  if(this.numberOfEndorsements<2 || this.numberOfEndorsements == null){

    alert("The Endorsments are Not Enough to Login.");
    document.getElementById("Z").style.display="block";
  }
  else{
    console.log(this.numberOfEndorsements);
  


 
      this.web3Service.SimpleContract.deployed().then((instance)=>{
      return instance.getDetails.call(add,pw ,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
    }).then((result)=>{
      console.log(result);

      this.name1 = result[1].toString();
      document.getElementById("X").style.display="none";
      document.getElementById("Y").style.display="block";
      document.getElementById("Z").style.display="block";

    });

  }


  }
  back(){
      this.router.navigate(['/demo']);
  }

  ngOnInit() {

    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
                  choosenDev = dev;
                  break;
              }
          }
          if (choosenDev) {
              this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
      }
  //     this.web3Service.SimpleContract.deployed().then((instance)=>{
  //         return instance.createEndorser("TestEndorser","123",{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
  //     }).then((result)=>{
  //         console.log(result.logs[0].args.AllotedAddressEndorser);

  //     });
      
   });

  this.qrScannerComponent.capturedQr.subscribe(result => {
      this.rqr = result;
      console.log(this.rqr);
      var inputElement = <HTMLInputElement>document.getElementById("add");
      inputElement.value = this.rqr;
     

  
     
  });




  }

}
