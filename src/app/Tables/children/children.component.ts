import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CentroCosto } from '../../centrocosto';

import { AppService } from '../../shared/app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';

import { EstadoSolicitud } from '../../estadosolicitud';
import { Solicitud } from '../../solicitud';
import { CrudService } from '../../shared/crud.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {
  dic$: any;
  compon: Array<string>;
  listForm: FormGroup;
  table = 'Solicitud';
  inverse: object = {};

  // sol$: Observable<Solicitud>;

  centrocosto$: Observable<CentroCosto[]>;
  estadosolicitud$: Observable<EstadoSolicitud[]>;
  mod$: Observable<Solicitud>;

  Tablas = TABLAS;

  back = this.Tablas[this.table].back;

  displayText = 'I havent got an event yet';

  constructor(private appsevice: AppService,  private fb: FormBuilder,  private crud: CrudService ) {
  }

  ngOnInit() {

    this.dic$ = this.appsevice.dictio;

    if (this.back) {
      this.get_select();
      this.obtiene_back();
      }

      this.compon = this.Tablas[this.table].compon;

    var lgroup:Object = this.Tablas[this.table].lgroup;

    this.dic$.subscribe((param: object) => {

      if (param) {
      Object.entries(param).forEach(([k, v]) => {
        if (this.compon[k] == 'date') {
          v = v.substr(0, 10);
          param[k] = v;
        }
        else if (this.compon[k] == 'fk') {
          // console.log(this.inverse[k], v);
          lgroup[this.inverse[k]] = [v];
        }
        } );

      this.listForm = this.fb.group(lgroup);
      this.listForm.patchValue(param);
      }
    });

  }

  get_select() {

    Object.entries(this.back).forEach(([k, v]) => {


      if (k === 'CentroCosto') {
        this.centrocosto$ = this.crud.getData(k);
      }
      else if (k == 'EstadoSolicitud') {
        this.estadosolicitud$ = this.crud.getData(k);
      }

    } );

  }

  obtiene_back() {

    Object.entries(this.back).forEach(([k, v]) => {
      const   tmp: object = {};
      tmp[k] = v;
      this.inverse[tmp[k]] = k;
      } );


  }



  triggerAnEvent() {

    // this.mod$ = this.crud.modificar(this.listForm.value);
    this.appsevice.triggerSomeEvent(JSON.stringify(this.listForm.value));
    // console.log(JSON.stringify(this.listForm.value));
    this.displayText = 'I fired an event.'
  }


}
