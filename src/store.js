import { reactive } from 'vue';

import data from "./data/datos.json"; 

export const store = reactive({

  empleados: data.empleados || data, 
  
  registros: [],
  justificantes: [],
  usuarioLogueado: JSON.parse(localStorage.getItem('usuarioLogueado')) || null,

  iniciarSesion(usuario) {
    this.usuarioLogueado = usuario;
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  },
  
  cerrarSesion() {
    this.usuarioLogueado = null;
    localStorage.removeItem('usuarioLogueado');
  }
});