const { gql } = require('apollo-server-express');

const schema = gql`
type Query {
    personaLogin(nombreusuario: String!, contrasenia: String!): Persona,
    empresaLogin(nombreusuario: String!, contrasenia: String!): Empresa,
    concursos: [Concurso],
    getPersonaConcurso(idconcurso: Int): [Persona],
    getDirecciones: [Provincia],
    getIdiomas: [String],
    getTiposSoftware: [String],
    getNivelesIdioma: [String],
    getPaises: [String],
    getTipoInstitucion: [String],
    getNombresUsuarioEmpresas: [String],
    getNombresUsuarioPersonas: [String]
}

type Mutation {
    crearPersona(nombreusuario: String!, contrasenia: String!, nombre: String!, apellido1: String!, apellido2: String!, email: String!,
     fechadenacimiento: String!, nacionalidad: String!): Result!,
    actualizarPersona(persona: PersonaInput): Result!,
    agregarIdiomasPorPersona(nombreusuario: String!, idiomas: [IdiomaInput]): Result!,
    agregarEstudiosPorPersona(nombreusuario: String, estudios: [EstudioInput]): Result!,
    agregarCertificacionesPorPersona(nombreusuario: String!, certificaciones: [CertificacionInput]): Result!,
    agregarExperienciasPorPersona(nombreusuario: String!, experiencias: [ExperienciaInput]): Result!,
    agregarDominioPorExperiencia(numeroexperiencia: Int!, nombreusuario: String!, dominios: [DominioExperienciaInput]): Result!

    crearEmpresa(nombreusuario: String!, contrasenia: String!, email: String!, nombre: String!): Result!,
    actualizarEmpresa(empresa: EmpresaInput): Result!,
    crearConcurso(concurso: ConcursoInput): Int!,
    
    agregarCertificacionesPorConcurso(idconcurso: Int!, certificaciones: [CertificacionConcursoInput]): Result!,
    agregarDominiosPorConcurso(idconcurso: Int!, dominios: [DominioConcursoInput]): Result!,
    agregarIdiomasPorConcurso(idconcurso: Int!, idiomas: [IdiomaConcursoInput]): Result!,
    agregarResponsabilidadesPorConcurso(idconcurso: Int!, responsabilidades: [String]): Result!,

    agregarPersonaConcurso(nombreusuario: String!, idconcurso: Int): Result!,

    actualizarPersonaImage(nombreusuario: String, fotografia: String): Result!,
    actualizarEmpresaImage(nombreusuario: String, logo: String): Result!,
    actualizarConcurso(concurso: ConcursoInput): Result!,
    eliminarConcurso(idconcurso: Int!): Result!,
}

type Provincia {
    provinciacod: String,
    provincia: String,
    cantones: [Canton]
}

type Canton {
    provinciacod: String,
    cantoncod: String,
    canton: String,
    distritos: [Distrito]
}

type Distrito {
    distritocod: String,
    distrito: String
}

type TipoSoftware {
    idtipo: String!,
    nombre: String!
}

type Direccion {
    provinciacod: String!,
    provincia: String!,
    cantoncod: String!,
    canton: String!,
    distritocod: String!,
    distrito: String!
}

input PersonaInput {
    nombreusuario: String!,
    apellido1: String!,
    apellido2: String!,
    email: String!,
    nombre: String!,
    fechadenacimiento: String!,
    nacionalidad: String!,
    provincia: String,
    canton: String,
    distrito: String,
    telefono1: String,
    telefono2: String,
    sitioweb: String,
    fotografia: String
}

type Persona {
    nombreusuario: String!,
    contrasenia: String!,
    apellido1: String!,
    apellido2: String!,
    email: String!,
    nombre: String!,
    fechadenacimiento: String!,
    nacionalidad: String!,
    provincia: String,
    canton: String,
    distrito: String,
    telefono1: String,
    telefono2: String,
    sitioweb: String,
    fotografia: String,
    estudios: [Estudio],
    experiencias: [Experiencia],
    idiomas: [Idioma],
    certificaciones: [Certificacion]
}

type Idioma {
    idioma: String!,
    nivelidioma: String!
}

input IdiomaInput {
    idioma: String!,
    nivelidioma: String!
}

type Estudio {
    gradoobtenido: String!,
    nombreinstitucion: String!,
    anio: String!
}

input EstudioInput {
    gradoobtenido: String!,
    nombreinstitucion: String!,
    anio: String!
}

type Certificacion {
    numeroCertificacion: Int,
    titulo: String!,
    nombreinstitucion: String!,
    anio: String!
}

input CertificacionInput {
    numeroCertificacion: Int,
    titulo: String!,
    nombreinstitucion: String!,
    anio: String!
}

type Experiencia {
    numeroexperiencia: Int,
    empresa: String!,
    cargo: String!,
    fechadeingreso: String!,
    fechadesalida: String!,
    trabajactual: Boolean!,
    descripcion: String!,
    dominios: [DominioExperiencia]
}

input ExperienciaInput {
    numeroexperiencia: Int,
    empresa: String!,
    cargo: String!,
    fechadeingreso: String!,
    fechadesalida: String!,
    trabajactual: Boolean!,
    descripcion: String!,
    dominios: [String]
}

type DominioExperiencia {
    numeroexperiencia: Int,
    nombreusuario: String,
    numerodominio: Int,
    nombredellenguaje: String,
    tipodesoftware: String
}

input DominioExperienciaInput {
    numeroexperiencia: Int!,
    nombreusuario: String,
    numerodominio: Int,
    nombredellenguaje: String!,
    tipodesoftware: String!
}


input EmpresaInput {
    nombreusuario: String!,
    email: String!,
    nombre: String!,
    nombrecontacto: String,
    telefono1: String,
    telefono2: String,
    sitioweb: String,
    provincia: String,
    canton: String,
    distrito: String,
}


type Empresa {
    nombreusuario: String!,
    contrasenia: String!,
    email: String!,
    nombre: String!,
    logo: String,
    telefono1: String,
    telefono2: String,
    sitioweb: String,
    provincia: String,
    canton: String,
    distrito: String,
    nombrecontacto: String,
    concursos: [Concurso]
}

type DominioConcurso {
    nombre: String,
    tipo: String,
    obligatorio: Boolean
}

input DominioConcursoInput {
    nombre: String!,
    idtipo: Int!,
    obligatorio: Boolean!
}

type CertificacionConcurso {
    titulo: String,
    obligatorio: Boolean
}

input CertificacionConcursoInput {
    titulo: String,
    obligatorio: Boolean
}

type IdiomaConcurso {
    nombre: String,
    nivel: String
}

input IdiomaConcursoInput {
    nombre: String,
    nivel: String
}

type Concurso {
    idconcurso: Int,
    empresa: String!,
    nombreempresa: String,
    nombredelpuesto: String!,
    fechaderegistro: String!,
    fechadecaducidad: String!,
    descripcion: String!,
    certificaciones: [CertificacionConcurso],
    dominios: [DominioConcurso],
    idiomas: [IdiomaConcurso],
    responsabilidades: [String]
}

input ConcursoInput {
    idconcurso: Int,
    empresa: String!,
    nombreempresa: String,
    nombredelpuesto: String!,
    fechaderegistro: String!,
    fechadecaducidad: String!,
    descripcion: String!
}

type Result {
  success: Boolean!
  message: String
}`

module.exports = {
    schema
}