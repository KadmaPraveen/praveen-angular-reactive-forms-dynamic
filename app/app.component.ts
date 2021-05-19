import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  genders=['male','female'];
  SignupForm:FormGroup;
  forbiddenUserNames=['geetha','puja'];

  balRoundings = [
        { text: 'No Rounding', value: null },
        { text: '0.01', value: 0.01 },
        { text: '0.02', value: 0.02 },
        { text: '0.05', value: 0.05 },
        { text: '0.10', value: 0.10 },
        { text: '0.20', value: 0.20 },
        { text: '0.50', value: 0.50 },
        { text: '1.00', value: 1.00 }
];

  ngOnInit(){
    this.SignupForm = new FormGroup({      
      'balanceRounding': new FormControl(+0)
    }); 

  }

  onSubmit(){
    console.log(this.SignupForm);
  }

  onAddHobby(){

    const control=new FormControl(null,Validators.required);
    (<FormArray>this.SignupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl):{[s: string]: boolean}
  {
    if(this.forbiddenUserNames.indexOf(control.value)!=-1)
    {
      return {'nameisForbidden':true};
    }

    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any>|Observable<any>
  {
    const promise= new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='test@test.com')
        {
          resolve({'emailIsForbidden':true});
        }
        else{
               resolve(null);
        }
       
      },1500);
    });
    return promise;
  }
}


// angular form is group of controls
