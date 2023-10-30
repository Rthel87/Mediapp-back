# Mediapp-back

## Entorno de desarrollo
* NodeJS v20.9.0
* npm v10.2.1
* PostgreSQL v12

## Instalación
La siguiente descripción de instalación se realiza considerando un sistema local con Ubuntu 20.04. Para otras distribuciones de sistemas operativos pueden haber variaciones en los comandos indicados.
### nvm-sh
*nvm-sh* es una herramienta que permite instalar múltiples versiones de NodeJS en el sistema, por lo cual permite elegir la versión específica a utilizar. Para su instalación se debe contar con cURL instalado:
```
sudo apt update
sudo apt install curl
```
Instalar *nvm-sh* a través del script de instalación proporcionado en la documentación oficial:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
Ejecutar el siguiente comando para que la consola del sistema reconozca las instrucciones de *nvm-sh* en las siguientes sesiones de trabajo:
```
source ~/.bashrc
```
Cerrar la sesión actual y volver a abrir la consola para continuar con la instalación.

### Node.js
Con la ayuda de *nvm-sh* ya es posible instalar la versión de *NodeJS* requerida a través del siguiente comando:
```
nvm install 20.9
```
Verificar la versión de *NodeJS* instalada:
```
node --version
```
Verificar la versión de npm instalada:
```
npm --version
```

### PostgreSQL
Instalar *PostgreSQL* en el sistema:
```
sudo apt install postgresql postgresql-contrib libpq-dev
```
Cambiar a usuario postgres e ingresar a la consola de postgres:
```
sudo su - postgres
psql
```
Crear un rol para el usuario actual, con permiso de creación de bases de datos y establecer su password de acceso:
```
create role 'tu_usuario' with createdb login password 'tu_password';
```
Crear la base de datos por defecto del nuevo rol creado:
```
create database 'tu_usuario';
```
Salir de la consola psql:
```
\q
```
Salir de la consola como usuario postgres:
```
exit
```
Probar acceso a psql con el nuevo usuario creado:
```
psql
```

### Clonar repositorio, instalar dependencias, y desplegar en entorno de desarrollo
Clonar el repositorio e ingresar al directorio de la aplicación:
```
git clone https://github.com/Rthel87/Mediapp-back.git mediapp-back
cd mediapp-back
```
Generar archivo de variables de entorno de la aplicación copiando archivo .env_example a .env y editarlo:
```
cp .env_example .env
nano .env
```
Cambiar valores de variables de entorno:
```
PGUSER='tu_usuario'
PGPASSWORD='password_usuario'
PGHOST='tu_direccion_BD'                                          # ejemplo: 'localhost'
PGPORT=5432
CORS_ORIGINS='Direcciones CORS habilitadas, separadas por comas'  # ejemplo: *
SECRETWORD='Palabra_secreta_JWT'                                  # ejemplo: 'mediapp'
PORT='Puerto de despliegue de la aplicación'                      # ejemplo: 3000
```
Instalar dependencias:
```
npm install
```
Generar la base de datos de la aplicación, aplicar migraciones y poblar la base de datos con datos iniciales:
```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```
Desplegar la aplicación en entorno de desarrollo:
```
npm run dev
```

## Diseño
### Modelo entidad relación
Las entidades definidas para la base de datos, junto con las relaciones y tipos de datos configurados son las que se presentan a continuación en la siguiente imagen:

[![MER-Medi-App-v-C.png](https://i.postimg.cc/FzjxJWwJ/MER-Medi-App-v-C.png)](https://postimg.cc/64pZk0W9)

### Endpoints y estructura de datos
#### Endpoints
Los *endpoints* de la aplicación, junto con los verbos HTTP de cada uno de ellos y los controladores que las ejecutan son los presentados a continuación:

| Endpoint              | Verbo       | Controlador                      |
|:--------------------- |:-----------:|:-------------------------------- |
| /login                | POST        | authenticationController#login   |
| /users/data           | GET         | userController#user              |
| /questions            | GET         | questionController#index         |
| /questions            | POST        | questionController#create        |
| /questions/:id        | GET         | questionController#show          |
| /questions/:id        | PUT / PATCH | questionController#update        |
| /questions/:id        | DELETE      | questionController#destroy       |
| /professionals        | GET         | professionalController#index     |
| /professionals        | POST        | professionalController#create    |
| /professionals/:id    | GET         | professionalController#show      |
| /professionals/:id    | PUT / PATCH | professionalController#update    |
| /professionals/:id    | DELETE      | professionalController#destroy   |
| /assignments          | GET         | assignmentController#index       |
| /assignments/:id      | GET         | assignmentController#show        |
| /public/questions     | GET         | questionController#index         |
| /public/professionals | GET         | professionalController#index     |
| /public/assignment    | GET         | assignmentController#create      |

#### Estructura de datos
Las estructuras de datos de los *endpoints* anteriores se presentan a continuación para cada método según controlador:

* Estructura de datos a ser enviada al *endpoint* asociado a __authenticationController#login__
```
{
    email:
    password:
}
```

* Estructura de datos entregada por el *endpoint* asociado a __userController#user__:
```
  {
    id:
    name:
    email:
    mediumUrl:
    RoleId:
    Role: {
      id:
      role:
      range:
    }
  }
```

* Estructura de datos entregada por el *endpoint* asociado a __questionController#index__:
```
[
  {
    id:
    question:
    answerOne:
    answerTwo:
    answerThree:
  }
]
```

* Estructura de datos a ser enviada al *endpoint* asociado a __questionController#create__
```
{
  questionSet: {
    question:
    answerOne:
    answerTwo:
    answerThree:
  }
}
```

* Estructura de datos entregada por el *endpoint* asociado a __questionController#show__:
```
{
    id:
    question:
    answerOne:
    answerTwo:
    answerThree:
}
```

* Estructura de datos a ser enviada al *endpoint* asociado a __questionController#update__
```
{
  questionSet: {
    question:
    answerOne:
    answerTwo:
    answerThree:
  }
}
```

* Estructura de datos entregada por el *endpoint* asociado a __professionalController#index__:
```
[
  {
    id:
    name:
    speciality:
    level:
  }
]
```

* Estructura de datos a ser enviada al *endpoint* asociado a __professionalController#create__
```
{
  professional: {
    name:
    speciality:
    level:
  }
}
```

* Estructura de datos entregada por el *endpoint* asociado a __professionalController#show__:
```
{
  id:
  name:
  speciality:
  level:
}
```

* Estructura de datos a ser enviada al *endpoint* asociado a __professionalController#update__
```
{
  professional: {
    name:
    speciality:
    level:
  }
}
```

* Estructura de datos entregada por el *endpoint* asociado a __assignmentController#index__:
```
[
  {
    id:
    name:
    speciality:
    level:
    Patients: [
      {
        id:
        city:
        UserId:
        PatientsProfessionals: {
          createdAt:
        },
        User: {
          id:
          name:
          email:
          RoleId:
        }
      }
    ]
  }
]
```

* Estructura de datos entregada por el *endpoint* asociado a __assignmentController#ushow__:
```
{
  id:
  name:
  email:
  RoleId:
  Patient: {
    id:
    city:
    UserId:
    Professionals: [
      {
        id:
        name:
        speciality:
        level:
        PatientsProfessionals: {
          createdAt:
        }
      }
    ]
  }
}
```

* Estructura de datos a ser enviada al *endpoint* asociado a __assignmentController#create__
```
{
  patient: {
    name:
    email:
    city:
    password:
  },
  profesional: {
    id:
    name:
    speciality:
    level:
  }
}
```
