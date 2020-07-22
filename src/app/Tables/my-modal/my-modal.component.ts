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

    console.log(`ingresar() my-modal : param -> ${this.param} table -> ${this.table}`);
    console.log(`ingresar() my-modal : listForm -> ${JSON.stringify(this.listForm.value)}`);

    /*
    this.crudService.agregar(this.listForm.value, this.table,  this.param).
     subscribe(() => {
                       // this.load();
                      this.limpiar();
                          } );
    */

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
    const id = list.id;

    // console.log(`editar() my-modal list -> ${JSON.stringify(list)} id -> ${id}`);

    // if (this.back) { this.agrega_back(h); }

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

  agrega_back(pad: any = null) {
    Object.entries(this.back).forEach(([k, v]) => {
      console.log(`ngOnInit() agrega_back : [k, v] -> ${k} ${v}`);
      if (pad == null) {
          this.lgroup[k] = [''];
          }
          else {
            this.lgroup[k] = [pad[v]];
          }
    } );
    console.log(`ngOnInit() agrega_back : lgroup -> ${JSON.stringify(this.lgroup)}`);

  }


  ngOnInit(): void {

    /*
    console.log(`ngOnInit() my-modal : table -> ${this.table}
    param -> ${JSON.stringify(this.param)}
    editTabla -> ${this.editTabla}`);
    */

    // console.log(`pad : ${JSON.stringify(this.pad)}`);

    this.lgroup = this.Tablas[this.table].lgroup;
    this.compon = this.Tablas[this.table].compon;
    this.listForm = this.fb.group(this.lgroup);

    console.log(`ngOnInit() my-modal : ngOnInit() lgroup -> ${JSON.stringify(this.lgroup)}`);
    console.log(`ngOnInit() my-modal : ngOnInit() compon -> ${JSON.stringify(this.compon)}`);

    // if (this.back) { this.agrega_back(['1', '1']); }
    // const xx  = {'id':[''],'solicitante':[''],'fecha':[''],'numero_registro':[''],'CentroCosto':[1],'EstadoSolicitud':[1]};

    // if (this.back) {
    //    this.agrega_back();
    // }

    // if (this.param) {
    //     this.get_param();
    // }

    // this.total = this.padre.length;

    // console.log(`onInit my-modal : padre -> ${JSON.stringify(this.padre)}`);


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
