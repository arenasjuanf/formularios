import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    email: ''
  }

  paises : any[] = [];

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(result => {
      this.paises = result;
      this.paises.unshift({
        nombre: '[seleccione un país]',
        codigo: ''
      });
    });
  }

  guardar(form: NgForm){
    if(form.valid){
      console.log(form);
    }
  }

}
