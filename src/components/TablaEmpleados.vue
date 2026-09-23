<template>
  <section>

    <h2>Empleados</h2>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Asistencias</th>
          <th>Inasistencias</th>
          <th>Atrasos</th>
          <th>Entrada</th>
          <th>Salida</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="e in store.empleados" :key="e.id">

          <td>{{ e.nombre }}</td>
          <td>{{ e.asistencias }}</td>
          <td>{{ e.inasistencias }}</td>
          <td>{{ e.atrasos }}</td>
          <td>{{ e.entrada }}</td>
          <td>{{ e.salida }}</td>

        </tr>
      </tbody>

    </table>

  </section>
</template>
<script>
import { store } from "@/store";

export default {
  props: ["empleados"],

  data() {
    return {
      store
    };
  },

  methods: {
    subirPDF(event, empleado) {
      const file = event.target.files[0];

      if (!file) return;

      const nuevoPDF = {
        nombre: file.name,
        url: URL.createObjectURL(file),
        fecha: new Date().toLocaleDateString()
      };

      empleado.justificantes.push(nuevoPDF);

      this.store.actividades.push({
        texto: `${empleado.nombre} subió un justificante`,
        tiempo: "Ahora"
      });
    }
  }
};
</script>