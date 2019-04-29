import { Injectable } from '@angular/core';
import { UtilityService } from '../utility.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class UserService {
	url;
	constructor(private utilitySer: UtilityService,
		private http: HttpClient) {
		this.url = utilitySer.getServerUrl();
		console.log(this.url);

	}

	getAccessToken(){
		let headers = new HttpHeaders();
		let token = JSON.parse(localStorage.token); // your custom token getter function here
		console.log("token", token);

		headers.append('x-access-token', token);
		return headers;
	}

	signUp(user){
		return this.http
		.post(this.url+"user/", user)

	}

	login(user){
		console.log(user);
		return this.http
		.post(this.url+"user/login/", user)

	}

	fbLogin(user){
		console.log(user);
		return this.http
		.post(this.url+"user/fbLogin/", user)

	}


	getAvailability(id){
		return this.http
		.get(this.url+"user/checkAvailability/"+id)

	}

	getUsers(){
		let auth = this.getAccessToken();
		return this.http
		.get(this.url+"user/full-information/users",{headers: auth})

	}

	getUser(id){
		let auth = this.getAccessToken();
		return this.http
		.get(this.url+"user/single-information/"+id,{headers: auth})

	}

	updateUser(user){
		let auth = this.getAccessToken();

		return this.http
		.put(this.url+"user/", user,{headers: auth})

	}

	verifyUser(user){
		console.log(user);
		return this.http
		.post(this.url+"user/userVerification", user)

	}

	getNewVerificationCode(user){
		console.log(user);
		return this.http
		.post(this.url+"user/newCodeGenerate", user)

	}

	changePassword(user){
		return this.http.post(this.url+"user/password-change",user)

	}

	contactUs(inquery){
		return this.http.post(this.url+"admin/contactUs", inquery)

	}

	getWorldCountries(){
		return this.http.get(this.url+"country/world-countries")

	}

	getCountryWiseWorldCities(id){
		return this.http.post(this.url+"city/world-cities-by-country",id)

	}

	getEnteredCity(name){
		return this.http
		.get(this.url+"city/world-city/"+name)
	}

	updateCity(city){
		return this.http.put(this.url+"city/world-city",city)
	}

	addNewCity(city){
		return this.http.post(this.url+"city/world-city",city)
	}
}