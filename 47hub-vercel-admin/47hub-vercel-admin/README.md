# 47hub con panel privado /admin

## Qué incluye
- Catálogo público que lee los mods desde `/api/files`.
- Panel de administración en `/admin.html`.
- Inicio de sesión con una sola cuenta configurada en variables de entorno.
- Subida directa a Vercel Blob de archivos `.jar` (máximo 50 MB).
- Eliminación de archivos desde el panel.
- Cookie de sesión HttpOnly, SameSite=Strict y con expiración de 12 horas.

## Publicar en Vercel
1. Sube esta carpeta a un repositorio Git y conéctalo a Vercel.
2. En Vercel, crea/conecta un **Blob Store** desde Storage. Esto configura `BLOB_READ_WRITE_TOKEN`.
3. En Project Settings > Environment Variables agrega:
   - `ADMIN_USER`: el usuario de administración.
   - `ADMIN_PASSWORD`: una contraseña larga, única y que no uses en otros sitios.
   - `SESSION_SECRET`: una cadena aleatoria de al menos 32 caracteres.
4. Vuelve a desplegar el proyecto.
5. Abre `https://TU-DOMINIO/admin.html` para entrar al panel. El catálogo está en la raíz.

## Importante
- El almacenamiento está configurado como **public** para que los visitantes puedan descargar los mods sin iniciar sesión. La subida y eliminación sí requieren la sesión de administrador.
- No pongas contraseñas ni tokens en los archivos HTML o JavaScript del navegador.
- Los archivos `.jar` son ejecutables. Publica únicamente mods que hayas revisado y en los que confíes.
- La cuenta de administración es una cuenta compartida configurada por variables de entorno; no es un sistema de múltiples perfiles.
