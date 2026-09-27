# Sistema de Control de Asistencia Laboral

## Descripción del Problema

En el ámbito laboral, mantener el control de la puntualidad y de la asistencia es esencial para asegurar la productividad y la gestión del talento humano. Teniendo en cuenta aquellos métodos tradicionales que usan formatos físicos o registros manuales que presentan deficiencias como la perdida de información o procesos lentos, se ha pensado en el desarrollo de esta API REST que centraliza, automatiza y audita los registros de marcación laboral y administración de horarios e incidencias.

## Usuarios Previstos

Se han determinado dos roles claros con permisos específicos para la interacción con el sistema:

1. **Administrador / Gestión Humana:**
   * **Perfil:** personal encargado de supervisar el cumplimiento del horario laboral.
   * **Acciones:**
     * Visualizar el Dashboard general de asistencias, atrasos e inasistencias.
     * Gestionar usuarios, roles y asignación de horarios laborales.
     * Revisar, aprobar o rechazar justificantes médicos o laborales adjuntados por los empleados.

2. **Empleado:**
   * **Perfil:** personal operativo de la organización.
   * **Acciones:**
     * Registrar en tiempo real sus marcaciones de Entrada y Salida.
     * Consultar su historial personal de asistencias y atrasos.
     * Cargar justificantes en formato PDF ante faltas o retrasos cometidos.

## Recurso Principal que Administrará la API

El recurso central alrededor del cual orbita la API es la entidad **Asistencia**.

* **Nombre del Recurso:** `./asistencia`
* **Propósito:** registrar, gestionar y calcular los estados de puntualidad de cada empleado basado en el horario.
* **Funcionalidad clave:** Representa el evento de marcación diario de un usuario, calculando de manera automática el tiempo de atraso en función del Horario asignado, asociando los Justificantes que respalden faltas, y registrando las estampas de tiempo (timestamp) de entrada y salida.

## Diagrama de Entidades

* **asistencia:** gestiona las marcaciones diarias de entrada y salida de los usuarios.
* **horario:** define y administra los horarios laborales asignados.
* **justificante:** recibe y gestiona las solicitudes de justificación (PDFs) para inasistencias o atrasos.
* **rol:** define los niveles de autorización del sistema (Administrador, Empleado).
* **usuario:** administra la información de perfil, credenciales y asignaciones de personal.

```
nestjs/
├── database/
│   └── init.sql
└── src/
    ├── asistencia/
    │   ├── dto/
    │   │   └── asistencia.dto.ts
    │   ├── entities/
    │   │   └── asistencia.entity.ts
    │   ├── asistencia.controller.ts
    │   ├── asistencia.module.ts
    │   └── asistencia.service.ts
    ├── horario/
    │   ├── dto/
    │   │   └── horario.dto.ts
    │   ├── entities/
    │   │   └── horario.entity.ts
    │   ├── horario.controller.spec.ts
    │   ├── horario.controller.ts
    │   ├── horario.module.ts
    │   ├── horario.service.spec.ts
    │   └── horario.service.ts
    ├── justificante/
    │   ├── dto/
    │   │   └── justificante.dto.ts
    │   ├── entities/
    │   │   └── justificante.entity.ts
    │   ├── justificante.controller.spec.ts
    │   ├── justificante.controller.ts
    │   ├── justificante.module.ts
    │   ├── justificante.service.spec.ts
    │   └── justificante.service.ts
    ├── rol/
    │   ├── dto/
    │   │   └── rol.dto.ts
    │   ├── entities/
    │   │   └── rol.entity.ts
    │   ├── rol.controller.spec.ts
    │   ├── rol.controller.ts
    │   ├── rol.module.ts
    │   ├── rol.service.spec.ts
    │   └── rol.service.ts
    ├── usuario/
    │   ├── dto/
    │   │   └── usuario.dto.ts
    │   ├── entities/
    │   │   └── usuario.entity.ts
    │   ├── usuario.controller.ts
    │   ├── usuario.module.ts
    │   └── usuario.service.ts
    ├── app.controller.spec.ts
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    └── main.ts
```