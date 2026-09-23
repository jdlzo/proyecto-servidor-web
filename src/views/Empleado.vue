<template>
  <section class="empleado-panel">
    
    <header class="panel-header">
      <h1>Mi Panel de Asistencia</h1>
      <p class="bienvenida">Hola, <strong>{{ empleado.nombre || empleado.usuario }}</strong></p>
    </header>

    <div class="stats-grid">
      <div class="card card-asistencias">
        <h3>Asistencias</h3>
        <p class="stat-value">{{ empleado.asistencias || 0 }}</p>
      </div>

      <div class="card card-inasistencias">
        <h3>Inasistencias</h3>
        <p class="stat-value">{{ empleado.inasistencias || 0 }}</p>
      </div>

      <div class="card card-atrasos">
        <h3>Atrasos</h3>
        <p class="stat-value">{{ empleado.atrasos || 0 }}</p>
      </div>
    </div>

    <div class="acciones-container">
      <div class="marcado-box">
        <button 
          @click="marcarEntrada" 
          :disabled="empleado.entrada"
          class="btn btn-entrada"
        >
          {{ empleado.entrada ? 'Entrada Registrada' : 'Registrar Entrada' }}
        </button>
        <span v-if="empleado.entrada" class="hora-registro"> {{ empleado.entrada }}</span>
      </div>

      <div class="marcado-box">
        <button 
          @click="marcarSalida" 
          :disabled="!empleado.entrada || empleado.salida"
          class="btn btn-salida"
        >
          {{ empleado.salida ? 'Salida Registrada' : 'Registrar Salida' }}
        </button>
        <span v-if="empleado.salida" class="hora-registro"> {{ empleado.salida }}</span>
      </div>
    </div>

    <div class="justificante-section">
      <h3>¿Faltaste o tuviste un retraso?</h3>
      <p class="justificante-sub">Sube tu justificante médico o laboral en formato PDF.</p>
      
      <div class="file-upload-wrapper">
        <input type="file" accept="application/pdf" @change="subirPDF" id="pdf-file">
        <label for="pdf-file" class="custom-file-label">📄 Seleccionar documento PDF</label>
      </div>
    </div>

  </section>
</template>

<script>
import { store } from "@/store";

export default {
  data() {
    return {
      store,
      horaEntradaLimite: "09:30"
    };
  },
  

  computed: {
    empleado() {

      if (!this.store.usuarioLogueado) return {};
      
      return this.store.empleados.find(e => e.id === this.store.usuarioLogueado.id) || {};
    }
  },

  methods: {
    obtenerHora() {
      const now = new Date();
      return now.toTimeString().slice(0, 5);
    },

    marcarEntrada() {
      if (this.empleado.entrada) return;

      const hora = this.obtenerHora();
      this.empleado.entrada = hora;

      if (this.empleado.asistencias === undefined) this.empleado.asistencias = 0;
      if (this.empleado.atrasos === undefined) this.empleado.atrasos = 0;

      this.empleado.asistencias++;

      if (hora > this.horaEntradaLimite) {
        this.empleado.atrasos++;
      }


      this.store.registros.push({
        tipo: "entrada",
        hora,
        empleado: this.empleado.nombre
      });


      this.store.guardarEnLocal();
    },

    marcarSalida() {
      if (this.empleado.salida) return;

      const hora = this.obtenerHora();
      this.empleado.salida = hora;

      this.store.registros.push({
        tipo: "salida",
        hora,
        empleado: this.empleado.nombre
      });

      this.store.guardarEnLocal();
    },

    subirPDF(event) {
      const file = event.target.files[0];
      if (!file) return;

      const pdf = {
        id: Date.now(),
        empleadoId: this.empleado.id,
        nombreEmpleado: this.empleado.nombre,
        nombreArchivo: file.name,
        urlPDF: URL.createObjectURL(file),
        estado: "pendiente",
        fecha: new Date().toLocaleDateString()
      };

      this.store.justificantes.push(pdf);
      this.store.guardarEnLocal();
      
      alert(`Justificante enviado.`);
    }
  }
};
</script>

<style scoped>

.empleado-panel {
  padding: 30px;
  max-width: 900px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #1e293b;
}

.panel-header {
  margin-bottom: 24px;
}

.panel-header h1 {
  font-size: 24px;
  margin: 0 0 4px 0;
  color: #0f172a;
}

.bienvenida {
  margin: 0;
  color: #64748b;
  font-size: 15px;
}

/* Tarjetas Estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
}

.card {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  border-top: 4px solid #cbd5e1;
}

.card h3 {
  font-size: 13px;
  color: #64748b;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

.card-asistencias { border-top-color: #10b981; }
.card-inasistencias { border-top-color: #64748b; }
.card-atrasos { border-top-color: #f59e0b; }

/* Contenedor de Acciones (Marcado) */
.acciones-container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.marcado-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn-entrada {
  background-color: #2563eb;
  color: white;
}
.btn-entrada:hover:not(:disabled) { background-color: #1d4ed8; }

.btn-salida {
  background-color: #475569;
  color: white;
}
.btn-salida:hover:not(:disabled) { background-color: #334155; }

.btn:disabled {
  background-color: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
}

.hora-registro {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

/* Sección Justificantes */
.justificante-section {
  padding: 24px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.justificante-section h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #0f172a;
}

.justificante-sub {
  margin: 0 0 16px 0;
  font-size: 13px;
  color: #64748b;
}

.file-upload-wrapper {
  position: relative;
}

#pdf-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.custom-file-label {
  display: inline-block;
  padding: 10px 16px;
  background: white;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #334155;
  transition: all 0.2s;
}

.custom-file-label:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}
</style>