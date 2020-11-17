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
    lgroup: { id: [''], fecha_emision: [''], numero_oc: [''], observaciones: [''],
    CentroCosto: [''], EstadoOrden: [''], Solicitud: [''] },
    compon: { id: 'hidden', fecha_emision: 'date', numero_oc: 'text', observaciones: 'text',
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

, ComprobanteContable: {
  next: null,
  back: { Factura: 'facturaId', CuentaContable : 'cuentacontableId'}
  }
};
