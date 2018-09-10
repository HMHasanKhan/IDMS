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
  selector: 'app-simple-component',
  templateUrl: './simple-component.component.html',
  styleUrls: ['./simple-component.component.css']
})

export class SimpleComponentComponent {

	
	
	Aqr= 'Eror';
	
	// //gid: number;
	output: any;
	// name: string;
	// age: number;
	// pAddress:string;
	// ad: string;
	
	constructor(private web3Service: Web3Service) { }
	

	

	createWallet(name: string, age: number, pAddess: string){
		
		this.web3Service.SimpleContract.deployed().then((instance) => {
			// var name;
			// name = document.getElementById("name").innerHTML;
			// var age = document.getElementById("age").innerHTML;
			// var pAddess = document.getElementById("pAddress").innerText;

			console.log(name);
			console.log(pAddess);

			return instance.createWallet(name,age, pAddess ,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
		}).then((result)=>{
			
			console.log(result.logs[0].args.AllotedAddress);// 
		});
		document.getElementById("qr").style.visibility="hidden"
		}

		getDataA(add: string){
			this.web3Service.SimpleContract.deployed().then((instance)=> {
				//var add = document.getElementById("add").in;
				console.log(add);
				return instance.getData.call(add ,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
			}).then((result)=>{
				//console.log(result.logs[0]);
				console.log(hexToString(result[0]));
				console.log(hexToString(result[1]));
				console.log(hexToString(result[2]));

      
      			
				
			})
		}
		
	

	// setDATA() {
	// 	this.web3Service.SimpleContract.deployed().then((instance) => {
	// 		const id = this.id;
	// 		const name = this.data;
	// 		const account = this.web3Service.web3.eth.accounts[0];
	// 		instance.setData(id, name, {from: account, gas: 500000});
	// 		return instance.getData(id);
	// 	}).then((result) => {
	// 		this.output = result;
	// 	});
	// }
	// getDATA() {
	// 	this.web3Service.SimpleContract.deployed().then((instance) => {
	// 		const gid = this.gid;
	// 		return  instance.getData(gid);
	// 	}).then((result) => {
	// 		this.output = result;
	// 	});
	// }

	//  nameGet(e) {
	// 	this.name = e.target.value;
	// }
	// ageGet(e) {
	// 	this.age = e.target.value;
	// }
	// pAddressGet(e){
	// 	this.pAddress=e.target.value;
	// }


	// adGet(e) {
	// 	this.ad = e.target.value;
	// }

}
