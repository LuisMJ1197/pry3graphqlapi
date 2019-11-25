const { db } = require('../config');

const personaLogin = (parent, args) => {
    const query = `SELECT * FROM personalogininfo WHERE nombreusuario=$1 AND contrasenia=$2`;
    const values = [args.nombreusuario, args.contrasenia];
    return db
        .oneOrNone(query, values)
        .then(res => res)
        .catch(err => err);
}

const empresaLogin = (parent, args) => {
    const query = `SELECT * FROM empresalogininfo WHERE nombreusuario=$1 AND contrasenia=$2`;
    const values = [args.nombreusuario, args.contrasenia];
    return db
      .oneOrNone(query, values)
      .then(res => res)
      .catch(err => err);
}

const getConcursos = (parent, args) => {
    const query = `SELECT * FROM concursosV`;
    return db
      .multi(query, [])
      .then(res => res[0])
      .catch(err => err);
}

const getPersonaConcurso = (parent, args) => {
    const query = `SELECT personas.* FROM personasporconcurso, personas 
        WHERE personasporconcurso.nombreusuario = personas.nombreusuario AND personasporconcurso.idconcurso = $1`;
    return db
      .multi(query, [args.idconcurso])
      .then(res => res[0])
      .catch(err => err);
}

function getPersonaEstudios(parent) {
    const query = `SELECT * FROM estudios WHERE nombreusuario=$1`;
    values = [parent.nombreusuario];
    return db
        .multi(query, values)
        .then(res => res = res[0])
        .catch(err => err);
}

function getPersonaExperiencias(parent) {
    const query = `SELECT * FROM experienciasV WHERE nombreusuario=$1`;
    values = [parent.nombreusuario];
    return db
        .multi(query, values)
        .then(res => res = res[0])
        .catch(err => err);
}

function getExperienciaDominios(parent) {
    const query = `SELECT * FROM dominiossoftwareporexperiencia WHERE numeroexperiencia=$1 AND nombreusuario=$2`;
    values = [parent.numeroexperiencia, parent.nombreusuario];
    return db
        .multi(query, values)
        .then(res => res = res[0])
        .catch(err => err);
}

function getNombreLenguaje(parent) {
    const query = `SELECT nombre FROM tiposoftware WHERE idtipo=$1`;
    const values = [parent.idtipo];
    return db
        .one(query, values)
        .then(res => res.nombre)
        .catch(err => err);
}

function getPersonaIdiomas(parent) {
    const query = `SELECT idioma, nivelidioma FROM idiomasporpersona WHERE nombreusuario = $1`;
    const values = [parent.nombreusuario];
    return db
        .multi(query, values)
        .then(res => res[0])
        .catch(err => err);
}

function getPersonaCertificaciones(parent) {
    const query = `SELECT * FROM certificaciones WHERE nombreusuario=$1`;
    const values = [parent.nombreusuario];
    return db
        .multi(query, values)
        .then(res => res[0])
        .catch(err => err);
}

function getConcursoCertificaciones(parent) {
    const query = `SELECT * FROM certificacionesporconcurso WHERE idconcurso=$1`;
    const values = [parent.idconcurso];
    return db
        .multi(query, values)
        .then(res => res[0])
        .catch(err => err);
}

function getConcursoDominios(parent) {
    const query = `SELECT * FROM dominioporconcurso WHERE idconcurso=$1`;
    const values = [parent.idconcurso];
    return db
        .multi(query, values)
        .then(res => res[0])
        .catch(err => err);
}

function getConcursoResponsabilidades(parent) {
    const query = `SELECT * FROM responsabilidadporconcurso WHERE idconcurso=$1`;
    const values = [parent.idconcurso];
    return db
        .multi(query, values)
        .then(res => res[0].map(x => x.descripcion))
        .catch(err => err);
}

function getConcursoIdiomas(parent) {
    const query = `SELECT * FROM idiomaporconcurso WHERE idconcurso=$1`;
    const values = [parent.idconcurso];
    return db
        .multi(query, values)
        .then(res => res[0])
        .catch(err => err);
}

