const messages = require('../util/messages');
const { db } = require('../config');

const crearPersona = (parent, args) => {
    const query = `SELECT * FROM crearPersona($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [args.nombreusuario, args.contrasenia, args.nombre, args.apellido1, args.apellido2, args.email, args.fechadenacimiento, args.nacionalidad];
    return db
      .one(query, values)
      .then(res => res = {success: true, message: "Persona registrada."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)});
}

const actualizarPersona = (parent, args) => {
    const query = `UPDATE personas
    SET apellido1=$2, apellido2=$3, email=$4, nombre=$5, fechadenacimiento=$6, nacionalidad=$7,
    provincia=$8, canton=$9, distrito=$10, telefono1=$11, telefono2=$12, sitioweb=$13, fotografia=$14 WHERE nombreusuario=$1; SELECT 1;`;
    const values = [args.nombreusuario, args.apellido1, args. apellido2, args.email, args.nombre, args.fechadenacimiento,args.nacionalidad,
     args.provincia, args. canton, args. distrito, args. telefono1, args.telefono2, args. sitioweb, args. fotografia];
    return db
      .one(query, values)
      .then(res => res = {success: true, message: "Persona actualizada."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //err = {success: false, message: messages.getMessage(err.code)}
  
}

const agregarIdiomasPorPersona = (parent, args) => {
    const query = `SELECT * FROM agregarIdiomasPorUsuarios($1, $2, $3)`;
    const nombreusuario = args.nombreusuario;
    const idiomas = args.idiomas;
    var codes = "{";
    var levels = "{";
    for (i = 0; i < idiomas.length; i++) {
      codes = codes.concat(args.idiomas[i].ididioma);
      levels = levels.concat(args.idiomas[i].nivelidioma);
      if (i + 1 != idiomas.length) {
        codes = codes.concat(",");
        levels = levels.concat(",");
      }
    }
    codes = codes.concat("}");
    levels = levels.concat("}");
    return db
      .one(query, [nombreusuario, codes, levels])
      .then(res => res = {success: true, message: "Idiomas guardados."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //res = {success: false, message: messages.getMessage(err.code)}
}

const agregarEstudiosPorPersona = (parent, args) => {
    const query = `SELECT * FROM agregarEstudiosPorUsuarios($1, $2, $3, $4, $5, $6)`;
    const nombreusuario = args.nombreusuario;
    const estudios = args.estudios;
    var numeroestudio = "{";
    var grados = "{";
    var tipoinsti = "{";
    var nombreinsti = "{";
    var anio = "{";
    for (i = 0; i < estudios.length; i++) {
      numeroestudio = numeroestudio.concat(i + 1);
      grados = grados.concat(args.estudios[i].gradoobtenido);
      tipoinsti = tipoinsti.concat(args.estudios[i].tipodeinstitucion);
      nombreinsti = nombreinsti.concat(args.estudios[i].nombreinstitucion);
      anio = anio.concat(args.estudios[i].anio);
      if (i + 1 != estudios.length) {
        numeroestudio = numeroestudio.concat(",");
        grados = grados.concat(",");
        tipoinsti = tipoinsti.concat(",");
        nombreinsti = nombreinsti.concat(",");
        anio = anio.concat(",");
      }
    }
    numeroestudio = numeroestudio.concat("}");
    grados = grados.concat("}");
    tipoinsti = tipoinsti.concat("}");
    nombreinsti = nombreinsti.concat("}");
    anio = anio.concat("}");
    return db
      .one(query, [nombreusuario, numeroestudio, grados, tipoinsti, nombreinsti, anio])
      .then(res => res = {success: true, message: "Estudios guardados."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //res = {success: false, message: messages.getMessage(err.code)}
}

const agregarCertificacionesPorPersona = (parent, args) => {
    const query = `SELECT * FROM agregarCertificacionesPorUsuarios($1, $2, $3, $4, $5, $6)`;
    const nombreusuario = args.nombreusuario;
    const certificaciones = args.certificaciones;
    var numerocertificacion = "{";
    var titulos = "{";
    var tipoinsti = "{";
    var nombreinsti = "{";
    var anio = "{";
    for (i = 0; i < certificaciones.length; i++) {
      numerocertificacion = numerocertificacion.concat(i + 1);
      titulos = titulos.concat(args.certificaciones[i].titulo);
      tipoinsti = tipoinsti.concat(args.certificaciones[i].tipodeinstitucion);
      nombreinsti = nombreinsti.concat(args.certificaciones[i].nombreinstitucion);
      anio = anio.concat(args.certificaciones[i].anio);
      if (i + 1 != certificaciones.length) {
        numerocertificacion = numerocertificacion.concat(",");
        titulos = titulos.concat(",");
        tipoinsti = tipoinsti.concat(",");
        nombreinsti = nombreinsti.concat(",");
        anio = anio.concat(",");
      }
    }
    numerocertificacion = numerocertificacion.concat("}");
    titulos = titulos.concat("}");
    tipoinsti = tipoinsti.concat("}");
    nombreinsti = nombreinsti.concat("}");
    anio = anio.concat("}");
    return db
      .one(query, [nombreusuario, numerocertificacion, titulos, tipoinsti, nombreinsti, anio])
      .then(res => res = {success: true, message: "Certificaciones guardadas."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //err = {success: false, message: messages.getMessage(err.code)}
}

const agregarExperienciasPorPersona = (parent, args) => {
    const query = `SELECT * FROM agregarExperienciasPorUsuarios($1, $2, $3, $4, $5, $6, $7, $8)`;
    const nombreusuario = args.nombreusuario;
    const experiencias = args.experiencias;
    var numeroexperiencias = "{";
    var empresas = "{";
    var cargos = "{";
    var fechasdeingreso = "{";
    var fechasdesalidas = "{";
    var trabajosactual = "{";
    var descripcion = "{";
    for (i = 0; i < experiencias.length; i++) {
      numeroexperiencias = numeroexperiencias.concat(i + 1);
      empresas = empresas.concat(args.experiencias[i].empresa);
      cargos = cargos.concat(args.experiencias[i].cargo);
      fechasdeingreso = fechasdeingreso.concat(args.experiencias[i].fechadeingreso);
      fechasdesalidas = fechasdesalidas.concat(args.experiencias[i].fechadesalida);
      trabajosactual = trabajosactual.concat(args.experiencias[i].trabajactual);
      descripcion = descripcion.concat(args.experiencias[i].descripcion);
      if (i + 1 != experiencias.length) {
        numeroexperiencias = numeroexperiencias.concat(",");
        empresas = empresas.concat(",");
        cargos = cargos.concat(",");
        fechasdeingreso = fechasdeingreso.concat(",");
        fechasdesalidas = fechasdesalidas.concat(",");
        trabajosactual = trabajosactual.concat(",");
        descripcion = descripcion.concat(",");
      }
    }
    numeroexperiencias = numeroexperiencias.concat("}");
    empresas = empresas.concat("}");
    cargos = cargos.concat("}");
    fechasdeingreso = fechasdeingreso.concat("}");
    fechasdesalidas = fechasdesalidas.concat("}");
    trabajosactual = trabajosactual.concat("}");
    descripcion = descripcion.concat("}");
    return db
      .one(query, [nombreusuario, numeroexperiencias, empresas, cargos, fechasdeingreso, fechasdesalidas, trabajosactual, descripcion])
      .then(res => res = {success: true, message: "Experiencias guardadas."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //err = {success: false, message: messages.getMessage(err.code)}
}

const agregarDominioPorExperiencia = (parent, args) => {
    const query = `SELECT * FROM agregarDominioPorExperiencia($1, $2, $3, $4, $5)`;
    const nombreusuario = args.nombreusuario;
    const dominios = args.dominios;
    var numeroexperiencia = args.numeroexperiencia;
    var numerosdominio = "{";
    var nombresdellenguaje = "{";
    var idstipos = "{";
    for (i = 0; i < dominios.length; i++) {
      numerosdominio = numerosdominio.concat( i + 1);
      nombresdellenguaje = nombresdellenguaje.concat(args.dominios[i].nombredellenguaje);
      idstipos = idstipos.concat(args.dominios[i].idtipo);
      if (i + 1 != dominios.length) {
        numerosdominio = numerosdominio.concat(",");
        nombresdellenguaje = nombresdellenguaje.concat(",");
        idstipos = idstipos.concat(",");
      }
    }
    numerosdominio = numerosdominio.concat("}");
    nombresdellenguaje = nombresdellenguaje.concat("}");
    idstipos = idstipos.concat("}");
    return db
      .one(query, [numeroexperiencia, nombreusuario, numerosdominio, nombresdellenguaje, idstipos])
      .then(res => res = {success: true, message: "Dominios guardados."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //err = {success: false, message: messages.getMessage(err.code)}
}

const crearEmpresa = (parent, args) => {
    const query = `SELECT * FROM crearEmpresa($1, $2, $3, $4)`;
    const values = [args.nombreusuario, args.contrasenia, args.nombre, args.email];
    return db
      .one(query, values)
      .then(res => res = {success: true, message: "Empresa registrada."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)});
}

const crearConcurso = (parent, args) => {
    const query = `SELECT * FROM crearConcurso($1, $2, $3, $4, $5)`;
    const values = [args.empresa, args.nombredelpuesto, args.fechaderegistro, args.fechadecaducidad, args.descripcion];
    return db
      .one(query, values)
      .then(res => res = {success: true, message: "Concurso registrado."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)});//err = {success: false, message: messages.getMessage(err.code)}
}

const agregarCertificacionesPorConcurso = (parent, args) => {
  const query = `SELECT * FROM agregarCertificacionPorConcurso($1, $2, $3)`;
  const idconcurso = args.idconcurso;
  const certificaciones = args.certificaciones;
  var titulos = "{";
  var obligatorios = "{";
  for (i = 0; i < certificaciones.length; i++) {
    titulos = titulos.concat(args.certificaciones[i].titulo);
    obligatorios = obligatorios.concat(args.certificaciones[i].obligatorio);
    if (i + 1 != certificaciones.length) {
      titulos = titulos.concat(",");
      obligatorios = obligatorios.concat(",");
    }
  }
  titulos = titulos.concat("}");
  obligatorios = obligatorios.concat("}");
  return db
    .one(query, [idconcurso, titulos, obligatorios])
    .then(res => res = {success: true, message: "Certificaciones guardadas."})
    .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //err = {success: false, message: messages.getMessage(err.code)}
}

const agregarDominiosPorConcurso = (parent, args) => {
  const query = `SELECT * FROM agregarDominioPorConcurso($1, $2, $3, $4)`;
  const idconcurso = args.idconcurso;
  const dominios = args.dominios;
  var nombres = "{";
  var idtipos = "{";
  var obligatorios = "{";
  for (i = 0; i < dominios.length; i++) {
    nombres = nombres.concat(args.dominios[i].nombre);
    idtipos = idtipos.concat(args.dominios[i].idtipo);
    obligatorios = obligatorios.concat(args.dominios[i].obligatorio);
    if (i + 1 != dominios.length) {
      nombres = nombres.concat(",");
      idtipos = idtipos.concat(",");
      obligatorios = obligatorios.concat(",");
    }
  }
  nombres = nombres.concat("}");
  idtipos = idtipos.concat("}");
  obligatorios = obligatorios.concat("}");
  return db
    .one(query, [idconcurso, nombres, idtipos, obligatorios])
    .then(res => res = {success: true, message: "Dominios guardados."})
    .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //err = {success: false, message: messages.getMessage(err.code)}
}

const agregarIdiomasPorConcurso = (parent, args) => {
  const query = `SELECT * FROM agregarIdiomaPorConcurso($1, $2, $3)`;
  const idconcurso = args.idconcurso;
  const idiomas = args.idiomas;
  var nombres = "{";
  var niveles = "{";
  for (i = 0; i < idiomas.length; i++) {
    nombres = nombres.concat(args.idiomas[i].nombre);
    niveles = niveles.concat(args.idiomas[i].nivel);
    if (i + 1 != idiomas.length) {
      nombres = nombres.concat(",");
      niveles = niveles.concat(",");
    }
  }
  nombres = nombres.concat("}");
  niveles = niveles.concat("}");
  return db
    .one(query, [idconcurso, nombres, niveles])
    .then(res => res = {success: true, message: "Idiomas guardados."})
    .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //err = {success: false, message: messages.getMessage(err.code)}
}

const agregarResponsabilidadesPorConcurso = (parent, args) => {
  const query = `SELECT * FROM agregarResponsabilidadPorConcurso($1, $2)`;
  const idconcurso = args.idconcurso;
  const responsabilidades = args.responsabilidades;
  var responsabilidadesD = "{";
  for (i = 0; i < responsabilidades.length; i++) {
    responsabilidadesD = responsabilidadesD.concat(responsabilidades[i]);
    if (i + 1 != responsabilidades.length) {
      responsabilidadesD = responsabilidadesD.concat(",");
    }
  }
  responsabilidadesD = responsabilidadesD.concat("}");
  return db
    .one(query, [idconcurso, responsabilidadesD])
    .then(res => res = {success: true, message: "Responsabilidades guardadas."})
    .catch(err => err = {success: false, message: messages.getMessage(err.code)}); //err = {success: false, message: messages.getMessage(err.code)}
}

const agregarPersonaConcurso = (parent, args) => {
  const query = `SELECT * FROM agregarPersonaConcurso($1, $2)`;
    const values = [args.nombreusuario, args.idconcurso];
    return db
      .one(query, values)
      .then(res => res = {success: true, message: "Persona asociada como candidata al concurso."})
      .catch(err => err = {success: false, message: messages.getMessage(err.code)});
}

module.exports = {
    crearPersona,
    actualizarPersona,
    agregarIdiomasPorPersona,
    agregarEstudiosPorPersona,
    agregarExperienciasPorPersona,
    agregarDominioPorExperiencia,
    agregarCertificacionesPorPersona,
    crearEmpresa,
    crearConcurso,
    agregarCertificacionesPorConcurso,
    agregarDominiosPorConcurso,
    agregarIdiomasPorConcurso,
    agregarResponsabilidadesPorConcurso,
    agregarPersonaConcurso
}