# 🎭 Dígalo con Mímica - Juego de Charadas

Un divertido juego de mímica/charadas diseñado para celulares, desarrollado con React + Vite.

## 📱 Características

- **5 Categorías Temáticas:**
  - 🎬 Películas de una sola palabra
  - 🎥 Películas de directores famosos
  - 📺 Series
  - 🎞️ Películas clásicas
  - 🎨 Dibujos animados
  - 📚 Libros

- **Configuración Flexible:**
  - 2-6 equipos
  - Tiempo límite: 60, 90 o 120 segundos

- **Sistema de Juego:**
  - Objetivos secretos para cada equipo
  - Sistema de puntos y estrellas
  - Mecánicas de robo de puntos y estrellas
  - Temporizador visual

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🎮 Cómo Jugar

### 1. Configuración Inicial
- Selecciona el número de equipos (2-6)
- Elige el tiempo límite por turno
- Presiona "Comenzar Juego"

### 2. ¿Quién Empieza?
- Se mostrará el póster de una película famosa
- El primer equipo que la adivine comienza el juego

### 3. Reglas del Juego

**Puntaje y Estrellas:**
- Cada ítem adivinado = 1 punto
- 3 puntos de la misma categoría = 1 estrella ⭐

**Robo de Adivinanza:**
- Si otro equipo sabe la respuesta, puede robar el punto
- ¡Pero cuidado! Si la respuesta es incorrecta, el equipo contrario gana el punto automáticamente

**Robo de Estrellas:**
- Di "Quiero robar una estrella" en voz alta
- Desafía al otro equipo en una categoría donde ya tienen estrella
- El equipo desafiado puede decir todos los nombres que quiera
- Si ganan, pueden sumar un punto a cualquier categoría

### 4. Victoria
- El juego termina cuando un equipo cumple su objetivo secreto
- Los jugadores deben anunciar cuando cumplan su objetivo
- El juego NO avisa automáticamente

## 🎨 Diseño

- **Interfaz vibrante y colorida** con gradientes modernos
- **Animaciones fluidas** para una experiencia dinámica
- **Totalmente responsive** - optimizado para móviles
- **Tipografía juguetonas**: Fredoka y Space Mono
- **Emojis visuales** para representar películas, series y libros

## 🛠️ Tecnologías

- **React 18** - Framework de UI
- **Vite** - Build tool ultrarrápido
- **CSS3** - Animaciones y estilos modernos
- **Google Fonts** - Tipografías personalizadas

## 📝 Personalización

Puedes agregar más películas, series y libros editando el objeto `GAME_DATA` en `DigaloConMimica.jsx`.

Estructura de cada ítem:
```javascript
{
  title: 'Nombre del ítem',
  poster: '🎬', // Emoji representativo
  // Campos opcionales:
  director: 'Nombre del director',
  author: 'Nombre del autor',
  year: '1999'
}
```

## 🎯 Objetivos de Ejemplo

Los objetivos se generan automáticamente al inicio del juego. Algunos ejemplos:

- Obtener la estrella de Directores Famosos, Libros y Dibujos Animados + Robar una serie
- Obtener la estrella de Películas de Una Palabra y Películas Clásicas + Robar una estrella
- Obtener cinco estrellas
- Obtener estrellas de Libros y Dibujos Animados + Adivinar una película sin mímica de las palabras del título

## 📱 Optimización Móvil

El juego está diseñado principalmente para dispositivos móviles:
- Botones grandes y táctiles
- Interfaz clara y legible
- Navegación intuitiva
- Responsive desde 320px hasta pantallas grandes

## 🎉 ¡Diviértete!

Este juego es perfecto para:
- Reuniones familiares
- Fiestas con amigos
- Actividades de team building
- Noches de juegos

---

**Desarrollado con ❤️ usando React + Vite**