function getEmpresaConcursos(parent) {
    const query = `SELECT * FROM concursosV WHERE empresa=$1`;
    const values = [parent.nombreusuario];
    return db
        .multi(query, values)
        .then(res => res[0])
        .catch(err => err);
}

const getNombresUsuarioEmpresas = (parent, args) => {
    const query = `SELECT nombreusuario FROM empresas`;
    return db
        .multi(query, [])
        .then(res => {
            if (res[0] != null) {
                return res[0].map(x => x.nombreusuario)
            } else {
                 return null;
            }
        })
        .catch(err => err);
}

const getNombresUsuarioPersonas = (parent, args) => {
    const query = `SELECT nombreusuario FROM personas`;
    return db
        .multi(query, [])
        .then(res => {
            if (res[0] != null) {
                return res[0].map(x => x.nombreusuario)
            } else {
                 return null;
            }
        })
        .catch(err => err);
}

/* UTILS */

const getDirecciones = (parent, args) => {
    const query = `SELECT cod as provinciacod, nombre as provincia FROM provincia`;
    return db
        .multi(query, [])
        .then(res => res[0])
        .catch(err => err);
}

function getCantonesPorProvincia(parent) {
    const query = `SELECT provincia.cod as provinciacod, canton.canton as cantoncod, canton.nombre as canton FROM canton INNER JOIN provincia ON canton.provincia = provincia.cod
    WHERE provincia.cod = $1`;
    return db
        .multi(query, [parent.provinciacod])
        .then(res => res[0])
        .catch(err => err);
}

function getDistritosPorCanton(parent) {
    const query = `SELECT distrito.distrito as distritocod, distrito.nombre as distrito 
                   FROM distrito INNER JOIN canton ON distrito.canton = canton.canton
                    INNER JOIN provincia ON distrito.provincia = provincia.cod AND distrito.canton = canton.canton AND canton.provincia = provincia.cod
                    WHERE provincia.cod = $1 AND canton.canton = $2`;
    return db
        .multi(query, [parent.provinciacod, parent.cantoncod])
        .then(res => res[0])
        .catch(err => err);
}

const getIdiomas = (parent, args) => {
    const query = `SELECT name FROM languages ORDER BY name`;
    return db
        .multi(query, [])
        .then(res => res[0].map(x => x.name))
        .catch(err => err);
}

const getTiposSoftware = (parent, args) => {
    const query = `SELECT nombre FROM tiposoftware`;
    return db
        .multi(query, [])
        .then(res => res[0].map(x => x.nombre))
        .catch(err => err);
}

const getNivelesIdioma = (parent, args) => {
    const query = `SELECT * FROM nivelidioma`;
    return db
        .multi(query, [])
        .then(res => res[0].map(x => x.idnivel))
        .catch(err => err);
}

const getPaises = (parent, args) => {
    const query = `SELECT Name FROM pais`;
    return db
        .multi(query, [])
        .then(res => res[0].map(x => x.name))
        .catch(err => err);
}

const getTipoInstitucion = (parent, args) => {
    const query = `SELECT nombre FROM tipodeinstitucion`;
    return db
        .multi(query, [])
        .then(res => res[0].map(x => x.nombre))
        .catch(err => err);
}

module.exports = {
    personaLogin,
    empresaLogin,
    getPersonaEstudios,
    getConcursos,
    getPersonaExperiencias,
    getExperienciaDominios,
    getNombreLenguaje,
    getPersonaIdiomas,
    getPersonaCertificaciones,
    getConcursoCertificaciones,
    getConcursoDominios,
    getConcursoIdiomas,
    getConcursoResponsabilidades,
    getPersonaConcurso,
    getEmpresaConcursos,
    getNombresUsuarioEmpresas,
    getNombresUsuarioPersonas,

    getDirecciones,
    getCantonesPorProvincia,
    getDistritosPorCanton,
    getIdiomas,
    getTiposSoftware,
    getNivelesIdioma,
    getPaises,
    getTipoInstitucion
}


