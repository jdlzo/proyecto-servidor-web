<template>
<aside class="barra-lateral">

  <div class="logo-empresa">
    <div class="icono-logo">
      <i class="fa-solid fa-users"></i>
    </div>

    <div>
      <h3>Talento Humano</h3>
      <span>Empresa S.A.</span>
    </div>
  </div>

  <nav>

    <router-link to="/" class="activo">
      <i class="fa-solid fa-house"></i>
      Dashboard
    </router-link>

    <p class="titulo-seccion">ASISTENCIA</p>

    <router-link to="/emplea">
      <i class="fa-solid fa-user"></i>
      Empleados
    </router-link>

    <router-link to="/configuracion">
      <i class="fa-solid fa-gear"></i>
      Configuración
    </router-link>

  </nav>

</aside>

</template>

<script>
export default {};
</script>