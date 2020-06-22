import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() ref: string = null;
  @Input() id: string = null;

  item = false;
  total = 0;
  cabecera = [];
  padre = [];
  lgroup: Array<string>;
  compon: Array<string>;
  flag = true;
  Tablas = TABLAS;

  nuevo = false;
  editTabla = true;
  listForm: FormGroup;

  constructor( private crudService: CrudService, private route: ActivatedRoute, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.load();
  }
  load(): void {

    // console.log(`load() Master : table ${this.table} fk : ${this.fk}`);

    this.crudService.GetData('item', this.ref)
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
      // console.log(`load() Master padre ${JSON.stringify(this.padre)}`);
    });
}

mostra() {
  this.item = this.item === true ? false : true;
}


marcar_nuevo() {
  this.updateTabla();
  this.nuevo = this.nuevo === true ? false : true;
  this.editTabla = false;
}

updateTabla(msg: object = null) {
  const js = this.lgroup;
  let cont = 0;
  if (msg === null) { this.limpiar(); } else {
    for (const [key, value] of Object.entries(this.lgroup)) {
        js[key] = msg[cont];
        // console.log(`updateTable() master : key -> ${JSON.stringify(key)} msg[cont] -> ${msg[cont]}`);
        cont += 1;
    }
    // console.log(`updateTable() master : js -> ${JSON.stringify(js)}`);
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

}
