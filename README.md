# Mlink App (server)

Mlink es una app tipo "link tree" pensada para músicos. En ella puedes crear tu perfil, tener tu "username" único y un enlace para compartir de una sola vez todas tus redes sociales como artista musical.

### Enlace al proyecto desplegado: 

[![VER PROYECTO](https://img.shields.io/badge/🚀_Proyecto_Desplegado-007acc?style=for-the-badge&logo=vercel&logoColor=white)](https://mlink.alday.dev)

## Tecnilogías utilizadas para el backend:

### 🚀 LENGUAJE  
![TYPESCRIPT](https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### 🛠️ ENTORNO DE DESARROLLO  
![NODE.JS](https://img.shields.io/badge/NODE.JS-339933?style=for-the-badge&logo=node.js&logoColor=white) ![EXPRESS](https://img.shields.io/badge/EXPRESS-000000?style=for-the-badge&logo=express&logoColor=white) ![NODEMON](https://img.shields.io/badge/NODEMON-76D04B?style=for-the-badge&logo=npm&logoColor=white)

### 📦 DEPENDENCIAS  
![BCRYPT](https://img.shields.io/badge/BCRYPT-CC3534?style=for-the-badge&logo=npm&logoColor=white) ![CORS](https://img.shields.io/badge/CORS-CC3534?style=for-the-badge&logo=npm&logoColor=white)  ![DOTENV](https://img.shields.io/badge/DOTENV-CC3534?style=for-the-badge&logo=npm&logoColor=white)  ![EXPRESS-VALIDATOR](https://img.shields.io/badge/EXPRESS--VALIDATOR-CC3534?style=for-the-badge&logo=npm&logoColor=white)  ![FORMIDABLE](https://img.shields.io/badge/FORMIDABLE-CC3534?style=for-the-badge&logo=npm&logoColor=white)  ![JSONWEBTOKEN](https://img.shields.io/badge/JSONWEBTOKEN-CC3534?style=for-the-badge&logo=npm&logoColor=white)  ![SLUG](https://img.shields.io/badge/SLUG-CC3534?style=for-the-badge&logo=npm&logoColor=white)  ![UUID](https://img.shields.io/badge/UUID-CC3534?style=for-the-badge&logo=npm&logoColor=white)

### 🗄️ BASE DE DATOS  
![MONGOOSE](https://img.shields.io/badge/MONGOOSE-880000?style=for-the-badge&logo=mongodb&logoColor=white)  ![MONGODB](https://img.shields.io/badge/MONGODB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### 🧪 TESTING  
![JEST](https://img.shields.io/badge/JEST-C21325?style=for-the-badge&logo=jest&logoColor=white)  ![SUPERTEST](https://img.shields.io/badge/SUPERTEST-CC3534?style=for-the-badge&logo=npm&logoColor=white)

### 📚 DOCUMENTACIÓN  
![SWAGGER](https://img.shields.io/badge/SWAGGER-2596BE?style=for-the-badge&logo=swagger&logoColor=white)

## Enlace al repositorio del front:

[![VER REPOSITORIO](https://img.shields.io/badge/📂_Repositorio_Frontend-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aldaydev/mlink_client)

----------------------------------------------

A partir de aquí podrás ver mis anotaciones sobre cada "sprint" o "rama" en la que ido trabajando. 

## Docker

Configuración de docker para desplegar en EC2 (AWS)
* Crear archivos dockerfile y .dockerignore
* Crear imagen ==> 

## Doc (backend)

Documentación con swagger de todos los endpoints

* Instalación de swagger y yaml
    - npm install swagger-ui-express yamljs swagger-jsdoc
    - Instalamos los types de jsdoc ==> npm install --save-dev @types/swagger-jsdoc
    - Instalamos los ypes de swagger ui ==> npm i --save-dev @types/swagger-ui-express
    - Instalamos los types de yaml ==> npm install --save-dev @types/yamljs
* Creación del directorio /tests y el archivo general swagger.yaml
* Creación de schemas y respuestas predefinidas
* Documentación de todos los endpoints


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
