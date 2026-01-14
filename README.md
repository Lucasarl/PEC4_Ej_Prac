# PEC4 - Desarrollo front-end con frameworks Javascript

## Información del Alumno
- **Login UOC**: larlandisl
- **Nombre y apellidos**: Lucas Arlandis Limiñana

## Descripción de la PEC

Esta PEC implementa una aplicación Angular de e-commerce con sistema de autenticación y gestión de artículos.

Ejercicios Realizados:
- Ejercicio 1-3: Componentes, formularios reactivos y template-driven, servicios HTTP
- Ejercicio 4: Sistema de routing con guards de autenticación, rutas parametrizadas, navegación
- Ejercicio 5: Implementación de lazy loading con módulos User y Article

Principales Dificultades y Soluciones:
- SSR Compatibility: Problemas con localStorage en renderizado servidor → Solucionado con `isPlatformBrowser()`
- Change Detection: Componentes no se actualizaban en navegación → Implementado `ChangeDetectorRef.detectChanges()`
- Problemas con las rutas: ArticleDetail no cargaba en navegación (solo en refresh) → Cambiado de `snapshot.paramMap` a `paramMap.subscribe()`

Mejoras Implementadas:
- Arquitectura modular con lazy loading para mejor rendimiento
- Guards de autenticación para protección de rutas
- Manejo de errores inmediato en formularios
- Estado de autenticación persistente con RxJS

Consideraciones para Ejecución:
1. Backend: Ejecutar `node server.js` en `server-articles/` (puerto 3000)
2. Frontend: Ejecutar `ng serve` en `ecommerce/` (puerto 4200)
3. Lazy Loading: Verificable en DevTools → Network tab al navegar entre secciones
4. SSR: La aplicación es compatible con Server-Side Rendering

