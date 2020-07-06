import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { TABLAS } from './../../tablas';


@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {

  @Input() editTabla: boolean;
  @Input() table: string;
  @Input() param: string;
  @Input() back: string;
  @Input() seleccion: object = {};

  Tablas = TABLAS;

  compon: Array<string>;
  flag = true;
  listForm: FormGroup;
  lgroup: Array<string>;
  padre = [];
  cabecera = [];
  total = 0;
  mostra: false;
  componentRef: any;

  constructor( private crudService: CrudService, private fb: FormBuilder ) { }



  ingresar() {
    // alert('Hola');
    if (this.back) {
     Object.entries(this.back).forEach(([k, v]) => {
       // console.log(`onSubmit() : Details -> listForm.value : ${this.listForm.value} k -> ${k}`);
       this.param = this.param + '/' + this.listForm.value[k].toString();
     });
     }
    // console.log(`onSubmit() : my-modal -> ref : ${this.param} table -> ${this.table}`);
    // console.log(`onSubmit() : my-modal -> listForm -> ${JSON.stringify(this.listForm.value)}`);


    this.crudService.agregar(this.listForm.value, this.table,  this.param).
     subscribe(() => {
                       // this.load();
                      this.limpiar();
                          } );

   }

limpiar() {
  const dict = {};

  for (const [key, value] of Object.entries(this.lgroup)) { dict[key] = null; }

  this.listForm.patchValue(dict);
}

  editar() {
    const list = this.listForm.value;
    const id = list.id;
    // console.log(`editar() my-modal list -> ${JSON.stringify(list)} id -> ${id}`);

    this.crudService.
    update(id, this.listForm.value, this.table).
    subscribe();
  }


  // borrar

  borrar() {
    const list = this.listForm.value;
    // tslint:disable-next-line: no-string-literal
    const id = list['id'];

    this.crudService.delete(id, this.table).subscribe();

    // this.cerrar();
  }

  ngOnInit(): void {

    console.log(`ngOnInit() my-modal : table -> ${this.table}
    param -> ${JSON.stringify(this.param)}
    editTabla -> ${this.editTabla}`);

    this.lgroup = this.Tablas[this.table].lgroup;
    this.compon = this.Tablas[this.table].compon;

    // console.log(`ngOnInit() presupuesto compon -> ${JSON.stringify(this.compon)}`);
    this.listForm = this.fb.group(this.lgroup);

    if (this.param) {

      let i = 0;
      const js = {};
      for (const [key, value] of Object.entries(this.compon)) {
        js[key] = this.param[i];
        // console.log(key, this.param[i], js);
        i += 1;
      }
      console.log(`ngOnInit() my-modal.ts : js -> ${JSON.stringify(js)}`);
      this.listForm.patchValue(js);
    }

    this.total = this.padre.length;
  }

}
