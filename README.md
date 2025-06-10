# mlink_server

MLink App: proyecto full stack con Node, Express, TypeSript, React y Tailwind

## Remake 3 (backend)

Realización de testing con JEST

* Instalación de jest en el proyecto
    npm install --save-dev jest ts-jest @types/jest
* Inicializar jest.config.js
    npx ts-jest config:init => Esto creará el archivo de configuración (js)
* Cambiamos el jest.config.js a jest.config.ts (código)
    Además, luego tendremos que inicializar jest con:
    npx jest --config jest.config.ts
* Añadimos el directorio "tests" en el include del tsconfig.json
* Creamos un tscofig.build.json que heredará del tsconfig.json pero sin los tests (para producción)
* Instalación de supertest (hacer test en peticiones)
* Si queremos ejecutar un único test:
    npx jest tests/searchUser.test.ts
    o
    npm test -- tests/register.test.ts

## Remake 2 (backend)

* Realizado endpoint para cambiar nombre y contraseña (opcional)
* Si se sube una nueva imagen, se borra la anterior de Cloudinary
* Crear endpoint para eliminar la cuenta
* Crear /health endpoint

## Remake 1 (backend)

Cambio global de la clave "handle" por "username" en todos los ficheros.
He comentado código

## Sprint 5 (backend)

Gestionar las páginas públicas

* Endpoint del buscador de handles

## Sprint 4 (backend)

Gestionar subida de imágenes

* Instalación y configuración cloudinary
npm install cloudinary
npm i formidable
* Creación de enfpoint para subir imagenes
Para generar nombre de archivo aleatorio: npm i uuid


## Sprint 3 (backend)

Instalación y configuración de CORS, JWT, Cookies.

* Instalación de CORS + types
* Configuración de CORS para admitir peticiones desde el frontend
* Configuración Json Web Token
* Endpoint "/user" para autenticar usuario
* Creando middleware de autenticación
* Actualizar los datos de un usuario

## Sprint 2 (backend)

Registro y autenticación de usuarios

* Creación de modelo User + Interface TS
* Creación de Handler de usuuarios (controlador)
* Hashing del password con bcrypt
* Transformación del handle con slug (v 1.1.0 para que funcione)
* Validación con express validator
* Login de usuarios
* Middleware de validación


## Sprint 1 (backend)

Configuración inicial del backend.
Secciones 1-6

* Configuración inicial de express
* Instalación de nodemon
* Configurar modulos ESM
* Configurar TypeScript
* Configuración de Router
* Configuración de MongoDB, Mongoose y Mongo Atlas
* Agregar colores a la consola
