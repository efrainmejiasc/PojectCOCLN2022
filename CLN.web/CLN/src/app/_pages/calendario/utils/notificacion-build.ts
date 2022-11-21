export class NotificacionBuild {

  static saludo = '¡Cordial saludo!';
  static mensajeInivitacion = 'El Ministerio de Educación Nacional los invita muy amablemente al siguiente evento:';

  static mensajeCancelacion = 'El Ministerio de Educación Nacional los informa que el siguiente evento ha sido cancelado:';
  static getTemaSelected(evento: any) {
    let temas = '';
    if (evento.EventoTemas !== undefined) {
      evento.EventoTemas.forEach((tema) => {
        temas += `<li>${tema.descripcion}</li>`;
      });
      const textoestatico = `
      <b><strong>Tipo de evento:</strong></b> ${evento.tipoDesc} <br />
      <b><strong>Nombre del evento:</strong></b> ${evento.nombre} <br />
      <b><strong>Fecha del evento:</strong></b> ${evento.fechaEvento} <br/>
      <b><strong>Hora inicio:</strong></b> ${evento.horaInicio} - <b><strong>Hora fin:</strong></b> ${evento.horaFin} <br />
      <b><strong>Lugar o enlace del evento:</strong></b> ${evento.direccion} <br />
      <b><strong>Descripción del evento:</strong></b> ${evento.descripcion} <br />
      <b><strong>Temas del evento:</strong></b> <br />
      <ul>${temas}</ul>`;
      return textoestatico;
    }
  }
  static get(evento: any, temasSelected: any[], tipoEvento: string, tipoMensaje: TipoMensaje) {
    let temas = '';

    if (temasSelected !== undefined) {
      temasSelected.forEach((tema) => {
        temas += `<li>${tema.descripcion}</li>`;
      });
    }


    const textoestatico = `
        <b><strong>Tipo de evento:</strong></b> ${tipoEvento} <br />
        <b><strong>Nombre del evento:</strong></b> ${evento.nombre} <br />
        <b><strong>Fecha del evento:</strong></b> ${evento.fechaEvento} <br/>
        <b><strong>Hora inicio:</strong></b> ${evento.horaInicio} - <b><strong>Hora fin:</strong></b> ${evento.horaFin} <br />
        <b><strong>Lugar o enlace del evento:</strong></b> ${evento.direccion} <br />
        <b><strong>Descripción del evento:</strong></b> ${evento.descripcion} <br />
        <b><strong>Temas del evento:</strong></b> <br />
        <ul>${temas}</ul> <br />`;

    const notificacionObj: any = {};
    notificacionObj.saludo = this.saludo;
    notificacionObj.mensajeSaludo = tipoMensaje === TipoMensaje.invitacion ? this.mensajeInivitacion : this.mensajeCancelacion;
    notificacionObj.cuerpoCorreo = `${textoestatico} <p>${evento.notificacion}</p> <br /> <strong>¡Muchas gracias!</strong>`;

    return notificacionObj;
  }
}

export enum TipoMensaje {
  invitacion = 1,
  cancelacion,
}
