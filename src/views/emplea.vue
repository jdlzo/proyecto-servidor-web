<template>
  <section class="empleados">
    <h2>Panel de Administración - Justificantes</h2>

    <div v-if="store.justificantes && store.justificantes.length" class="table-container">
      <table class="tabla-justificantes">
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Archivo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="j in store.justificantes" :key="j.id">
            
            <td class="nombre-empleado">{{ j.nombreEmpleado }}</td>
            
            <td>
              <a :href="j.urlPDF" target="_blank" class="link-pdf">
                📄 {{ j.nombreArchivo || 'Ver PDF' }}
              </a>
            </td>
            
            <td>
              <span :class="['badge', j.estado || 'pendiente']">
                {{ j.estado || 'pendiente' }}
              </span>
            </td>
            
            <td class="acciones">
              <button 
                @click="cambiarEstado(j.id, 'aceptado')" 
                class="btn btn-aceptar"
                :disabled="j.estado === 'aceptado'"
              >
                Aceptar
              </button>
              
              <button 
                @click="cambiarEstado(j.id, 'rechazado')" 
                class="btn btn-rechazar"
                :disabled="j.estado === 'rechazado'"
              >
                Rechazar
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="sin-datos">
      No hay justificantes aún
    </p>
  </section>
</template>

<script>
import { store } from "@/store";

export default {
  data() {
    return {
      store
    };
  },
  methods: {

    cambiarEstado(idJustificante, nuevoEstado) {
      const justificante = this.store.justificantes.find(j => j.id === idJustificante);
      
      if (justificante) {

        justificante.estado = nuevoEstado;
        

      }
    }
  }
};
</script>

<style scoped>

.empleados {
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
  font-family: sans-serif;
}

h2 {
  color: #1e293b;
  margin-bottom: 20px;
}

/* Diseño de la Tabla */
.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.tabla-justificantes {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.tabla-justificantes th, 
.tabla-justificantes td {
  padding: 14px 18px;
  border-bottom: 1px solid #e2e8f0;
}

.tabla-justificantes th {
  background-color: #f8fafc;
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
}

.nombre-empleado {
  font-weight: 600;
  color: #334155;
}

.link-pdf {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.link-pdf:hover {
  text-decoration: underline;
}

/* Clases para las etiquetas de Estado (Badges) */
.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
}

.badge.pendiente {
  background-color: #fef3c7;
  color: #d97706;
}

.badge.aceptado {
  background-color: #d1fae5;
  color: #065f46;
}

.badge.rechazado {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Contenedor y Estilos de Botones */
.acciones {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-aceptar {
  background-color: #10b981;
  color: white;
}

.btn-aceptar:hover:not(:disabled) {
  background-color: #059669;
}

.btn-rechazar {
  background-color: #ef4444;
  color: white;
}

.btn-rechazar:hover:not(:disabled) {
  background-color: #dc2626;
}

.sin-datos {
  color: #64748b;
  font-style: italic;
  margin-top: 16px;
}
</style>