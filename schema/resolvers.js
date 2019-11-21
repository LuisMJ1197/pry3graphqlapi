const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
var dateFormat = require('../util/dateformat');
const queries = require('./queries');
const mutations = require('./mutations');

const resolvers = {
	Query: {
		personaLogin: queries.personaLogin,
		empresaLogin: queries.empresaLogin,
		concursos: queries.getConcursos,
		getPersonaConcurso: queries.getPersonaConcurso,
		getDirecciones: queries.getDirecciones,
		getIdiomas: queries.getIdiomas,
		getNivelesIdioma: queries.getNivelesIdioma,
		getTiposSoftware: queries.getTiposSoftware,
		getPaises: queries.getPaises,
		getTipoInstitucion: queries.getTipoInstitucion,
		getNombresUsuarioEmpresas: queries.getNombresUsuarioEmpresas,
		getNombresUsuarioPersonas: queries.getNombresUsuarioPersonas
	},
	Persona: {
		estudios(parent, args, cts, info) { return queries.getPersonaEstudios(parent); },
		experiencias(parent, args, cts, info) { return queries.getPersonaExperiencias(parent); },
		idiomas(parent, args, cts, info) { return queries.getPersonaIdiomas(parent); },
		certificaciones(parent, args, cts, info) { return queries.getPersonaCertificaciones(parent); }
	},
	Experiencia: {
		dominios(parent, args, cts, info) { return queries.getExperienciaDominios(parent); },
	},
	DominioExperiencia: {
		tipo(parent, args, cts, info) { return queries.getNombreLenguaje(parent); }
	},
	Concurso: {
		certificaciones(parent, args, cts, info) { return queries.getConcursoCertificaciones(parent); },
		dominios(parent, args, cts, info) { return queries.getConcursoDominios(parent); },
		idiomas(parent, args, cts, info) { return queries.getConcursoIdiomas(parent); },
		responsabilidades(parent, args, cts, info) { return queries.getConcursoResponsabilidades(parent); }
	},
	DominioConcurso: {
		tipo(parent, args, cts, info) { return queries.getNombreLenguaje(parent); }
	},
	Empresa: {
		concursos(parent, args, cts, info) { return queries.getEmpresaConcursos(parent); }
	},
	Mutation: {
	    crearPersona: mutations.crearPersona,
	    actualizarPersona: mutations.actualizarPersona,
	    agregarIdiomasPorPersona: mutations.agregarIdiomasPorPersona,
	    agregarEstudiosPorPersona: mutations.agregarEstudiosPorPersona,
	    agregarCertificacionesPorPersona: mutations.agregarCertificacionesPorPersona,
		agregarExperienciasPorPersona: mutations.agregarExperienciasPorPersona,
		agregarDominioPorExperiencia: mutations.agregarDominioPorExperiencia,

	    crearEmpresa: mutations.crearEmpresa,
		crearConcurso: mutations.crearConcurso,
		agregarCertificacionesPorConcurso: mutations.agregarCertificacionesPorConcurso,
		agregarDominiosPorConcurso: mutations.agregarDominiosPorConcurso,
		agregarIdiomasPorConcurso: mutations.agregarIdiomasPorConcurso,
		agregarResponsabilidadesPorConcurso: mutations.agregarResponsabilidadesPorConcurso,
		agregarPersonaConcurso: mutations.agregarPersonaConcurso
	},


	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value) {
			return new Date(value); // value from the client
		},
		serialize(value) {
			return value.format("yyyy-mm-dd"); // value sent to the client
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10); // ast value is always in string format
			}
			return null;
	}})
}

exports.resolvers = resolvers;