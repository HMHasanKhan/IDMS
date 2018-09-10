import { Component, OnInit,ViewChild } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Web3Service } from '../shared/web3.service';
import { Router } from '@angular/router';
import value from '*.json';
@Component({
  selector: 'app-endorser-component',
  templateUrl: './endorser-component.component.html',
  styleUrls: ['./endorser-component.component.css']
})
export class EndorserComponentComponent implements OnInit {
  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  constructor(private web3Service: Web3Service, private router: Router) { }

// user variables
  Uname:string;
  Uemail:string;
  UDOB:string;
  Ucity:string;
  Ucountry:string;
  cid:number;
  rqr: string ;
  password: string;
  name:string;
  noAppliedList:number;
  List=[];
  getDataA(add: string, pw: string){
    
  this.web3Service.SimpleContract.deployed().then((instance)=> {
      this.rqr = add.toString();
      this.password = pw;
      
      console.log(add);
      return instance.getDetails.call(add,pw ,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
  }).then((result)=>{
      //console.log(result.logs[0]);
      console.log(result);

      if(result[0].toString()=="true")
      {
          alert("This is an User Account.. Redirecting to User Login Page");
          this.router.navigate(['/login']);
      }
      this.name = result[1].toString();
      if(this.name!=""){
          document.getElementById("Y").style.display="block";
          document.getElementById("X").style.display="none";
          document.getElementById("pageName").innerHTML = "Endorsement Area"
          
          //this.router.navigate(['/user-detail'],{queryParams:{address: this.rqr,passw:pw}});}
      }
          else{
          alert("Please Enter Correct Address and Password");
      }
      // this.output = result.toString();
      // this.typeOfUser = result[0].toString();
       this.name= result[1].toString();
       
       
      }).catch(e=>{
          alert("Please Enter Correct Address and Password");
      });

      this.web3Service.SimpleContract.deployed().then((instance) =>{
        return instance.getNumberofAppliedEndorsementCurrent.call({ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});

      }).then((result)=>{
        //console.log(result.toNumber());
        this.noAppliedList = result.toNumber();
        console.log(this.noAppliedList);

      }).catch((err)=>{
        alert("Some error here....");
      });

      

      for(let i=0; i<10;i++){

      this.web3Service.SimpleContract.deployed().then((instance)=>{
        return instance.getAllAppliedEndorsements.call(add, pw,i,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
        //return instance.getAllAppliedEndorsements.call(add, pw,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
      }).then((result)=>{
        console.log(result);
        let newName = {
          id:i,
          address:result[0].toString(),
          pw:result[1].toString()
       };
       this.List.push(newName);
       console.log(this.List);

       var tbody = document.getElementById("tbody");

       var tr = document.createElement("tr");

       var td = document.createElement("td");
       td.setAttribute("class","column1");
       var txt = document.createTextNode("\u00a0"+"\u00a0"+"\u00a0"+"\u00a0"+"\u00a0"+"\u00a0"+this.List[i].id);
       td.appendChild(txt);
       tr.appendChild(td);
       td.setAttribute("class","column1");

       var td1 = document.createElement("td");
       td1.setAttribute("class","column2");
       var txt1 = document.createTextNode(this.List[i].address);
       td1.appendChild(txt1);
       tr.appendChild(td1);
       td1.setAttribute("class","column2");

       tbody.appendChild(tr);


       
      }).catch((err)=>{
        //alert("Somethings not right!!..");
      });
      //console.log(this.List);

     
    }
    //}
    
      
    
    }
    getDatafromID(Cid:any){

      if(Cid > this.List.length-1){
        alert("Please Enter Correct Id");
      }
      else{
      console.log(Cid);
      console.log(this.List[Cid].address);
      console.log(this.List[Cid].pw);
      this.cid = Cid;
    
    this.web3Service.SimpleContract.deployed().then((instance)=>{
      return instance.getDetails.call(this.List[Cid].address,this.List[Cid].pw,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
    }).then((result)=>{
      console.log(result);
      this.Uname = result[1].toString();
      this.Uemail= result[2].toString();
      this.UDOB= result[3].toString();
      this.Ucity= result[4].toString();
      this.Ucountry= result[5].toString();

      document.getElementById("Z").style.display="block";
      
    });
  }


    }

    Verify(){
      this.web3Service.SimpleContract.deployed().then((instance)=>{
        return instance.EndorsementVerified(this.rqr, this.password, this.List[this.cid].address,this.cid,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414})
      }).then((result)=>{
        console.log(result);
        alert("Account Verified");
        this.getDataA(this.rqr,this.password);

      });
      
    }

    Reject(){
      this.web3Service.SimpleContract.deployed().then((instance)=>{
        return instance.EndorsementRejected(this.rqr, this.password, this.List[this.cid].address,this.cid,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414})
      }).then((result)=>{
        console.log(result);
        alert("Account Rejected");
        this.getDataA(this.rqr,this.password);

      });
      
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
  this.web3Service.SimpleContract.deployed().then((instance)=>{
    return instance.createEndorser("Endorsement Authority 1","123",{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
  }).then((result)=>{
    //console.log(result);
    console.log(result.logs[0].args.AllotedAddressEndorser);
  });



  }

}
