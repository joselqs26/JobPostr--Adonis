'use strict'

class CreateUser {
  get rules() {
    return {
      // Valor : Condiciones 
      // required - Obligatorio
      // unique - único en su tabla (se indica la tabla usando : )
      'username': 'required|unique:users',
      'email': 'required|unique:users',
      'password': 'required'
    }
  }

  get messages() {
    return {
      // Condición : Mensaje
      // Dentro de messages se puede usar interpolación
      'required': 'Woah now, {{ field }} is required',
      'unique': 'Wait a second, the {{ field }} alredy exists'
    }
  }

  async fails(error) {
    // Revisión de errores en la sesión
    this.ctx.session.withErrors(error).flashAll();

    // Redirección a la página anterior
    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateUser
