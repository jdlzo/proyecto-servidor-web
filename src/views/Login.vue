<template>
  <div class="login-page">
    <div class="login">

      <h1>Control de Asistencia</h1>

      <input type="text" placeholder="Usuario" v-model="usuario">
      <input type="password" placeholder="Contraseña" v-model="password">

      <button @click="iniciarSesion">
        Iniciar Sesión
      </button>

    </div>
  </div>
</template>

<script>
import "../assets/CSS/login.css";
import { store } from "@/store"; // Asegúrate de importar el store

export default {
  data() {
    return {
      store, // <--- ¡ESTO FALTABA! Así el componente sabe qué es this.store
      usuario: "",
      password: ""
    };
  },

  methods: {
    iniciarSesion() {
  console.log("--- DEBUG LOGIN ---");
  console.log("Lista de empleados en el store:", this.store.empleados);
  console.log("Lo que escribió el usuario:", this.usuario);
  console.log("Lo que escribió el password:", this.password);

  const user = this.store.empleados.find(u => {
    // Vamos a ver qué comparación está fallando
    console.log(`Comparando con ${u.usuario} - Password: ${u.password}`);
    return u.usuario === this.usuario && u.password === this.password;
  });

  if (!user) {
    alert("Credenciales incorrectas. Mira la consola (F12) para ver por qué.");
    return;
  }
  if (user.activo === false) {
    alert("Acceso denegado: Tu usuario está desactivado. Contacta al administrador.");
    return;
  }

  this.store.iniciarSesion(user);
  if (user.rol === "admin") {
    this.$router.push("/admin");
  } else {
    this.$router.push("/empleado");
  }
}
  }
};
</script>