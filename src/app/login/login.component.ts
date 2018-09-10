import { Component, OnInit,ViewChild } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Web3Service } from '../shared/web3.service';
import { Router } from '@angular/router';
import value from '*.json';


function hexToString (hex) {
	var string = '';
	for (var i = 0; i < hex.length; i += 2) {
	  string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return string;
  }
  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  constructor(private web3Service: Web3Service, private router: Router) { }

  rqr: string ;
  password: string;
  output: any;
  name:string;
  email:string;
  DOB:string;
  gender:string;
  nid:string;
  typeOfUser:any;   
  dataCorect: boolean;
  numberOfEndorsements:number;
  Eadd:any;
  Ename:string;
  EVerification:string;
  AppliedStatus:boolean;


  
  

  getDataA(add: string, pw: string){
    var Elist=[];

      this.dataCorect=false;
    this.web3Service.SimpleContract.deployed().then((instance)=> {
        this.rqr = add.toString();
        this.password = pw;
        
        console.log(add);
        return instance.getDetails.call(add,pw ,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
    }).then((result)=>{
        //console.log(result.logs[0]);
        console.log(result);

        if(result[0].toString()=="false")
        {
            alert("This is an Endorser Account.. Redirecting to Endorser Login Page");
            this.router.navigate(['/endorser-component']);
        }
        this.name = result[1].toString();
        if(this.name!=""){
            document.getElementById("Y").style.display="block";
            document.getElementById("X").style.display="none";
            document.getElementById("pageName").innerHTML = "User Details"
            
            //this.router.navigate(['/user-detail'],{queryParams:{address: this.rqr,passw:pw}});}
        }
            else{
            alert("Please Enter Correct Address and Password");
        }
        // this.output = result.toString();
        // this.typeOfUser = result[0].toString();
         this.name= result[1].toString();
         this.email= result[2].toString();
         this.DOB= result[3].toString();
         this.gender= result[4].toString();
         this.nid= result[5].toString();
         this.AppliedStatus = result[6];
         
        }).catch(e=>{
            alert("Please Enter Correct Address and Password");
        });
        //if(this.dataCorect)
        //this.router.navigate(['/user-detail'], {queryParams:{add: this.rqr,pw:pw} });
    
    this.web3Service.SimpleContract.deployed().then((instance)=>{
        return instance.getNumberofEndorsementOfUser1.call(add, { from: this.web3Service.web3.eth.accounts[0], gas: 4472414});

    }).then((result)=>{
        //this.numberOfEndorsements = result[0];
        console.log(result.toNumber());
        
        //n = result.toNumber();
        this.numberOfEndorsements= result.toNumber();

    });
    // this.web3Service.SimpleContract.deployed().then((instance)=>{
        
    //     return instance.getEndorserFromUser.call(add,pw,"0",{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
    // }).then((result)=>{
    //     console.log(result);
    //     this.Eadd = result[0].toString();
    //     this.Ename = result[1].toString();
    //     this.EVerification = result[2].toString();

        
    // });
    // this.web3Service.SimpleContract.deployed().then((instance)=>{
        
    //     return instance.getEndorserFromUser.call(add,pw,"1",{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
    // }).then((result)=>{
    //     console.log(result);
    //     this.Eadd = result[0].toString();
    //     this.Ename = result[1].toString();
    //     this.EVerification = result[2].toString();

        
    // });
    for(let i=0;i<5;i++){
        this.web3Service.SimpleContract.deployed().then((instance)=>{
        
            return instance.getEndorserFromUser.call(add,pw,i,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
        }).then((result)=>{
            console.log(result);
            // this.Eadd = result[0].toString();
            // this.Ename = result[1].toString();
            // this.EVerification = result[2].toString();
            let newName = {
                Address:result[0].toString(),
                Name:result[1].toString(),
                Verification:result[2].toString()
             };
             Elist.push(newName);
             console.log(Elist);


             var tbody = document.getElementById("tbody");

             var tr = document.createElement("tr");
             tr.className="table100-head";
      
             var td = document.createElement("td");
             td.className="column1";
             td.setAttribute("class","column1");
             var txt = document.createTextNode("\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+Elist[i].Address);
             td.appendChild(txt);
             tr.appendChild(td);
             td.setAttribute("class","column1");
      
             var td1 = document.createElement("td");
             td1.setAttribute("class","column2");
             var txt1 = document.createTextNode("\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+Elist[i].Name);
             td1.appendChild(txt1);
             tr.appendChild(td1);
             td1.setAttribute("class","column2");

             var td2 = document.createElement("td");
             td2.setAttribute("class","column2");
             var txt2 = document.createTextNode("\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+"\u00A0"+Elist[i].Verification);
             td1.appendChild(txt2);
             tr.appendChild(td2);
             td2.setAttribute("class","column2");
      
             tbody.appendChild(tr);

            
    
            
        }).catch((err)=>{

        });
    }


    if(this.AppliedStatus == true){
        //var a =<HTMLInputElement> document.getElementById("endbtn");
        //document.getElementById("endbtn").disabled = "true";
        document.getElementById("endbtn").style.display="none";
    }
    
    }
    logout(){
        this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

        let currentUrl = this.router.url + '?';
      
        this.router.navigateByUrl(currentUrl)
          .then(() => {
            this.router.navigated = false;
            this.router.navigate([this.router.url]);
          });
        }
    
    



Apply(){
    var b=0;
    //var pw = prompt("Enter Password","123");
    if(this.AppliedStatus == true){
        alert("You have already Applied for Endorsement. It will soon be Endorsed.");
        b=1;
    }
    
    if(b==0){
    this.web3Service.SimpleContract.deployed().then((instance)=>{
        instance.applyForEndorsemntMain(this.rqr,this.password,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
        
    }).then((result)=>{
        console.log(result);
        this.AppliedStatus == true;
        alert("You have Applieed for Endorsement. It will soon be Endorsed.");
        this.getDataA(this.rqr,this.password);
    });
    
}
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
