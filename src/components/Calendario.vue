<template>

<div class="tarjeta-calendario">

<h2>Calendario de Asistencia</h2>

<div class="controles-calendario">

<button @click="mesAnterior">
<
</button>

<div>{{ mesActual }}</div>

<button @click="mesSiguiente">
>
</button>

</div>

<table>

<tbody>

<tr
v-for="(fila,index) in calendario"
:key="index"
>

<td
v-for="(dia,i) in fila"
:key="i"
:class="{ 'dia-actual': dia.esHoy }"
>

{{ dia.numero }}

</td>

</tr>

</tbody>

</table>

</div>

</template>

<script>
export default {

  data() {
    return {

      nombresMeses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],

      fechaActual: new Date(),

      calendario: []

    };
  },

  computed: {

    mesActual() {
      return `${this.nombresMeses[this.fechaActual.getMonth()]} ${this.fechaActual.getFullYear()}`;
    }

  },

  methods: {

    generarCalendario() {

      const año = this.fechaActual.getFullYear();
      const mes = this.fechaActual.getMonth();

      const primerDia = new Date(año, mes, 1).getDay();
      const diasMes = new Date(año, mes + 1, 0).getDate();

      const hoy = new Date();

      let semanas = [];
      let fila = [];

      for (let i = 0; i < primerDia; i++) {
        fila.push({
          numero: "",
          esHoy: false
        });
      }

      for (let dia = 1; dia <= diasMes; dia++) {

        if (fila.length === 7) {
          semanas.push(fila);
          fila = [];
        }

        fila.push({

          numero: dia,

          esHoy:
            dia === hoy.getDate() &&
            mes === hoy.getMonth() &&
            año === hoy.getFullYear()

        });

      }

      while (fila.length < 7) {

        fila.push({
          numero: "",
          esHoy: false
        });

      }

      semanas.push(fila);

      this.calendario = semanas;

    },

    mesAnterior() {

      this.fechaActual.setMonth(
        this.fechaActual.getMonth() - 1
      );

      this.fechaActual = new Date(this.fechaActual);

      this.generarCalendario();

    },

    mesSiguiente() {

      this.fechaActual.setMonth(
        this.fechaActual.getMonth() + 1
      );

      this.fechaActual = new Date(this.fechaActual);

      this.generarCalendario();

    }

  },

  mounted() {

    this.generarCalendario();

  }

};
</script>