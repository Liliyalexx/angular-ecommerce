import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { MedShoppingFormService } from 'src/app/services/med-shopping-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  billingAddressStates: State[]=[];
  shippingAddressStates: State[]=[];

  countries: Country[]=[];
  states: State[] = [];



  constructor(private formBuilder: FormBuilder,
              private medShoppingFormService: MedShoppingFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })


    }
    );

    //populate states



    // this.medShoppingFormService.getStates().subscribe(
    //   (      data: State[]) => {
    //     console.log("Retrieved states: " + JSON.stringify(data));
    //     this.states = data;
    //   }
    // )

    //populate credit card months
    const startMonth: number = new Date().getMonth()+1;
    console.log("startMonth: " + startMonth);

    this.medShoppingFormService.getCreditCardMonths(startMonth).subscribe(
      ( data: number[]) => {
        console.log("Retrieved credit card months " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
 //populate credit card years

  // const startYear: number = new Date().getFullYear();
  // console.log("startYear: " + startYear);
  this.medShoppingFormService.getCreditCardYears().subscribe(
    ( data: number[])  => {
      console.log("Retrieved credit card year" + JSON.stringify(data));
      this.creditCardYears = data;
    }
  );
   //populate countries

   this.medShoppingFormService.getCountries().subscribe(
    (        data: Country[]) => {
      console.log("Retrieved countries: " + JSON.stringify(data)
      );
      this.countries = data;
    }
  );

  }

  copyShippingAddressToBillingAddress(event: Event) {
    const ischecked = (<HTMLInputElement>event.target).checked;

    if (ischecked) {
      this.checkoutFormGroup.controls.billingAddress
            .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
            this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();

    }

  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')?.value.email);
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    //if the current year equals the selected year, then start with current month

    let startMonth: number;

    if (currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
      }
      else {
        startMonth = 1;
      }

      this.medShoppingFormService.getCreditCardMonths(startMonth).subscribe(

        data => {
          console.log("Retrieved credit card months: " + JSON.stringify(data));
          this.creditCardMonths = data;
        }
      );
    }
}


