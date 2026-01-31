# Proyecto 02  
## Documento de Construcción y Evolución de Software

---

## 1. Portada

**Nombre del equipo:**  
Alison Betancourt  
Mateo Yunga  

**Nombre del proyecto:**  
ChoresFun  

**Fecha de entrega:**  
31 de enero de 2026  

---

## 2. Introducción

ChoresFun es una aplicación web orientada a la gestión de tareas del hogar, diseñada para resolver la falta de organización y control en el cumplimiento de responsabilidades domésticas. El sistema permite asignar tareas a los miembros del hogar, registrar su cumplimiento y aplicar mecanismos de motivación como puntos, ligas y penalizaciones, promoviendo la responsabilidad y el compromiso dentro del entorno familiar.

El objetivo de este documento es describir cómo se gestiona la **construcción y evolución del software**, detallando la arquitectura del proyecto, las estrategias de Integración Continua y Entrega Continua (CI/CD), los flujos de desarrollo, la gestión de historias de usuario y los mecanismos de revisión y aprobación utilizados durante el desarrollo.

---

## 3. Arquitectura del Proyecto

La arquitectura del proyecto ChoresFun se basa en un modelo de alto nivel **cliente-servidor**, compuesto por los siguientes elementos principales:

- **Frontend:** Interfaz web desarrollada con JSP, HTML y CSS, que permite a los usuarios interactuar con el sistema.
- **Backend:** Implementado en Java utilizando Servlets y JPA, encargado de gestionar la lógica de negocio del sistema.
- **Base de datos:** Base de datos H2 utilizada para el almacenamiento de usuarios, tareas, puntos y ligas.
- **Servicios y APIs:** Comunicación entre frontend y backend mediante peticiones HTTP.

### Estrategia de integración

El frontend se comunica con el backend mediante solicitudes HTTP gestionadas por Servlets. El backend procesa la lógica de negocio y utiliza JPA para interactuar con la base de datos H2. Finalmente, el sistema se empaqueta como un archivo WAR y se despliega en **Azure App Service**, permitiendo el acceso a la aplicación a través de servicios web.

**Ejemplo de descripción textual:**  
El frontend desarrollado con JSP se comunica con el backend en Java mediante peticiones HTTP. El backend gestiona la lógica de negocio relacionada con tareas y puntos, y se conecta a una base de datos H2 utilizando JPA para la persistencia de la información.

---

## 4. Estrategia de Pipelines (CI/CD)

<img width="629" height="254" alt="{7F53F01F-E9A7-4F68-95CE-0619D81AE6C9}" src="https://github.com/user-attachments/assets/6d035fde-baa9-4b37-9389-6f91c738a6d5" />

### Pipeline de Integración Continua

El proyecto implementa un pipeline de Integración Continua utilizando **Azure Pipelines**, el cual se ejecuta automáticamente ante cada cambio en el repositorio de código.

El pipeline de Integración Continua incluye los siguientes pasos:

1. Descarga del código fuente desde el repositorio.
2. Ejecución de validaciones básicas del proyecto.
3. Compilación automática del sistema utilizando **Maven**.
4. Ejecución de pruebas unitarias.
5. Generación del artefacto WAR.

Este proceso permite detectar errores de manera temprana y asegurar que el código integrado mantenga la calidad del sistema.

### Pipeline de Entrega Continua

El pipeline de Entrega Continua utiliza el artefacto generado en la fase de Integración Continua. El despliegue se realiza automáticamente hacia **Azure App Service**, permitiendo publicar la aplicación web una vez que el pipeline de CI se ejecuta correctamente.

**Ejemplo de descripción textual:**  
Cada vez que se realiza un cambio en el repositorio, se ejecuta un pipeline que compila el proyecto, ejecuta pruebas y genera el artefacto. Una vez validado, el sistema se despliega automáticamente en el entorno configurado en Azure App Service.

---

## 5. Estrategia de Flujos de Desarrollo

El proyecto adopta un modelo de flujos de desarrollo basado en ramas de Git, permitiendo una evolución controlada del software:

- **main:** Contiene la versión estable del sistema.
- **develop:** Rama utilizada para la integración de nuevas funcionalidades.
- **feature/***: Ramas destinadas al desarrollo de historias de usuario específicas.
- **hotfix/***: Ramas utilizadas para correcciones urgentes.

**Ejemplo de descripción textual:**  
Las nuevas funcionalidades se desarrollan en ramas `feature/*`. Una vez finalizado su desarrollo, estas se integran en la rama `develop`, asegurando que la versión estable del proyecto se mantenga en la rama `main`.

---

## 6. Gestión de Historias de Usuario

Las historias de usuario se redactan siguiendo el formato recomendado:

> Como [rol], quiero [funcionalidad], para [beneficio].

### Ejemplo:

Como miembro del hogar, quiero marcar una tarea como completada, para que quede registrado el cumplimiento de mi responsabilidad.

Las historias de usuario se gestionan mediante **Azure DevOps Boards**, donde se crean como tickets, se les asignan prioridades y responsables, y se vinculan a sprints de duración definida.

---

## 7. Estrategia de Revisiones y Aprobaciones

La integración de cambios al proyecto se realiza de forma controlada mediante revisiones previas, asegurando la calidad del código y el cumplimiento de los requisitos.

Cada cambio debe cumplir con los siguientes criterios antes de ser considerado válido:

### Checklist de revisión:

- [ ] El código cumple con los estándares de estilo definidos.
- [ ] Las pruebas unitarias fueron ejecutadas exitosamente.
- [ ] La funcionalidad implementada cumple con los requisitos establecidos.
- [ ] La documentación fue actualizada cuando corresponde.

Este proceso permite reducir errores y mantener la estabilidad del sistema durante su evolución.

---

## 8. Herramientas y Conexiones

Las herramientas utilizadas en el desarrollo del proyecto son:

- **Azure DevOps Boards:** Gestión de historias de usuario y tareas.
- **Azure Repos:** Repositorio de código fuente.
- **Azure Pipelines:** Automatización de Integración Continua.
- **Azure Releases:** Automatización de la Entrega Continua.
- **Microsoft Teams:** Comunicación del equipo.

**Ejemplo de descripción textual:**  
Azure DevOps permite conectar la gestión de tareas con el repositorio de código y los pipelines, asegurando trazabilidad entre historias de usuario, cambios en el código y despliegues realizados.

---

## 9. Conclusiones

El desarrollo del proyecto ChoresFun evidencia la correcta aplicación de estrategias orientadas a la construcción y evolución de software. La arquitectura definida permitió una clara separación de responsabilidades entre frontend, backend y base de datos, facilitando la mantenibilidad y el crecimiento progresivo del sistema.

Asimismo, la implementación de pipelines de Integración Continua y Entrega Continua contribuyó a garantizar la calidad del software, al automatizar procesos clave como la compilación, ejecución de pruebas y despliegue. Estas prácticas permitieron detectar errores de manera temprana y asegurar que cada versión desplegada sea funcional y estable.

Finalmente, el uso de flujos de desarrollo controlados, la correcta gestión de historias de usuario y la aplicación de revisiones sistemáticas permitieron una evolución ordenada del proyecto. En conjunto, estas estrategias aseguran trazabilidad, calidad y una base sólida para futuras mejoras del sistema.
