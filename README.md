**Tennis Racket Store**

Proyecto Fullstack (backend + frontend) para una tienda de raquetas de tenis. 
**Tech Stack**
- **Backend**: Node.js + Express + TypeScript + Prisma (ORM) — SQLite en desarrollo.
- **Frontend**: Angular (v21) con componentes standalone, Tailwind/PostCSS disponible en el repositorio.

**Estructura clave del repositorio**
- **Backend**: [backend/src](backend/src) — servidor Express, rutas, controladores, servicios, repositorios y Prisma.
- **Prisma**: [backend/prisma/schema.prisma](backend/prisma/schema.prisma)
- **Frontend**: [frontend/src](frontend/src) — aplicación Angular con rutas en [frontend/src/app/app.routes.ts](frontend/src/app/app.routes.ts).

**Requisitos**
- Node.js (v18+ recomendado)
- npm
- (Opcional) Docker si prefieres contenerizar la aplicación

**Variables de entorno**
- `DATABASE_URL` — URL de conexión para Prisma. Por defecto el proyecto usa SQLite y espera algo como `file:./dev.db` en `.env`.

Setup rápido (desarrollo)

1) Backend

```bash
cd backend
npm install
#crear .env con DATABASE_URL=file:./dev.db
npx prisma generate
npx prisma migrate dev --name init
# alimentar la base de datos con data inicial
npx ts-node prisma/seed.ts
# ejecutar UI prisma estudio
npx prisma studio  
# ejecutar servidor
npm run dev
```

El servidor escucha por defecto en el puerto `3000` (ver [backend/src/server.ts](backend/src/server.ts)).

2) Frontend

```bash
cd frontend
npm install
npm start
```
#crear /src/environments/environment.ts 
```export const environment = {
   production: false,
    apiUrl: 'http://localhost:3000/api'
};
```

La app frontend se sirve en `http://localhost:4200` (por defecto de Angular CLI).

**Base de datos**
- Motor en desarrollo: **SQLite** (configurado en [backend/prisma/schema.prisma](backend/prisma/schema.prisma)).
- Para producción se puede cambiar `provider` en `schema.prisma` y ajustar `DATABASE_URL`.

Esquema (resumen de modelos)
- `Racket` (raquetas):
  - `id` (Int, PK)
  - `name` (String)
  - `brand` (String)
  - `description` (String)
  - `price` (Float)
  - `image` (String)
  - `stock` (Int)
  - `weight`, `balance`, `headSize`, `stringPattern`, `level` (String, opcionales)
  - `createdAt` (DateTime)

- `Order` (pedidos):
  - `id` (Int, PK)
  - `customerName` (String)
  - `email` (String)
  - `paymentMethod` (String)
  - `total` (Float)
  - `createdAt` (DateTime)

- `OrderItem` (items en pedidos):
  - `id` (Int, PK)
  - `orderId` (FK -> Order.id)
  - `racketId` (FK -> Racket.id)
  - `quantity` (Int)
  - `price` (Float)

El archivo con el modelo exacto está en: [backend/prisma/schema.prisma](backend/prisma/schema.prisma).

**Endpoints del API**
- `GET /api/health` — Health check, devuelve `{ message: 'API running' }`.
- `GET /api/rackets` — Lista todas las raquetas disponibles. Implementado en [backend/src/routes/racket.routes.ts](backend/src/routes/racket.routes.ts) -> [backend/src/controllers/racket.controller.ts](backend/src/controllers/racket.controller.ts) y usa el servicio/repository correspondiente.
- `POST /api/orders` — Crea un pedido con items. El payload esperado sigue la interfaz `CreateOrder`:

```json
{
  "customerName": "Nombre Cliente",
  "email": "cliente@example.com",
  "paymentMethod": "PSE | Cash | Card",
  "items": [
    { "racketId": 1, "quantity": 2, "price": 159900 }
  ]
}
```

El backend hace validaciones básicas: verifica existencia de raqueta, stock suficiente, calcula `total`, crea `Order` + `OrderItem`s en una transacción y decrementa stock (ver [backend/src/services/order.service.ts](backend/src/services/order.service.ts)).

Ejemplos con `curl`:

```bash
# Listar raquetas
curl http://localhost:3000/api/rackets

# Crear orden
curl -X POST http://localhost:3000/api/orders \
  -H 'Content-Type: application/json' \
  -d '{"customerName":"Ana","email":"ana@example.com","paymentMethod":"PSE","items":[{"racketId":1,"quantity":1,"price":159900}]}'
```

**Frontend — páginas y rutas**
- `/` — Página principal con listado de raquetas: [frontend/src/app/features/home/pages/home-page/home-page.ts](frontend/src/app/features/home/pages/home-page/home-page.ts).
- `/cart` — Carrito: [frontend/src/app/features/cart/pages/cart-page/cart-page.ts](frontend/src/app/features/cart/pages/cart-page/cart-page.ts).
- `/checkout` — Checkout / pago: [frontend/src/app/features/checkout/pages/checkout-page/checkout-page.ts](frontend/src/app/features/checkout/pages/checkout-page/cart-page.ts).

Las rutas están definidas en: [frontend/src/app/app.routes.ts](frontend/src/app/app.routes.ts).

**Arquitectura y diseño**

