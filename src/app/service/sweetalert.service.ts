import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class SweetalertService {

	constructor() { }

	sweetAlert(entity){
		swal({
			position: 'center',
			type: 'success',
			title: entity,
			showConfirmButton: true,
			timer: 3000
		})
	}

	sweetAlertError(){
		swal({
			type: 'error',
			title: 'Error!',
			text: 'Something went wrong! Please try again later'
		})
	}

	sweetAlertWrongPassword(){
		swal({
			type: 'error',
			title: 'Error!',
			text: 'Entered Password & Confirm Password does not match',
			showConfirmButton: false,
			timer: 3000
		})
	}

	authorizationError(){
		swal({
			type: 'error',
			title: 'Error!',
			text: 'You are not authorized to acces this page!'
		})
	}
}
