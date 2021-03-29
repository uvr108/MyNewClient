import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
// import { FormBuilder,  FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../shared/app.service';

import { Solicitud } from '../../interfaces/solicitud';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  @Input() backref: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  mod$: Observable<Solicitud>;

  displayText = 'I havent got an event yet';
  count$: any;
  // dic$: any;
  solicitud$: any;
  table = 'Solicitud';

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private appservice: AppService,
    private crud: CrudService,
   ) {
  }
  ngOnInit() {

    // this.count$ = this.appsevice.count;
    // this.dic$ = this.appsevice.dictio;
    this.load();

    this.appservice.getEventSubject().subscribe((param: any) => {
      if (param !== undefined) {
        this.theTargetMethod(param);
      }
      });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  load() {
    // console.log('cargando .....');
    this.solicitud$ = this.crud.getData(this.table, this.backref)
    .pipe(takeUntil(this.destroy$));
    // console.log('Termina carga ....');

  }

  editar(param: string) {
    const parse = JSON.parse(param);
    this.mod$ = this.crud.modificar(parse)
    .pipe(takeUntil(this.destroy$));

  }

  theTargetMethod(param) {

    this.displayText = 'parameter: ' + param;

    // const parse = JSON.parse(param);

    /*
    if (parse['id']) {

      console.log('No');
      this.mod$ = this.crud.modificar(parse)
      .pipe(takeUntil(this.destroy$));

     }
     else {

          const fk = this.backref + '/' +  parse['CentroCosto'] + '/' + parse['EstadoSolicitud'];
          console.log('Si');
          this.mod$ = this.crud.ingresar(param, fk);
     }
    */
  }

  ngAfterViewInit() {

  }


  nextCount(pad: object) {
    this.appservice.nextCount(pad);
    // console.log('xxx');
  }


}
