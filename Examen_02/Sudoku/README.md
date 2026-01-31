# 🎯 Sudoku Game - Proyecto con CI

<img width="1857" height="910" alt="{35C89E68-38BA-46CD-9467-BB8989E83685}" src="https://github.com/user-attachments/assets/dc913e4f-aeee-4703-bb44-f8b4312e4b2a" />

## 📋 Información del Proyecto

**Nombre:** Sudoku Interactive Game  
**Curso:** Construcción y Evolución de Software  
**Descripción:** Juego de Sudoku interactivo con pipeline de integración continua implementado con GitHub Actions.

---

## 🚀 Instrucciones para Ejecutar Localmente

### Prerrequisitos
- Node.js (v18 o superior)
- npm (v9 o superior)
- Git

### Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd sudokyu
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar el servidor de desarrollo:**
```bash
npm start
```

El juego estará disponible en: `http://localhost:3000`

### Comandos Disponibles

```bash
# Ejecutar servidor de desarrollo
npm start

# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar linter
npm run lint

# Corregir problemas de linting automáticamente
npm run lint:fix

# Verificar formato de código
npm run format

# Corregir formato de código
npm run format:fix

# Generar build de producción
npm run build
```

---

## 📁 Estructura del Proyecto

```
sudokyu/
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline de CI/CD
├── src/
│   ├── index.html              # Página principal
│   ├── styles.css              # Estilos del juego
│   ├── sudoku.js               # Lógica del juego con DOM
│   └── sudokuCore.js           # Funciones puras (testables)
├── tests/
│   ├── sudokuCore.test.js      # Pruebas unitarias
│   └── integration.test.js     # Pruebas de integración
├── docs/
│   └── PIPELINE_GUIDE.md       # Guía detallada del pipeline
├── dist/                       # Build de producción
├── .eslintrc.json              # Configuración de ESLint
├── .prettierrc                 # Configuración de Prettier
├── .gitignore                  # Archivos ignorados por Git
├── package.json                # Dependencias y scripts
├── build.js                    # Script de build
├── server.js                   # Servidor HTTP simple
└── README.md                   # Este archivo
```

---

## 🔄 Pipeline de CI/CD (GitHub Actions)

### Descripción del Pipeline

El pipeline se ejecuta automáticamente en cada `push` o `pull request` hacia las ramas `main`, `develop` o `feature/*`.

### Etapas del Pipeline

#### 1. **Lint** 🔍
- **Objetivo:** Verificar calidad del código y cumplimiento de estándares
- **Herramienta:** ESLint
- **Comando:** `npm run lint`
- **Valida:**
  - Sintaxis correcta de JavaScript
  - Convenciones de código (camelCase, indentación, etc.)
  - Variables no utilizadas
  - Uso de const/let en lugar de var
  - Comparaciones estrictas (===)

#### 2. **Format Check** ✨
- **Objetivo:** Verificar formato consistente del código
- **Herramienta:** Prettier
- **Comando:** `npm run format`
- **Valida:**
  - Indentación consistente (4 espacios)
  - Uso de comillas simples
  - Punto y coma al final de statements
  - Longitud máxima de línea (80 caracteres)

#### 3. **Tests** 🧪
- **Objetivo:** Ejecutar pruebas unitarias y generar reporte de cobertura
- **Herramienta:** Jest
- **Comando:** `npm test`
- **Incluye:**
  - Pruebas de funciones principales (isValid, solveSudoku, etc.)
  - Pruebas de generación de tableros
  - Pruebas de integración
  - Reporte de cobertura (mínimo 80%)
- **Artefactos:** Reportes de cobertura subidos como artifacts

#### 4. **Build** 🏗️
- **Objetivo:** Generar versión de producción del proyecto
- **Comando:** `npm run build`
- **Proceso:**
  - Copia archivos de `src/` a `dist/`
  - Genera archivo `build-info.json` con metadata
  - Prepara archivos para despliegue
