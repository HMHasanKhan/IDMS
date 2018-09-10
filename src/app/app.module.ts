import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { AppComponent } from './app.component';
import { Web3Service } from './shared/web3.service';
import { SimpleComponentComponent } from './simple-component/simple-component.component';
import { ZxingScannerComponent } from './zxing-scanner/zxing-scanner.component';
import { QRCodeModule } from 'angular2-qrcode';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { OwlModule } from 'angular-owl-carousel';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {Routes, RouterModule} from '@angular/router';
import { CRYPT_CONFIG_PROVIDER, CryptConfigProvider, EncryptionService } from 'angular-encryption-service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EndorserComponentComponent } from './endorser-component/endorser-component.component';
import { DemoComponent } from './demo/demo.component';
import { Sample1Component } from './sample1/sample1.component';
import { Sample2Component } from './sample2/sample2.component';
const appRputes: Routes =[
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent },
  {path: 'signup', component: SignupComponent},
  {path: 'user-detail', component: UserDetailComponent},
  {path: 'endorser-component', component: EndorserComponentComponent},
  {path: 'demo', component:DemoComponent},
  {path: 'sample1',component:Sample1Component},
  {path: 'sample2',component:Sample2Component}

]


@NgModule({
  declarations: [
	AppComponent,
	SimpleComponentComponent,
  ZxingScannerComponent,
  
  AppComponent,
  HeaderComponent,
  BodyComponent,
  HomeComponent,
  LoginComponent,
  SignupComponent,
  UserDetailComponent,
  EndorserComponentComponent,
  DemoComponent,
  Sample1Component,
  Sample2Component,

	
  ],


  imports: [
    BrowserModule,
    FormsModule,
    NgQrScannerModule,
    QRCodeModule,
    HttpModule,
    BrowserModule,
    // OwlModule,
    
    RouterModule.forRoot(appRputes)


  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
