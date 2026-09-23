
<template>
  <div class="contenedor">

    <Sidebar />

    <main class="contenido-principal">

      <Header />

      <Estadisticas />

      <section class="seccion-central">

        <Calendario />

        <Actividad />

      </section>

      <TablaEmpleados />

    </main>

  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import Estadisticas from "../components/Estadisticas.vue";
import Calendario from "../components/Calendario.vue";
import Actividad from "../components/Actividad.vue";
import TablaEmpleados from "../components/TablaEmpleados.vue";
import emplea from "./emplea.vue";
import { store } from "@/store";


export default {
  components: {
    Sidebar,
    Header,
    Estadisticas,
    Calendario,
    Actividad,
    TablaEmpleados,
    emplea,
  },
  data() {
    return {
      store
    };
  }
};

</script>

<style>
@import "../assets/CSS/style.css";
</style>