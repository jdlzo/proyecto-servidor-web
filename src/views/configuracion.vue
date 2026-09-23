<template>
  <section class="config-panel">
    <header class="config-header">
      <h2>Configuración del Sistema</h2>
      <p class="subtitulo">Administra las cuentas de los empleados, administradores y sus roles.</p>
    </header>

    <div class="config-grid">
      
      <div class="card form-card">
        <h3>{{ editandoId ? '📝 Editar Usuario' : '➕ Añadir Nuevo Usuario' }}</h3>
        
        <form @submit.prevent="guardarUsuario">
          <div class="form-group">
            <label>Nombre Completo</label>
            <input v-model="form.nombre" type="text" placeholder="Ej. Juan Pérez" required>
          </div>

          <div class="form-group">
            <label>Nombre de Usuario (Login)</label>
            <input v-model="form.usuario" type="text" placeholder="Ej. juan.perez" required>
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <input v-model="form.password" type="text" placeholder="Ej. 12345abc" required>
          </div>

          <div class="form-group">
            <label>Rol del Usuario</label>
            <select v-model="form.rol">
              <option value="empleado">Empleado</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div class="form-acciones">
            <button type="submit" class="btn btn-guardar">
              {{ editandoId ? 'Actualizar' : 'Registrar Usuario' }}
            </button>
            <button v-if="editandoId" type="button" @click="cancelarEdicion" class="btn btn-cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div class="card table-card">
        <h3>Usuarios en el Sistema ({{ store.empleados.length }})</h3>
        
        <div class="table-container">
          <table class="tabla-usuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in store.empleados" :key="user.id">
                <td class="user-nombre">{{ user.nombre }}</td>
                <td><code>{{ user.usuario }}</code></td>
                <td>
                  <span :class="['badge-rol', user.rol]">
                    {{ user.rol === 'admin' ? '👑 Admin' : '👤 Empleado' }}
                  </span>
                </td>
                <td class="acciones-celda">
                  <button @click="cargarParaEditar(user)" class="btn-icon btn-edit" title="Editar">✏️</button>
                  <button @click="eliminarUsuario(user.id)" class="btn-icon btn-delete" title="Eliminar">🗑️</button>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      form: {
        nombre: "",
        usuario: "",
        password: "",
        rol: "empleado"
      },
      editandoId: null 
    };
  },
  methods: {

    guardarUsuario() {
      if (this.editandoId) {

        const index = this.store.empleados.findIndex(e => e.id === this.editandoId);
        if (index !== -1) {
          this.store.empleados[index] = { 
            ...this.store.empleados[index], 
            ...this.form 
          };
        }
      } else {

        const nuevoUsuario = { 
          id: Date.now(), 
          ...this.form, 
          asistencias: 0, 
          atrasos: 0, 
          inasistencias: 0 
        };
        this.store.empleados.push(nuevoUsuario);
      }


      this.store.guardarEnLocal();
      
      alert("¡Guardado correctamente!");
      this.resetearFormulario();
    },


    eliminarUsuario(id) {
      if (confirm("¿Seguro que quieres borrar?")) {
        this.store.eliminarEmpleado(id); // Esto llama a guardarEnLocal dentro del store
        if (this.editandoId === id) this.resetearFormulario();
      }
    },


    cargarParaEditar(usuario) {
      this.editandoId = usuario.id;
      this.form = { ...usuario };
    },

    resetearFormulario() {
      this.editandoId = null;
      this.form = { nombre: "", usuario: "", password: "", rol: "empleado" };
    }
  }
};
</script>

<style scoped>

.config-panel {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  color: #1e293b;
}

.config-header {
  margin-bottom: 26px;
}

.config-header h2 {
  font-size: 24px;
  margin: 0 0 4px 0;
}

.subtitulo {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

/* Grid de distribución (Formulario Izquierda - Tabla Derecha) */
.config-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 850px) {
  .config-grid {
    grid-template-columns: 380px 1fr;
  }
}

/* Tarjetas */
.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
  border: 1px solid #f1f5f9;
}

.card h3 {
  margin: 0 0 20px 0;
  font-size: 16px;
  color: #0f172a;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 10px;
}

/* Formularios */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.form-group input, 
.form-group select {
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus, 
.form-group select:focus {
  border-color: #6366f1;
}

.form-acciones {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

/* Botones */
.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
}

.btn-guardar {
  background-color: #4f46e5;
  color: white;
}

.btn-guardar:hover {
  background-color: #4338ca;
}

.btn-cancelar {
  background-color: #e2e8f0;
  color: #475569;
}

.btn-cancelar:hover {
  background-color: #cbd5e1;
}

/* Tabla de Usuarios */
.table-container {
  overflow-x: auto;
}

.tabla-usuarios {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.tabla-usuarios th, 
.tabla-usuarios td {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.tabla-usuarios th {
  background-color: #f8fafc;
  color: #64748b;
  font-weight: 600;
}

.user-nombre {
  font-weight: 600;
  color: #334155;
}

/* Etiquetas de roles (Badges) */
.badge-rol {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.badge-rol.admin {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-rol.empleado {
  background-color: #e0f2fe;
  color: #0369a1;
}

/* Botones de acción de la tabla */
.acciones-celda {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.btn-icon:hover {
  background-color: #f1f5f9;
}
</style>