import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noArenas(control: FormControl): { [s:string]: boolean }{

    if(control.value?.toLowerCase() === 'arenas'){
      return {
        noArenas: true
      }
    }

    return null;
  }

  PasswordIguales(p1: string, p2: string){
    return (formGroup: FormGroup) => {
      const c1 = formGroup.get(p1);
      const c2 = formGroup.get(p2);
      if(c1.value === c2.value){
        c2.setErrors(null);
      }else{
        c2.setErrors({noEsIgual: true});
      }
    }
  }

  existeusuario(control: FormControl): Promise<any> | Observable<any> {

    if(!control.value){
      return Promise.resolve(null);
    }

    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        if (control.value?.toLowerCase() === 'arenas.juanf') {
          resolve({ exists: true })
        } else {
          resolve(null)
        }
      }, 3500);
    });
  }
}
