# 🚀 PC2-NUBE - Proyecto con Docker Compose

Este proyecto contiene un frontend, un backend y una base de datos MySQL, todos
orquestados con Docker Compose.

---

## ✅ Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠 Instrucciones para levantar el proyecto localmente

1. Clona este repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd PC2-NUBE
   ```
2. Asegurate de estar ubicado en la raíz del proyecto (donde se encuentra el
   archivo docker-compose.yml).

3. Levanta todos los servicios con:

   ```bash
   docker-compose up --build -d
   ```

Esto hará lo siguiente:

- Construirá y levantará el backend en http://localhost:8000

- Construirá y levantará el frontend en http://localhost:4000

- Iniciará un contenedor de MySQL 8.0 con los datos definidos en ./mysql-init

# 🧠 Notas

Asegurate de que los puertos 4000, 8000 y 3306 estén libres en tu máquina local.

En entornos de producción, es recomendable no montar volúmenes directamente
desde el host, y configurar variables sensibles mediante secretos o entornos
protegidos.
