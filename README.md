# BloodFlow - Sistema de Gestión de Donaciones de Sangre

Una aplicación completa para gestionar campañas de donación de sangre, citas y seguimiento de donantes.

## Características

- **Portal de Donantes**: Ver campañas activas y agendar citas
- **Portal Médico**: Gestionar citas y registros de donación
- **Panel Administrativo**: Supervisar todas las operaciones

## Configuración del Backend

Este proyecto requiere un backend que implemente el contrato de API especificado. Los endpoints disponibles son:

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

### Campañas
- `GET /api/campaigns` - Listar campañas
- `GET /api/campaigns/{id}` - Detalle de campaña con slots

### Citas
- `POST /api/appointments` - Reservar cita
- `GET /api/appointments/me` - Mis citas

### Médico
- `POST /api/medical_checks` - Registrar evaluación médica
- `POST /api/donations` - Registrar donación y actualizar inventario
- `GET /api/inventory` - Consultar inventario de sangre

### Notificaciones
- `POST /api/notifications/send` - Enviar notificación

## Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

\`\`\`bash
# Backend API URL - URL base para todos los endpoints de la API
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
\`\`\`

## Estructura del Proyecto

\`\`\`
bloodflow/
├── app/                    # Páginas y rutas (Next.js App Router)
│   ├── donor/             # Rutas para donantes
│   ├── medical/           # Rutas para personal médico
│   └── admin/             # Rutas para administradores
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes base de UI (shadcn)
├── lib/                  # Utilidades y contextos
│   ├── api.ts            # Cliente API con integración al backend
│   ├── auth-context.tsx  # Contexto de autenticación con JWT
│   └── utils.ts          # Funciones helper
├── hooks/                # Custom hooks
├── types/                # Definiciones de TypeScript
└── public/               # Archivos estáticos
\`\`\`

## Instalación

\`\`\`bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
npm start
\`\`\`

## Tecnologías

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- JWT Authentication

## Cliente API

El cliente API (`lib/api.ts`) está configurado para usar la variable de entorno `NEXT_PUBLIC_BACKEND_URL`. Todos los endpoints siguen el contrato especificado y manejan automáticamente:

- Inyección de tokens JWT en headers
- Manejo de errores con mensajes descriptivos
- Tipos TypeScript completos
- Formato de peticiones y respuestas según el contrato

### Ejemplo de uso:

\`\`\`typescript
import { api } from '@/lib/api'

// Login
const response = await api.auth.login(email, password)

// Listar campañas
const campaigns = await api.campaigns.list()

// Reservar cita
await api.appointments.create({
  campaign_id: "camp_001",
  slot_datetime: "2025-11-15T09:00:00Z"
})
\`\`\`

## Diseño Responsive

Todos los componentes son completamente responsive y optimizados para:
- Móvil (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

Se utilizan breakpoints de Tailwind CSS (`sm:`, `md:`, `lg:`, `xl:`) para garantizar una experiencia óptima en todos los dispositivos.

## Desarrollo

El proyecto sigue las mejores prácticas de:
- Componentes modulares y reutilizables
- Type safety con TypeScript
- Accesibilidad (ARIA, semantic HTML)
- Performance (React Server Components)
- SEO optimizado

## Licencia

MIT
