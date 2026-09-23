<template>
  <div class="panel-resumen">
    <header class="header-panel">
      <h2>Resumen General de Asistencia</h2>
      <p class="subtitulo">Métricas acumuladas de todo el personal</p>
    </header>

    <div class="metricas-grid">
      
      <div class="tarjeta-metrica asistencias">
        <div class="icono-wrapper"></div>
        <div class="datos-metrica">
          <span class="etiqueta">Total Asistencias</span>
          <strong class="valor">{{ totalAsistencias }}</strong>
        </div>
      </div>

      <div class="tarjeta-metrica retrasos">
        <div class="icono-wrapper"></div>
        <div class="datos-metrica">
          <span class="etiqueta">Total Retrasos</span>
          <strong class="valor">{{ totalRetrasos }}</strong>
        </div>
      </div>

      <div class="tarjeta-metrica atrasos">
        <div class="icono-wrapper"></div>
        <div class="datos-metrica">
          <span class="etiqueta">Total Atrasos</span>
          <strong class="valor">{{ totalAtrasos }}</strong>
        </div>
      </div>

    </div>

    <div class="footer-panel">
      <span>Sincronizado con datos.json</span>
      <span>Empleados activos: <strong>{{ empleados.length }}</strong></span>
    </div>
  </div>
</template>

<script>
// Importa directamente tu archivo JSON local
import datosEmpleados from "../data/datos.json";

export default {
  data() {
    return {
      
      empleados: datosEmpleados || []
    };
  },
  computed: {
    
    totalAsistencias() {
      return this.empleados.reduce((suma, emp) => suma + (Number(emp.asistencias) || 0), 0);
    },
    
    totalRetrasos() {
      return this.empleados.reduce((suma, emp) => suma + (Number(emp.retrasos) || 0), 0);
    },
    
    totalAtrasos() {
      return this.empleados.reduce((suma, emp) => suma + (Number(emp.atrasos) || 0), 0);
    }
  }
};
</script>

<style scoped>

.panel-resumen {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  max-width: 800px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, sans-serif;
}

.header-panel {
  margin-bottom: 20px;
}

.header-panel h2 {
  margin: 0 0 4px 0;
  font-size: 20px;
  color: #1e293b;
}

.subtitulo {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

/* Grid de Tarjetas */
.metricas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

/* Estilo Base de las Tarjetas de Métricas */
.tarjeta-metrica {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s;
}

.tarjeta-metrica:hover {
  transform: translateY(-2px);
}

.icono-wrapper {
  font-size: 24px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.datos-metrica {
  display: flex;
  flex-direction: column;
}

.etiqueta {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.valor {
  font-size: 22px;
  color: #0f172a;
  font-weight: 700;
}

/* Variaciones de Color según la Métrica */
.asistencias {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
}
.asistencias .icono-wrapper {
  background-color: #d1fae5;
}

.retrasos {
  background-color: #fffbeb;
  border-color: #fde68a;
}
.retrasos .icono-wrapper {
  background-color: #fef3c7;
}

.atrasos {
  background-color: #fef2f2;
  border-color: #fecaca;
}
.atrasos .icono-wrapper {
  background-color: #fee2e2;
}

/* Pie del Panel */
.footer-panel {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
  border-top: 1px solid #f1f5f9;
  padding-top: 12px;
}
</style>