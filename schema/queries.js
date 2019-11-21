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
    const query = `SELECT * FROM concursos`;
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
    const query = `SELECT * FROM experiencias WHERE nombreusuario=$1`;
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
    const query = `SELECT languages.name FROM idiomasporpersona, languages
                   WHERE nombreusuario=$1 AND languages.id = idiomasporpersona.ididioma`;
    const values = [parent.nombreusuario];
    return db
        .multi(query, values)
        .then(res => res[0].map(x => x.name))
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
    const query = `SELECT * FROM concursos WHERE empresa=$1`;
    const values = [parent.nombreusuario];
    return db
        .multi(query, values)
        .then(res => res[0])
        .catch(err => err);
}

const getNombresUsuarioEmpresas = (parent, args) => {
    const query = `SELECT nombreusuario FROM empresas WHERE nombreusuario=$1`;
    const values = [args.nombreusuario];
    return db
        .oneOrNone(query, values)
        .then(res => {
            if (res != null) {
                return res.nombreusuario
            } else {
                 return null;
            }
        })
        .catch(err => err);
}

const getNombresUsuarioPersonas = (parent, args) => {
    const query = `SELECT nombreusuario FROM personas WHERE nombreusuario=$1`;
    const values = [args.nombreusuario];
    return db
        .oneOrNone(query, values)
        .then(res => {
            if (res != null) {
                return res.nombreusuario
            } else {
                 return null;
            }
        })
        .catch(err => err);
}

/* UTILS */

const getDirecciones = (parent, args) => {
    const query = `SELECT * FROM direccionesV`;
    return db
        .multi(query, [])
        .then(res => res[0])
        .catch(err => err);
}

const getIdiomas = (parent, args) => {
    const query = `SELECT * FROM languages`;
    return db
        .multi(query, [])
        .then(res => res[0])
        .catch(err => err);
}

const getTiposSoftware = (parent, args) => {
    const query = `SELECT * FROM tiposoftware`;
    return db
        .multi(query, [])
        .then(res => res[0])
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
    getIdiomas,
    getTiposSoftware,
    getNivelesIdioma,
    getPaises,
    getTipoInstitucion
}


