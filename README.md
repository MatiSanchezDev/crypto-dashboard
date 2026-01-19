# CryptoDash 🪙

**CryptoDash** es un dashboard profesional de criptomonedas en tiempo real, construido con las últimas tecnologías web. Permite a los usuarios monitorear precios, ver gráficos históricos y gestionar una lista de favoritos.

## ✨ Características

-   **Datos en Tiempo Real**: Precios y cambios de mercado actualizados vía CoinGecko API.
-   **Interfaz Moderna**: Diseño oscuro, minimalista y profesional con glassmorphism.
-   **Landing Page Animada**: Animaciones fluidas con Framer Motion.
-   **Favoritos**: Sistema de persistencia local para guardar tus monedas preferidas.
-   **PWA (Progressive Web App)**: Instalable en dispositivos móviles (iOS y Android) con soporte offline básico.
-   **Responsive Design**: Totalmente optimizado para escritorio, tablet y móvil.
-   **Búsqueda Rápida**: Buscador integrado para encontrar cualquier criptomoneda.

## 🛠️ Stack Tecnológico

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
-   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) + `clsx` + `tailwind-merge`
-   **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
-   **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
-   **API**: [CoinGecko Public API](https://www.coingecko.com/en/api)

## 🚀 Getting Started

Sigue estos pasos para levantar el proyecto localmente.

### Prerrequisitos

-   Node.js 18+ (Recomendado: v20 LTS)
-   npm, yarn o pnpm

### Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/crypto-data.git
    cd crypto-data
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env.local` en la raíz del proyecto (o usa `.env` existente) con lo siguiente:
    
    ```env
    BASE_URL='https://api.coingecko.com/api/v3'
    # Opcional: Tu API Key de CoinGecko si tienes una (para evitar rate limits)
    API_KEY='tu-api-key-aqui'
    ```

4.  **Correr el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 PWA (Instalación Móvil)

Este proyecto está configurado como una **Progressive Web App**.
-   **Android**: Abre el sitio en Chrome -> Menú -> "Instalar aplicación" o "Agregar a pantalla principal".
-   **iOS**: Abre el sitio en Safari -> Botón Compartir -> "Agregar al inicio".

## 🧪 Testing

El proyecto incluye tests unitarios para servicios y componentes críticos.

Para ejecutar los tests:
```bash
npm run test
```
Esto correrá Jest y validará:
-   Conexión y manejo de errores con la API de CoinGecko.
-   Renderizado correcto de componentes (`CryptoCard`).
-   Manejo de casos borde (datos `null` o `undefined`).

## 📂 Estructura del Proyecto

-   `/app`: Rutas de la aplicación (Landing, Dashboard, Detalles).
    -   `page.tsx`: Landing Page.
    -   `/dashboard`: Lógica principal del dashboard.
-   `/lib`: Utilidades y servicios.
    -   `/services`: Funciones para llamar a la API (`coingecko.ts`).
    -   `/types`: Definiciones de TypeScript.
-   `/public`: Assets estáticos y `manifest.json`.
-   `__tests__`: Archivos de test unitarios.

## 📝 Guía de Modificación

### Cambiar la API
Si deseas cambiar el proveedor de datos, edita `lib/services/coingecko.ts` y actualiza los tipos en `lib/types/coingecko.ts`.

### Modificar Estilos
Los estilos globales están en `app/globals.css`. El proyecto usa TailwindCSS v4, por lo que puedes editar clases directamente en los componentes.

### Animaciones
Las animaciones de la Landing Page están en `app/page.tsx` usando componentes `<motion.div>` de Framer Motion.

## 🚢 Despliegue

La forma más fácil de desplegar es usando **Vercel**:
1.  Push a tu repositorio GitHub.
2.  Importa el proyecto en Vercel.
3.  Agrega las variables de entorno (`BASE_URL`, etc.) en el panel de Vercel.
4.  Deploy.

---

Desarrollado con ❤️ para los amantes de las criptomonedas.
