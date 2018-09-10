import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../shared/web3.service';
function hexToString (hex) {
	var string = '';
	for (var i = 0; i < hex.length; i += 2) {
	  string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return string;
  }

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  Aqr:string;
	
	// //gid: number;
	output: any;
	// name: string;
	// age: number;
	// pAddress:string;
	// ad: string;
	
	constructor(private web3Service: Web3Service) { }
	

	

	createAccount(name: string, pw: string, email: string, DOB:string,gender:string,nid:string,pw1:string){

		if(name=="" || pw == "" || gender==""){
			alert("Please Enter Required Details");
		}
		else if(pw != pw1){
			alert("Passwords donot match.")
		}
		else if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
			alert("Please enter a valid email address");
		
		}
		else if( !(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/.test(DOB))){
			alert("Please enter date in the format dd/mm/yyyy");
		}
		else if(gender =="none"){
			alert("Please Select a Gender");
		}
		else if(nid==""){
			alert("Please Enter Your National Identity Number");
		}
		else{
		console.log(gender);
		console.log(nid);
		this.web3Service.SimpleContract.deployed().then((instance) => {
			
			return instance.createUserAccount(name,pw,gender, nid,email, DOB ,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
		}).then((result)=>{
			
      this.Aqr = result.logs[0].args.AllotedAddress;// 
      console.log(this.Aqr);
      document.getElementById("insert").innerHTML = this.Aqr;
		});

		


		document.getElementById("qr").style.visibility="visible";
		document.getElementById("AA").style.visibility="visible";
		//document.getElementById("su").style.visibility="hidden";
		document.getElementById("X").style.display = "none";
    
		}
	}

  ngOnInit() {
  }

}
