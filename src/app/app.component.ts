import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  customStripeForm: FormGroup;
  formProcess: boolean;
  submitted: boolean;
  message: string;

  stripe = {
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  };
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
   this.customStripeForm = this.fb.group({

    });
  }
  ngOnInit(): void {
  }
pay(form: NgForm) {
  this.formProcess = true;
  ( window as any).Stripe.setPublishableKey('pk_test_U9HUhT2na07Jb0ZRMddUhbaY00xs1arrv2');
  ( window as any).Stripe.card.createToken({
    number: form.value.cardNumber,
    exp_month: form.value.expMonth,
    exp_year: form.value.expYear,
    cvc: form.value.cvc
  }, (status: number, response: any) => {
    this.formProcess = false;
    if (status === 200) {
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.toastr.success(`Success! Card token ${response.card.id}.`);
      this.message = `Success! Card token ${response.card.id}.`;
    } else {
      this.toastr.error(response.error.message);
      this.message = response.error.message ;
    }
  });
}
}
