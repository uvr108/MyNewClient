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
  @Input() ref: string;
  @Input() back: string;
  @Input() seleccion: object = {};
  @Input() pad: any = null;

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
  param = '';

  constructor( private crudService: CrudService, private fb: FormBuilder ) { }

  get_param() {
    Object.entries(this.back).forEach(([k, v]) => {
      // console.log(`ingresar() mymodal : listForm.value : ${JSON.stringify(this.listForm.value)} k -> ${k}`);
      this.param = this.param + '/' + this.listForm.value[k];
    });
  }

  ingresar() {

    // console.log(`ingresar() my-modal : back ${JSON.stringify(this.back)}`);
    this.param = this.ref;
    if (this.back) {
        this.get_param();
     }

    // console.log(`ingresar() my-modal : param -> ${this.param} table -> ${this.table}`);
    // console.log(`ingresar() my-modal : listForm -> ${JSON.stringify(this.listForm.value)}`);

    this.crudService.agregar(this.listForm.value, this.table,  this.param).
     subscribe(() => {
                       // this.load();
                      this.limpiar();
                          } );
    this.limpiar();

   }

limpiar() {
  const dict = {};

  for (const [key, value] of Object.entries(this.lgroup)) {
    if (this.compon[key] === 'text') {
    dict[key] = null;
    }
  }
  // console.log(`limpiar() my-modal : dict -> ${JSON.stringify(dict)}`);
  this.listForm.patchValue(dict);

}

  editar() {

    const list = this.listForm.value;
    // alert(this.pad[0]);
    // console.log(`editar() my-modal list -> ${JSON.stringify(list)} id -> ${JSON.stringify(this.pad[0])}`);

    // if (this.back) { this.agrega_back(h); }

    this.crudService.
    update(this.pad[0].toString(), this.listForm.value, this.table).
    subscribe();

  }


  // borrar

  borrar() {
    // const list = this.listForm.value;
    // tslint:disable-next-line: no-string-literal
    // const id = list['id'];

    this.crudService.delete(this.pad[0].toString(), this.table).subscribe();

    // this.cerrar();
  }

  agrega_back(pad: any = null) {

    let i = 0;
    const dict = {};

    Object.entries(this.lgroup).forEach(([u, w]) => {
      dict[u] = pad[i];
      i++;
    });
    // console.log(dict);
    Object.entries(this.back).forEach(([k, v]) => {
      // console.log(`ngOnInit() xxx agrega_back : [k, v] -> ${k} ${v}`);
      if (pad == null) {
          this.lgroup[k] = [''];
          }
          else {
            // console.log(`[k, v] -> ${k} ${v}`);
            this.lgroup[k] = [dict[k]];
          }
    } );
    // console.log(`ngOnInit() agrega_back : lgroup -> ${JSON.stringify(this.lgroup)} pad -> ${pad}`);

  }


  ngOnInit(): void {

    const js = {};
    let i = 0;

    /*
    console.log(`ngOnInit() my-modal : table -> ${this.table}
    ref -> ${JSON.stringify(this.ref)} back -> ${JSON.stringify(this.back)} seleccion -> ${JSON.stringify(this.seleccion)}
    editTabla -> ${this.editTabla}`);
    */

    this.lgroup = this.Tablas[this.table].lgroup;
    this.compon = this.Tablas[this.table].compon;

    console.log(`ngOnInit() my-modal : pad : ${JSON.stringify(this.pad)}`);
    console.log(`ngOnInit() my-modal : ngOnInit() lgroup -> ${JSON.stringify(this.lgroup)}`);
    console.log(`ngOnInit() my-modal : ngOnInit() compon -> ${JSON.stringify(this.compon)}`);

    if (this.pad) {

        for (const [key, value] of Object.entries(this.compon)) {
          // console.log(`ngOnInit() my-modal : key -> ${key} value -> ${value}`);
          if (value === 'text') {
            js[key] = this.pad[i];
            // console.log(`ngOnInt() my-modal : key - > ${key}`);
            }
            else if (value === 'date') {
              js[key] = this.pad[i].substring(0, 10);
            }
          i++;
          }
        }
    // console.log(`ngOnInit() my-modal : back -> ${JSON.stringify(this.back)}`);
    // console.log(`ngOnInit() my-modal : lgroup -> ${JSON.stringify(this.lgroup)}`);
    // console.log(`ngOnInt() my-modal : js - > ${JSON.stringify(js)}`);

    if (this.back && this.editTabla) { this.agrega_back(this.pad); }
    this.listForm = this.fb.group(this.lgroup);
    /*
    if (this.param) {
         this.get_param();
     }

    this.total = this.padre.length;

    console.log(`onInit my-modal : padre -> ${JSON.stringify(this.padre)}`);
    */
    this.listForm.patchValue(js);

  }

  get_xxx() {
    /*
    let i = 0;
    const js = {};
    for (const [key, value] of Object.entries(this.compon)) {
      if (this.compon[key] === 'date') {
        js[key] = this.param[i].substring(0, 10);
      } else
      {
        js[key] = this.param[i];
      }
      console.log(`key -> ${key} param -> ${this.param[i]} js -> ${JSON.stringify(js)}`);
      i += 1;
    }
    // console.log(`ngOnInit() my-modal.ts : js -> ${JSON.stringify(js)}`);
    this.agrega_back([1, 1]);
    this.listForm.patchValue(js);
    */
  }

}
