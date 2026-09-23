<template>
  <section class="panel-estadisticas">

    <div class="tarjeta-estadistica">
      <h4>Asistencias Hoy</h4>
      <h2>{{ asistenciasHoy }}</h2>
      <p>{{ porcentajeAsistencias }}% del total</p>
    </div>

    <div class="tarjeta-estadistica">
      <h4>Faltas Hoy</h4>
      <h2>{{ faltasHoy }}</h2>
      <p>{{ porcentajeFaltas }}% del total</p>
    </div>

    <div class="tarjeta-estadistica">
      <h4>Atrasos Hoy</h4>
      <h2>{{ atrasosHoy }}</h2>
      <p>{{ porcentajeAtrasos }}% del total</p>
    </div>

    <div class="tarjeta-estadistica">
      <h4>Empleados Activos</h4>
      <h2>{{ totalEmpleados }}</h2>
      <p>Total empleados</p>
    </div>

    <div class="tarjeta-estadistica justificantes">
      <h4>Justificantes Pendientes</h4>

      <div class="justificantes-bloque">
        <h2>{{ justificantesPendientes }}</h2>

        <router-link to="/emplea" class="btn-editar">
          <i class="fa-solid fa-pen"></i>
        </router-link>
      </div>

      <p>Por revisar</p>
    </div>

  </section>
</template>

<script>
import { store } from "@/store";

export default {
  data() {
    return {
      store,
      horaEntradaLimite: "08:00"
    };
  },
  computed: {

    empleadosReales() {
      return this.store.empleados.filter(e => e.rol === 'empleado');
    },


    totalEmpleados() {
      return this.empleadosReales.length;
    },

    asistenciasHoy() {

      return this.empleadosReales.filter(e => e.entrada).length;
    },

    atrasosHoy() {

      return this.empleadosReales.filter(e => e.entrada && e.entrada > this.horaEntradaLimite).length;
    },

    faltasHoy() {

      const faltas = this.totalEmpleados - this.asistenciasHoy;
      return faltas < 0 ? 0 : faltas; 
    },


    porcentajeAsistencias() {
      if (!this.totalEmpleados) return 0;
      return Math.round((this.asistenciasHoy / this.totalEmpleados) * 100);
    },

    porcentajeFaltas() {
      if (!this.totalEmpleados) return 0;
      return Math.round((this.faltasHoy / this.totalEmpleados) * 100);
    },

    porcentajeAtrasos() {
      if (!this.totalEmpleados) return 0;
      return Math.round((this.atrasosHoy / this.totalEmpleados) * 100);
    },


    justificantesPendientes() {
      if (!this.store.justificantes) return 0;
      return this.store.justificantes.filter(j => j.estado === 'pendiente').length;
    }
  }
};
</script>

<style>

.panel-estadisticas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.tarjeta-estadistica {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.tarjeta-estadistica h4 {
  margin: 0 0 10px 0;
  color: #6b7280;
  font-size: 14px;
}

.tarjeta-estadistica h2 {
  margin: 0 0 5px 0;
  font-size: 28px;
  color: #111827;
}

.tarjeta-estadistica p {
  margin: 0;
  font-size: 13px;
  color: #9ca3af;
}

.justificantes {
    position: relative;
}

.justificantes-bloque {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-editar {
    width: 32px;
    height: 32px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;

    background: #6366f1;
    color: white;

    text-decoration: none;

    transition: 0.3s;
}

.btn-editar:hover {
    background: #4f46e5;
    transform: scale(1.05);
}
</style>