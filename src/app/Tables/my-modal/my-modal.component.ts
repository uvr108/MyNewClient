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
  // @Input() back: string;
  // @Input() seleccion: object = {};
  @Input() pad: object = null;

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

  back: object;
  keyback=[];

  seleccion: object = {};
  inverse: object = {};

  constructor( private crudService: CrudService, private fb: FormBuilder ) { }

  get_param() {
    Object.entries(this.back).forEach(([k, v]) => {
      // console.log(`get_param mymodal : k -> ${k}`);
      this.param = this.param + '/' + this.listForm.value[k];
    });
  }

  ingresar() {

    // console.log(`my-modal : back ${JSON.stringify(this.back)}`);
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

    var list = this.listForm.value;
    list['id'] = this.pad['id'];

    console.log(list);

   /*
    let valores = {};
    for (const [key, value] of Object.entries(this.listForm.value)) {

            if (this.back !== null && this.back.hasOwnProperty(key)) {
              if (this.compon[this.back[key]] === 'fk') {
                valores[this.back[key]] = value;
                // console.log(this.back[key], value);
              }

          }
          else {
            valores[key]= value;
            // console.log(key,value)
          }
    */

    /*

    this.crudService.
    update(this.pad[0].toString(), valores, this.table).
    subscribe();

    */

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
    // pad = [29, 'xxxs', '2020-08-14', '1000', 1, 2, 32];
    // console.log(`agrega_back() my-modal : pad -> ${JSON.stringify(pad)}`);

    if (pad) {
      Object.entries(this.lgroup).forEach(([u, w]) => {
        if (this.compon[this.back[u]]=='fk') {
          console.log('u w ', u, w, this.back[u], this.pad[this.back[u]]);
          this.lgroup[u] = [this.pad[this.back[u]]];
        }

      });
    }
    // console.log(`agrega_back() my-modal : lgroup -> ${JSON.stringify(this.lgroup)}`);
  }

  get_select() {
    // console.log(`get_select() back -> ${JSON.stringify(this.back)}`);
    Object.entries(this.back).forEach(([k, v]) => {
      // console.log(`k : v -> ${k} ${v}`);
      this.crudService.GetData(k).subscribe((d) => {
        // console.log(`k : v -> ${k} ${v}`);
        this.seleccion[k] = d;
       // console.log(`get_select() solicitud : [k,v] -> ${k} : ${v} seleccion -> ${JSON.stringify(this.seleccion[k])}`);
       });
       } );
    // console.log(`Solicitud seleccion -> ${JSON.stringify(this.seleccion)}`);
  }

  obtiene_back() {
    // console.log(`obtiene_back back -> ${JSON.stringify(this.back)}`);
    // console.log(`obtiene_back seleccion -> ${JSON.stringify(this.seleccion)}`);

    Object.entries(this.back).forEach(([k, v]) => {
      this.keyback.push(k);
      const   tmp: object = {};
      tmp[k] = v;
      this.inverse[tmp[k]] = k;
      } );

    // console.log(`obtiene_back inverse -> ${JSON.stringify(this.inverse)}`);
  }



  ngOnInit(): void {

    const js = {};

    this.back = this.Tablas[this.table].back;

    if (this.back) {
      this.get_select();
      this.obtiene_back();
     }

    this.lgroup = this.Tablas[this.table].lgroup;
    this.compon = this.Tablas[this.table].compon;

    if (this.pad) {

        for (const [key, value] of Object.entries(this.compon)) {
          // console.log(`key -> ${key} value -> ${value}`);
          if (value === 'text') {
            js[key] = this.pad[key];

            }
            else if (value === 'date') {
              if ( this.pad[key] === null) {

                } else {

                   js[key] = this.pad[key].substring(0, 10);
                }
            }

          }
        }

    if (this.back && this.editTabla) {
        this.agrega_back(this.pad);
    }

    // console.log(`ngOnInit() my-modal lgroup -> ${JSON.stringify(this.lgroup)}`);
    // console.log(`ngOnInit() my-modal js -> ${JSON.stringify(js)}`);

    this.listForm = this.fb.group(this.lgroup);

    this.listForm.patchValue(js);


  }


}
