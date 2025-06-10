# Mlink (server)

Mlink es una app tipo "link tree" pensada para músicos. En ella puedes crear tu perfil, tener tu "username" único y un enlace para compartir de una sola vez todas tus redes sociales como artista musical.

Tecnilogías utilizadas para el backend:

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-CC3534?style=flat&logo=npm&logoColor=white)
![cors](https://img.shields.io/badge/cors-CC3534?style=flat&logo=npm&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-CC3534?style=flat&logo=npm&logoColor=white)
![express-validator](https://img.shields.io/badge/express--validator-CC3534?style=flat&logo=npm&logoColor=white)
![formidable](https://img.shields.io/badge/formidable-CC3534?style=flat&logo=npm&logoColor=white)
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-CC3534?style=flat&logo=npm&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongodb&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![slug](https://img.shields.io/badge/slug-CC3534?style=flat&logo=npm&logoColor=white)
![uuid](https://img.shields.io/badge/uuid-CC3534?style=flat&logo=npm&logoColor=white)
![nodemon](https://img.shields.io/badge/nodemon-76D04B?style=flat&logo=npm&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/supertest-CC3534?style=flat&logo=npm&logoColor=white)


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
