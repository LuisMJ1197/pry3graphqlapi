function getMessage (code) {
	switch(code) {
		case '23505':
			return 'El nombre de usuario ya existe.';
			break;
		case '23502':
			return 'Debe insertar los espacios obligatorios.';
			break;
		case '23503':
			return 'Algunos datos no coinciden en las relaciones de los datos.';
			break;
	}
}

module.exports = {
	getMessage
}