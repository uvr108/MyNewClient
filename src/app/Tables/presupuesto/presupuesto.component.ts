import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {

  presupuesto = false;
  next = false;
  ref: string = null;
  total = 0;
  cabecera = [];
  padre = [];
  lgroup: Array<string>;
  compon: Array<string>;
  flag = true;
  Tablas = TABLAS;
  table = 'Presupuesto';
  fk: string = null;

  nuevo = false;
  editTabla = true;
  listForm: FormGroup;

  constructor( private crudService: CrudService, private route: ActivatedRoute, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.load();
    this.lgroup = this.Tablas[this.table].lgroup;
    this.compon = this.Tablas[this.table].compon;
    this.listForm = this.fb.group(this.lgroup);
  }
  load(): void {

    // console.log(`load() Master : table ${this.table} fk : ${this.fk}`);

    this.crudService.GetData(this.table, null)
    .subscribe(data => {
      // console.log(data);
      this.padre = [];
      data.forEach((f) => {
        const subresult = [];
        // console.log(f);
        for (const [key, value] of Object.entries(f)) {
          if (this.flag) {this.cabecera.push(key); }
          subresult.push(value);
      }
        this.padre.push(subresult);
        this.flag = false;
  });
      this.total = this.padre.length;
      console.log(`load() Master padre : ${JSON.stringify(this.padre)}`);
    });
}

mostra() {
  this.presupuesto = this.presupuesto === true ? false : true;
}

// agregar

agregar() {

  console.log(`onSubmit() Master : lform ${JSON.stringify(this.listForm.value)} table ${this.table} fk ${this.fk}`);

  this.crudService
  .agregar(this.listForm.value, this.table, this.fk)
  .subscribe(() => {
    this.load();
    this.updateTabla();
  } );

}

sgte(ref: string) {
  // alert(ref);
  this.ref = ref;
  // this.next = true;
  this.next = this.next  === true ? false : true;
}

marcar_nuevo(pad: Array<any> = null) {
  console.log(pad);
  this.updateTabla(pad);
  this.nuevo = this.nuevo === true ? false : true;
  this.editTabla = ( (pad) ? true : false);
}

updateTabla(msg: object = null) {
  const js = this.lgroup;
  console.log(JSON.stringify(js));
  let cont = 0;
  if (msg === null) { this.limpiar(); } else {
    for (const [key, value] of Object.entries(this.lgroup)) {
        js[key] = msg[cont];
        console.log(`updateTable() master : key -> ${JSON.stringify(key)} msg[cont] -> ${msg[cont]}`);
        cont += 1;
    }
    console.log(`updateTable() master : js -> ${JSON.stringify(js)}`);
    this.listForm.patchValue(js);
  }
}


limpiar() {
  const dict = {};
  // tslint:disable-next-line: forin
  for (const k in this.lgroup) {
    dict[k] = null;
  }
  this.listForm.patchValue(dict);
}

// editar

editar() {
  const list = this.listForm.value;
  // tslint:disable-next-line: no-string-literal
  const id = list['id'];

  this.crudService.
  Update(id, this.listForm.value, this.table).
  subscribe(() => this.load());
}


// borrar

borrar() {
  const list = this.listForm.value;
  // tslint:disable-next-line: no-string-literal
  const id = list['id'];

  this.crudService.Delete(id, this.table).subscribe(() => this.load());

  // this.cerrar();
}

}
