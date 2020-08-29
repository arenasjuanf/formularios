import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;


  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {
    this.initForm();
    this.crearListeners();
  }

  initForm(){
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noArenas] ],
      correo: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario: ['', , this.validadores.existeusuario],
      direccion : this.fb.group({
        distrito: ['',Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    });
  }

  crearListeners(){
    this.form.valueChanges.subscribe((cambios) =>{
      //console.log('cambio');
    });

    this.form.statusChanges.subscribe((estado) => {
      console.log('Cambio estado ', estado);
    })
  }

  ngOnInit(): void {
  }

  campoNoValido(campo){
    // tslint:disable-next-line: max-line-length
    const resp = this.form.get(campo).invalid && this.form.get(campo).touched;
    return resp;
  }


  guardar(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
    }
  }

  loadData(){
    this.form.setValue({
      nombre: 'Leydy Yessenya',
      apellido: 'Cardona Cardenas',
      correo: 'leydy@gmail.com',
      direccion: {
        distrito: 'hola',
        ciudad: 'pereira'
      }
    });
  }

  resetForm(){
    this.form.reset();
  }

  borrar(pos){
    let x = this.form.get('pasatiempos') as FormArray;
    x.removeAt(pos);
  }

  agregarPasatiempos(){
    const x = this.form.get('pasatiempos') as FormArray;
    x.push(this.fb.control([], Validators.required));
  }

}