- Backend (capas y patrones):
  - `routes` -> `controllers` -> `services` -> `repositories`. Este patrón separa responsabilidades: las rutas reciben la petición, los controladores manejan respuestas y errores, los servicios implementan lógica de negocio y las operaciones transaccionales, y los repositorios interactúan con Prisma/DB.
  - Uso de `prisma` como cliente DB en `config/prisma.ts`.
  - Operaciones críticas (crear pedido + decrementar stock) se realizan dentro de una transacción (`prisma.$transaction`) para mantener consistencia.

- Frontend:
  - Angular con componentes standalone (modular y fácil de testear).
  - Servicios centralizados (`Api`, `Products`, `Cart`) para encapsular llamadas HTTP y lógica de estado local.
  - Mobile-first y utilidades de diseño: la base del proyecto ya incluye Tailwind/PostCSS; además, en `src/app/app.css` se añadieron variables y utilidades (si se mantiene).

**Buenas prácticas aplicadas**
- Separación de capas en backend para facilitar pruebas y mantenimiento.
- Transacciones para integridad de pedidos y stock.
- Frontend desacoplado: servicios para llamadas a API y presentación por componentes.

**Pruebas y desarrollo**
- Ejecutar `npm test` en frontend/back según configuración local (ver `package.json` en cada carpeta).
- Para validar Prisma: usar `npx prisma studio` para inspeccionar la base y `npx prisma migrate dev` para aplicar migraciones.

**Despliegue (sugerencias)**
- Para producción, cambiar a un RDBMS como PostgreSQL o MySQL y actualizar `DATABASE_URL` y `schema.prisma`.
- Contenerizar con `Dockerfile` por servicio (backend + frontend) y usar `docker-compose` para orquestar. Añadir un servicio de base de datos en producción si se usa PostgreSQL.

**Problemas comunes y soluciones**
- Error: `DATABASE_URL` no encontrado — crear archivo `.env` en `backend` con `DATABASE_URL=file:./dev.db` y ejecutar `npx prisma generate`.
- Error de puerto ocupado — cambiar `PORT` en `backend/src/server.ts` o liberar el puerto.

**Contribuir**
- Abrir un issue describiendo el bug o feature.
- Crear una rama con prefijo `feat/` o `fix/` y abrir PR con descripción y pasos para reproducir.

**Archivos relevantes**
- Server: [backend/src/server.ts](backend/src/server.ts)
- Rutas: [backend/src/routes](backend/src/routes)
- Controladores: [backend/src/controllers](backend/src/controllers)
- Servicios: [backend/src/services](backend/src/services)
- Repositorios: [backend/src/repositories](backend/src/repositories)
- Prisma schema: [backend/prisma/schema.prisma](backend/prisma/schema.prisma)
- Frontend rutas: [frontend/src/app/app.routes.ts](frontend/src/app/app.routes.ts)

Si quieres, puedo:
- añadir ejemplos de Postman collection o Insomnia;
- crear `docker-compose.yml` para desarrollo;
- generar un CHANGELOG y plantillas de PR/Issue.

---
_Generado y adaptado al proyecto. Si quieres que lo deje más corto, más técnico, o incluya diagramas (arquitectura o ERD), dime cuál prefieres._


**Próximas Mejoras**
*Backend*
Arquitectura y mantenibilidad
-	Añadir DTOs y validaciones para garantizar consistencia en las peticiones y respuestas.
-	Implementar manejo centralizado de errores (Error Handlers) para respuestas homogéneas y mejor trazabilidad.
-	Añadir pruebas unitarias e integración para garantizar estabilidad del sistema.
-	Incorporar documentación de API mediante Swagger/OpenAPI.
*Lógica de negocio*
-	Implementar flujos específicos según el método de pago seleccionado.
-	Añadir historial de órdenes (Order History).
-	Implementar sistema de usuarios y autenticación.
-	Persistir el carrito de compras en backend.
-	Mejorar validación concurrente de stock para evitar inconsistencias en compras simultáneas.
*Rendimiento y escalabilidad*
-	Implementar paginación, filtros y ordenamiento en el listado de productos.
-	Añadir caché para optimizar consultas frecuentes.
-	Implementar rate limiting para prevenir abuso de la API.
-	Añadir logs y monitoreo para ambientes productivos.
________________________________________
**Frontend**
*Experiencia de usuario (UX)*
-	Reemplazar mensajes de carga por Loading Skeletons para una experiencia más profesional.
-	Implementar búsqueda y filtros avanzados (marca, precio, disponibilidad, nivel).
-	Añadir más detalles del producto mediante modal o página de detalle.
-	Incorporar historial de compras y seguimiento de órdenes.
*Seguridad y arquitectura*
-	Añadir autenticación y sistema de login.
-	Implementar Route Guards para proteger rutas privadas.
-	Añadir HTTP Interceptors para:
o	manejo centralizado de errores,
o	autenticación con tokens,
o	indicadores globales de carga.
*Calidad*
-	Añadir pruebas unitarias y pruebas funcionales (end-to-end testing).
-	Mejorar accesibilidad y comportamiento responsive.
________________________________________
**Base de Datos**
*Escalabilidad y rendimiento*
-	Migrar de SQLite a PostgreSQL para un entorno más robusto y productivo.
-	Crear índices en consultas críticas para optimizar rendimiento.
-	Mejorar restricciones y normalización de datos.
*Confiabilidad*
-	Implementar estrategias de respaldo (backup) y migraciones.
-	Optimizar transacciones para garantizar consistencia en órdenes y stock.