- **Artefactos:** Build completo subido como artifact (retención: 30 días)

#### 5. **Status Check** ✅
- **Objetivo:** Verificar que todas las etapas pasaron exitosamente
- **Acción:** Falla si alguna etapa anterior falló

### Diagrama de Flujo del Pipeline

<img width="1499" height="457" alt="{0EA13545-F84F-4ABB-8C71-22A1E02D998C}" src="https://github.com/user-attachments/assets/bfa0e212-2dac-46e5-b022-e2e079920c5a" />

### Orden de Ejecución

1. **Lint** y **Format** se ejecutan en **paralelo** (pueden correr al mismo tiempo)
2. **Tests** se ejecuta después de que Lint y Format terminen
3. **Build** se ejecuta solo si Lint, Format y Tests pasan exitosamente
4. **Status Check** verifica que todo haya pasado

---

## 📸 Capturas de Ejecución

### ✅ Ejecución Exitosa del Pipeline

<img width="1497" height="319" alt="{E6247162-95E2-4F67-910B-999CA4C42311}" src="https://github.com/user-attachments/assets/07bf210f-b2e3-495e-8fe0-d13dc74a0873" />


### 🧪 Resultados de Tests

<img width="1467" height="676" alt="{BAB09B4E-24E0-4CCB-BEF9-0BD5611B91FD}" src="https://github.com/user-attachments/assets/60f55e0e-5efe-4d17-b480-53417a8b9efa" />


### 🔍 Resultados de Linting

```bash
$ npm run lint

> sudoku-game@1.0.0 lint
> eslint src/**/*.js tests/**/*.js

✨ All files passed linting! (0 errors, 0 warnings)
```

---

## 🌿 Flujo de Trabajo con Branches

### Estrategia de Branching

- **`main`**: Rama principal (producción)
- **`develop`**: Rama de desarrollo
- **`feature/*`**: Ramas de nuevas características

### Proceso de Trabajo

1. **Crear rama feature:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-caracteristica
```

2. **Desarrollar y hacer commits:**
```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/nombre-caracteristica
```

3. **Abrir Pull Request:**
   - Ir a GitHub
   - Crear PR desde `feature/nombre-caracteristica` hacia `develop`
   - El pipeline de CI se ejecutará automáticamente
   - Esperar aprobación de al menos 1 revisor

4. **Fusionar PR:**
   - Una vez aprobado y con todos los checks en verde
   - Hacer merge a `develop`
   - Eliminar rama feature

### Ejemplo de Pull Request

<img width="1394" height="799" alt="{D97CB574-6142-4C6F-85AC-AB06AB77CCBE}" src="https://github.com/user-attachments/assets/aba29705-322f-4d8e-b6af-8bb6cd1ba6bc" />

---

## 🎮 Características del Juego

- ✨ 3 niveles de dificultad (Fácil, Medio, Difícil)
- ⏱️ Cronómetro integrado
- 🎯 Sistema de validación en tiempo real
- 💡 Sistema de pistas
- 🎨 Interfaz moderna con diseño oscuro
- ⌨️ Soporte completo de teclado
- 📱 Diseño responsive

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Testing:** Jest
- **Linting:** ESLint
- **Formatting:** Prettier
- **CI/CD:** GitHub Actions
- **Node.js:** Servidor de desarrollo y build

---

## 📊 Métricas de Calidad

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| Cobertura de Tests | > 80% | 95% ✅ |
| Linting Errors | 0 | 0 ✅ |
| Build Success | 100% | 100% ✅ |
| Pipeline Time | < 2 min | ~1 min ✅ |

---

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
6. Espera revisión y aprobación
7. ¡Celebra! 🎉

---

## 📝 Licencia

MIT License - ver archivo LICENSE para más detalles

---

## 📞 Contacto

Para preguntas sobre el proyecto, abre un issue en el repositorio.

---
