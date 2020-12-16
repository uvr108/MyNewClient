import { Validators } from '@angular/forms';

export const TABLAS: object = {

  Presupuesto: {
    next : 'Item',
    back : null,
    lgroup: { id: [''], nombre: ['', Validators.required] },
    compon: { id: 'hidden', nombre: 'text', monto: 'hidden' }
  }

, Item: {
    next: 'SubItem',
    back: null,
    lgroup: { id: [''], nombre: ['', Validators.required] },
    compon: { id: 'hidden', nombre: 'text'}
  }

, SubItem: {
    next: 'Solicitud',
    back: null,
    lgroup: { id: [''], nombre: ['', Validators.required], monto: ['', Validators.required] },
    compon: { id: 'hidden', nombre: 'text', monto: 'text' }
}

, Solicitud: {
    next: 'OrdenCompra',
    back: {CentroCosto: 'centrocostoId', EstadoSolicitud: 'estadosolicitudId', SubItem: 'subitemId'},
    lgroup: { id: [''], solicitante: ['', Validators.required],
    fecha: [''], numero_registro: ['', Validators.required],
    CentroCosto: [''], EstadoSolicitud: [''], SubItem: [''] },

    compon: { id: 'hidden', solicitante: 'text', fecha: 'date', numero_registro: 'text',
    centrocostoId: 'fk', estadosolicitudId: 'fk', subitemId: 'id'}
  }

  , OrdenCompra: {
    next: 'factura',
    back: {EstadoOrden: 'estadoordenId', CentroCosto: 'centrocostoId', Solicitud: 'solicitudId'},
    lgroup: { id: [''], numero_oc: [''], fecha_emision: [''], observaciones: [''],
    CentroCosto: [''], EstadoOrden: [''], Solicitud: [''] },
    compon: { id: 'hidden', numero_oc: 'text', fecha_emision: 'date', observaciones: 'text',
    centrocostoId: 'fk', estadoordenId: 'fk', solicitudId: 'id' }
}

, CentroCosto: {
   next: 'Solicitud',
   back: null,
   lgroup: { id: [''], nombre: ['', Validators.required] },
   compon: { id: 'hidden', nombre: 'text' }
}

, EstadoSolicitud: {
  next: 'Solicitud',
  back: null,
  lgroup: { id: [''], nombre: ['', Validators.required] },
  compon: { id: 'hidden', nombre: 'text' }
}

, EstadoFactura: {
  next: 'Factura',
  back: null,
  lgroup: { id: [''], nombre: ['', Validators.required] },
  compon: { id: 'hidden', nombre: 'text' }
}

, Factura: {
  next: 'ComprobanteContable',
  back: { EstadoFactura: 'estadofacturaId', OrdenCompra: 'ordencompraId'},
  lgroup: { id: [''], numero_registro: [''], numero_cuotas: [''], monto: [''], fecha_recepcion: [''], observacion: [''],
   EstadoFactura: [''], OrdenCompra: ['']},
  compon: { id: 'hidden', numero_registro: 'text', numero_cuotas: 'text', monto: 'text',
  fecha_recepcion: 'date', observacion: 'text', estadofacturaId: 'fk', ordencompraId: 'id'}

  }

  , CuentaContable: {
    next: 'ComprobanteContable',
    back: null,
    lgroup: { id: [''], nombre: ['', Validators.required] },
    compon: { id: 'hidden', nombre: 'text' }
  }

, ComprobanteContable: {
  next: null,
  back: { CuentaContable : 'cuentacontableId', Factura: 'facturaId', },
  lgroup: { id: [''],  numero_registro: [''], fecha_ingreso: [''], CuentaContable: [''], Factura: [''] },
  compon: { id: 'hidden', numero_registro: 'text', fecha_ingreso: 'date', cuentacontableId: 'fk', facturaId: 'id' }

  }
};
