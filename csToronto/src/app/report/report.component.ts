import { Component, OnInit, OnChanges } from '@angular/core';
import { GeocodingService } from '../geocoding.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  lat = 43.65;
  lng = -79.38;
  mapAddress: any;
  locationChosen = false;
  // data-model
  report = {
    address: '',
    problems: [
      {name: 'Utility Failures', selected: false, id: 1},
      {name: 'Tree Collapse', selected: false, id: 2},
      {name: 'Potholes', selected: false, id: 3},
      {name: 'Flooded Streets', selected: false, id: 4},
      {name: 'Eroded Streets', selected: false, id: 5},
      {name: 'Garbage/Road blocking Objects', selected: false, id: 6},
      {name: 'City Property Vandalism', selected: false, id: 7},
      {name: 'Mould and Spore Growth', selected: false, id: 8}
    ]
  };

  reportForm: FormGroup;
 /* formErrors: {
    address: '',
    problems: ''
  };
  validationMessages = {
    address: {
      required: 'address is required.',
      minlength: 'address must be 10 characters.'
    },
    problems: {
      required: 'Atleast a problem should be checked.'
    }
  };*/

  constructor(private _geocodingService: GeocodingService,
              private _authService: AuthService,
              private _router: Router,
              private _fb: FormBuilder ) { } // <--- injecting FormBuilder and others in constructor

  ngOnInit() {
    // build data model for our form
    this.buildForm();
  }

  // form-model
  // using formbuilder to build model-driven/reactive form
  buildForm() {
    this.reportForm = this._fb.group({
      address: '', // <--- the FormControl called "address"
      problems: this.buildProblems() // assigning predefined list of problems
    });

    // watch for changes and validate: valueChanges is observable
    // this.reportForm.valueChanges.subscribe( data => {
    // console.log(data);
    // this.validateForm();
    console.log(this.reportForm);
  }

  // reference to problems; getting the list of problems from the form.
  get problems(): FormArray {
    return this.reportForm.get('problems') as FormArray;
  }

  // returns an array of problems from the predietermined problem list in the report class/above.
  buildProblems() {
    const arr = this.report.problems.map( problemList => {
      // console.log(problemList);
      return this._fb.control(problemList.selected); // returning only the value of @param: selected.
      /* return this._fb.group({
          name: [problemList.name],
          selected: [problemList.selected]
       });
       */
    });
    return this._fb.array(arr);
  }

  clickedLocation(event) {
    // coords of the clickedLocation is passed with event object.
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    // retriving address from the latitude and longitude
    this._geocodingService.getAddFromLatLng(this.lat, this.lng)
                          .subscribe(response => {
                            if (response.status === 'OK') {
                              this.mapAddress = response.results[0].formatted_address;
                              // console.log(this.mapAddress);
                              this.reportForm.patchValue({
                                address: this.mapAddress
                              });
                            }
                          });
  }

  // if the checkbox is checked or not
  submit(value) {
    console.log(value);
    const formValue = Object.assign({}, value, {
        problems: value.problems.map( (element, index, array) => {
          // console.log(element);
          // console.log(index);
          // returns the name of the checked problem.
          if (element === true) {
            return this.report.problems[index].name;
            /*{
            id: this.report.problems[index].id,
            name: this.report.problems[index].name,
            selected: element,
            };*/
          }
          /*const problemList = new Array;
          s.array.forEach(element => {
            if (element === true) {
              const i = 0;
              problemList.push(this.report.problems[i].name);
            }
          }); */
        //  console.log(len);
        // return problemList;
        })
    });
    console.log(formValue);
   // this.reportForm = this.prepareSaveReport();
    this._authService.registerReport(formValue)
                   .subscribe(res => {
                          console.log(res);
                          // this.reportForm.reset();
                          this._router.navigate(['/report']);
                        });
  }

  // validates the form
 /* validateForm() {
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear that input field errors
        this.formErrors[field] = '';

        // grab an input field by address
        const input = this.reportForm.get(field);

        if (input.invalid && input.dirty) {
          // figure out the type of error
          // loop over the formErrors field names
          for ( const error in input.errors) {
            if (input.errors.hasOwnProperty(error)) {
              // assign that type of errors message to a variable
              this.formErrors[field] = this.validationMessages[field][error];
            }
          }
        }
      }
    }
  }*/

  // refernce to the problems
  /*get problems(): FormArray {
    return this.reportForm.get('problems') as FormArray;
  }*/

  /*problemList() {
    const arr = this.report.problems.map(
              data => { return this._fb.control(data.selected);
      // return this.fb.group({
      // selected: [data.selected],
      // id: [data.id]
      // }
    });
    return this._fb.array(arr);
  }*/



 /* onItemChange(event, value) {
    console.log('item changed', value);
    this.changeLog.push('item changed, value is: ' + value);
  }*/

  // TODO: Remove this when we're done
  // Added a diagnostic property to return a JSON representation of the model. It'll help to
  // see what you're doing during development; you've left yourself a cleanup note to discard it later.
  // get diagnostic() { return JSON.stringify(this.model); }
}
