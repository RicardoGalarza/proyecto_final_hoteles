## Tecnologías Utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)



# Guía de Acceso y Configuración del Proyecto

## Acceso al Proyecto en Railway

Puedes visualizar el proyecto sin necesidad de levantar nada accediendo al siguiente enlace:

**[Acceso al Proyecto](https://appealing-healing-production.up.railway.app)**

---

## Tipos de Usuarios

1. **Administrador**
2. **Cliente**

### Acceso como Administrador

- **Correo**: ricardogalarza1723@gmail.com  
- **Clave**: 1234567890

### Acceso como Cliente

Para registrarte como cliente, utiliza el siguiente enlace:  
**[Crear Cuenta de Cliente](https://appealing-healing-production.up.railway.app/crearcuentacliente)**

---

## Levantar el Proyecto Completo

Si deseas levantar el proyecto en tu entorno, puedes obtener las configuraciones necesarias aquí:  
**[Configuraciones del Proyecto](https://sparkly-trouble-778.notion.site/Credenciales-Proyecto-Final-142df1bbd73c8001b94ed1c0eacba6d2?pvs=4)**

### Pasos para Clonar el Proyecto

1. Clona el repositorio que contiene tanto el frontend como el backend:
   ```bash
   git clone https://github.com/RicardoGalarza/proyecto_final_hoteles.git
   
### Para levantar el backend deben:
1. Posicionarse dentro de la carpeta hotel-back
   ```bash
   cd hotel-back
3. Lanzar por consola el comando
   ```bash
   mvn clean install
4. Ingresar a src/main/java/com/example/demo y encontraran Application.java que en vscode al abrirlo les saldra la opcion de run

### Para levantar el front deben:
1. Posicionarse dentro de la carpeta hotel-app
   ```bash
   cd hotel-app
3. Lanzar por consola el comando
   ```bash
   npm i
5. Lanzar por consola el comando
   ```bash
   npm start

  Para tener datos, te puedes conectar a la BD de railway que ya esta poblada con informacion y ademas relacionada a las imagenes que existen en google storage. En los datos anteriores deje un link para que pueda hacer la conexion desde tu pc.


