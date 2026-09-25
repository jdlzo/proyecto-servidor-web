
# ControlAsistencia

Hice unos cambios, primero debes crear la base de datos en postgresql con el nombre:
```
servernest
```
Despues dentro de pgadmin copias el script con las tablas que se encuentra en:
```
\nestjs\database\init.sql
```
Despues de crear la base de datos y crear las tablas deberas modificar la conexion en nest, dirigete a:
```
\nestjs\src\app.module.ts
```
Y cambia lo siguiente:
```
TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, /*si tienes otro puerto configurado cambialo*/
      username: 'postgres', /*cambialo por el usuario de posgre que tengas*/
      password: '', /*cambialo por la contraseña de tu db*/
      database: 'servernest',
      entities: [],
      synchronize: false,
    }),
```
This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
