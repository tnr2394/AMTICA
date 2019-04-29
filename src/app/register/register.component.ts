import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { SweetalertService } from '../service/sweetalert.service';
import { Router } from '@angular/router';
import { ReCaptchaComponent } from 'angular2-recaptcha';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	signupForm: FormGroup;
	City=[];
	allCity;
	state:string;
	country:string;
	selectedCity;
	allCountries;
	Countries=[];
	cityId;
	@ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
	public loading = false;
	selectedCountry={country:''};
	flag:boolean=false;
	newCity:string;
	newState:string;
	city;
	constructor(private userSer: UserService, private sweetAlertSer: SweetalertService,
		private router: Router) {
		this.createSignUpForm();
	}

	ngOnInit() {
		
	}

	handleCorrectCaptcha(event){
		// console.log("Captcha response",event);
		// console.log(this.signupForm);
		this.signupForm.controls.captchacode=event;
	}

	createSignUpForm(){
		this.signupForm = new FormGroup({
			firstName: new FormControl("", Validators.required),
			lastName : new FormControl("", Validators.required),
			address : new FormControl("", Validators.required),
			postalCode : new FormControl("", Validators.required),
			city : new FormControl("", Validators.required),
			state : new FormControl("", Validators.required),
			country : new FormControl("", Validators.required),
			email : new FormControl("", Validators.email),
			phone : new FormControl("", Validators.required),
			mobile : new FormControl("", Validators.required),
			company : new FormControl("", Validators.required),
			password : new FormControl("", Validators.required),
			cpassword : new FormControl("", Validators.required),
			admin : new FormControl(""),
			captchacode : new FormControl("",Validators.required)
		});
	}

	checkConfirmPassword(){
		if((document.getElementById('password') as HTMLInputElement).value !== (document.getElementById('cpassword') as HTMLInputElement).value){
			(document.getElementById('cpassword') as HTMLInputElement).value = "";
			this.sweetAlertSer.sweetAlertWrongPassword();
		}
	}


	userSingUp(signupForm){
		delete signupForm.cpassword;
		signupForm['userStatus'] = 'false';
		let token = this.captcha.getResponse();
		signupForm['captchacode']=token;
		signupForm['country'] = this.selectedCountry['country'];
		signupForm['city'] = this.cityId;
		console.log("User Data", signupForm);
		this.loading = true;
		this.userSer
		.signUp(signupForm)
		.subscribe((data:any) =>{
			this.sweetAlertSer.sweetAlert('Registered Successfully!');
			localStorage.setItem("signedupUser", JSON.stringify(data));
			this.router.navigate(['/signup/authentication/', data._id]);
			this.loading = false;
		},err=>{
			this.sweetAlertSer.sweetAlertError();
			this.loading = false;
		})
	}

	addCity(){
		this.flag = true;
	}

	cancle(){
		this.flag = false;
		this.newCity="";
		this.newState="";
	}
}

