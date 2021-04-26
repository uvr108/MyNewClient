import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild,
   ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { TABLAS } from './../../tablas';
import { AppService } from 'src/app/shared/app.service';


@Component({
  selector: 'app-subitem',
  templateUrl: './subitem.component.html',
  styleUrls: ['./subitem.component.css']
})
export class SubitemComponent implements OnInit {



  @Input() backref: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  id: string = null;
  ref: string = null;
  subitem = false;
  subitem$: any;
  next = false;
  lgroup: Array<string>;
  compon: Array<string>;
  Tablas = TABLAS;
  table = 'SubItem';
  back = this.Tablas[this.table].back;
  componentRef: any;

  msg:string;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               private appservice: AppService
               ) { }
  ngOnInit(): void {

    this.compon = this.Tablas[this.table].compon;

    this.subitem$ = this.crudService.GetData(this.table, this.backref);
    this.appservice.send.subscribe(s => {
      this.msg = s;

      if ( s === this.table) {

        console.log(this.table);
        this.subitem$ = this.crudService.GetData(this.table, this.backref);
        this.appservice.nextMsg('Item');
        this.appservice.nextMsg('Presupuesto');
      }

  });



  }

  sgte(ref: string) {
    console.log(ref);
    this.ref = ref;
    this.next = this.next  === true ? false : true;
  }


  mostra() {
  this.subitem = this.subitem === true ? false : true;
  if (this.subitem) {
  }


}


 activa_modal(table: string, ref: string, editTabla: boolean, pad: object) {

  // console.log('xxx -> ', table, ref, editTabla, pad);

  if (table) {

      this.entry.clear();

      if (this.componentRef) {
        this.componentRef.destroy();
      }

      const factory = this.resolver.resolveComponentFactory(MyModalComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.table = table;
      this.componentRef.instance.editTabla = editTabla;
      this.componentRef.instance.ref = ref;
      this.componentRef.instance.pad = pad;
      }
}


}
