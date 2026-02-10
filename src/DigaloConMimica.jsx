import React, { useState, useEffect, useRef } from 'react';
import './DigaloConMimica.css';

// Base de datos del juego
const GAME_DATA = {
  peliculasUnapalabra: [
    { title: 'Titanic', poster: '🚢' },
    { title: 'Jaws', poster: '🦈' },
    { title: 'Rocky', poster: '🥊' },
    { title: 'Amélie', poster: '🎨' },
    { title: 'Gravity', poster: '🌌' },
    { title: 'Up', poster: '🎈' },
    { title: 'Gladiador', poster: '⚔️' },
    { title: 'Arrival', poster: '👽' },
    { title: 'Her', poster: '💌' },
    { title: 'Taken', poster: '🔫' },
    { title: 'Dunkirk', poster: '⛴️' },
    { title: 'Cars', poster: '🏎️' },
    { title: 'Frozen', poster: '❄️' },
    { title: 'Brave', poster: '🏹' },
    { title: 'Coco', poster: '🎸' }
  ],
  directoresFamosos: [
    { title: 'Pulp Fiction', director: 'Tarantino', poster: '💼' },
    { title: 'El Padrino', director: 'Coppola', poster: '🎭' },
    { title: 'Psicosis', director: 'Hitchcock', poster: '🔪' },
    { title: 'Inception', director: 'Nolan', poster: '🌀' },
    { title: 'La La Land', director: 'Chazelle', poster: '🎵' },
    { title: 'Joker', director: 'Phillips', poster: '🃏' },
    { title: 'Parasite', director: 'Bong Joon-ho', poster: '🏠' },
    { title: 'E.T.', director: 'Spielberg', poster: '👾' },
    { title: 'Kill Bill', director: 'Tarantino', poster: '🗡️' },
    { title: 'Interstellar', director: 'Nolan', poster: '🌠' },
    { title: 'The Grand Budapest Hotel', director: 'Anderson', poster: '🏨' },
    { title: 'Vertigo', director: 'Hitchcock', poster: '🌪️' },
    { title: 'Roma', director: 'Cuarón', poster: '🖤' },
    { title: 'Birdman', director: 'Iñárritu', poster: '🦅' },
    { title: 'La Forma del Agua', director: 'del Toro', poster: '🌊' }
  ],
  series: [
    { title: 'Breaking Bad', poster: '⚗️' },
    { title: 'Game of Thrones', poster: '🐉' },
    { title: 'Stranger Things', poster: '🔦' },
    { title: 'The Crown', poster: '👑' },
    { title: 'Friends', poster: '☕' },
    { title: 'The Office', poster: '📎' },
    { title: 'Lost', poster: '🏝️' },
    { title: 'The Mandalorian', poster: '🤖' },
    { title: 'The Sopranos', poster: '🍝' },
    { title: 'Squid Game', poster: '🔺' },
    { title: 'The Wire', poster: '🎭' },
    { title: 'Black Mirror', poster: '📱' },
    { title: 'Chernobyl', poster: '☢️' },
    { title: 'The Handmaid\'s Tale', poster: '🔴' },
    { title: 'Peaky Blinders', poster: '🎩' }
  ],
  peliculasClasicas: [
    { title: 'Casablanca', year: '1942', poster: '✈️' },
    { title: 'Lo que el viento se llevó', year: '1939', poster: '🌪️' },
    { title: 'Ciudadano Kane', year: '1941', poster: '🎬' },
    { title: 'El mago de Oz', year: '1939', poster: '🌈' },
    { title: 'La ventana indiscreta', year: '1954', poster: '🪟' },
    { title: 'Cantando bajo la lluvia', year: '1952', poster: '☔' },
    { title: 'Ben-Hur', year: '1959', poster: '🏛️' },
    { title: 'Desayuno con diamantes', year: '1961', poster: '💎' },
    { title: 'Doctor Zhivago', year: '1965', poster: '🌹' },
    { title: 'West Side Story', year: '1961', poster: '💃' },
    { title: 'Lawrence de Arabia', year: '1962', poster: '🐪' },
    { title: 'El graduado', year: '1967', poster: '🎓' },
    { title: '2001: Odisea del espacio', year: '1968', poster: '🛸' },
    { title: 'Bonnie y Clyde', year: '1967', poster: '🔫' },
    { title: 'La naranja mecánica', year: '1971', poster: '🍊' }
  ],
  dibujosAnimados: [
    { title: 'El Rey León', poster: '🦁' },
    { title: 'Toy Story', poster: '🤠' },
    { title: 'Buscando a Nemo', poster: '🐠' },
    { title: 'Shrek', poster: '👹' },
    { title: 'La Bella y la Bestia', poster: '🌹' },
    { title: 'Aladdin', poster: '🧞' },
    { title: 'Mulan', poster: '🗡️' },
    { title: 'Monsters Inc.', poster: '👁️' },
    { title: 'El Viaje de Chihiro', poster: '🎭' },
    { title: 'Wall-E', poster: '🤖' },
    { title: 'Ratatouille', poster: '🐀' },
    { title: 'Kung Fu Panda', poster: '🐼' },
    { title: 'Cómo entrenar a tu dragón', poster: '🐲' },
    { title: 'Moana', poster: '🌊' },
    { title: 'Encanto', poster: '🦋' }
  ],
  libros: [
    { title: '1984', author: 'Orwell', poster: '👁️' },
    { title: 'Cien años de soledad', author: 'García Márquez', poster: '🦋' },
    { title: 'Don Quijote', author: 'Cervantes', poster: '🗡️' },
    { title: 'El gran Gatsby', author: 'Fitzgerald', poster: '💚' },
    { title: 'Harry Potter', author: 'Rowling', poster: '⚡' },
    { title: 'El señor de los anillos', author: 'Tolkien', poster: '💍' },
    { title: 'Orgullo y prejuicio', author: 'Austen', poster: '💌' },
    { title: 'Matar un ruiseñor', author: 'Lee', poster: '🦅' },
    { title: 'El Principito', author: 'Saint-Exupéry', poster: '👑' },
    { title: 'Crimen y castigo', author: 'Dostoievski', poster: '🔨' },
    { title: 'La Odisea', author: 'Homero', poster: '⛵' },
    { title: 'Drácula', author: 'Stoker', poster: '🧛' },
    { title: 'Frankenstein', author: 'Shelley', poster: '⚡' },
    { title: 'Los miserables', author: 'Hugo', poster: '🇫🇷' },
    { title: 'Alicia en el país de las maravillas', author: 'Carroll', poster: '🐰' }
  ]
};

// Películas para el inicio
const STARTER_MOVIES = [
  { title: 'Titanic', poster: '🚢', hint: 'Un gran barco...' },
  { title: 'El Rey León', poster: '🦁', hint: 'Rey de la sabana' },
  { title: 'Star Wars', poster: '⭐', hint: 'Guerras galácticas' },
  { title: 'Jurassic Park', poster: '🦕', hint: 'Dinosaurios' },
  { title: 'Matrix', poster: '💊', hint: 'Realidad virtual' },
  { title: 'Avatar', poster: '🌳', hint: 'Planeta Pandora' }
];

// Generador de objetivos
const generateObjectives = (numTeams) => {
  const categories = ['peliculasUnapalabra', 'directoresFamosos', 'series', 'peliculasClasicas', 'dibujosAnimados', 'libros'];
  const categoryNames = {
    peliculasUnapalabra: 'Películas de Una Palabra',
    directoresFamosos: 'Directores Famosos',
    series: 'Series',
    peliculasClasicas: 'Películas Clásicas',
    dibujosAnimados: 'Dibujos Animados',
    libros: 'Libros'
  };

  const objectiveTemplates = [
    (cats) => `Obtener la estrella de ${cats[0]}, ${cats[1]}, y ${cats[2]}. Robar una serie a cualquier equipo.`,
    (cats) => `Obtener la estrella de ${cats[0]} y ${cats[1]}. Robar una estrella.`,
    () => `Obtener cinco estrellas.`,
    (cats) => `Obtener la estrella de ${cats[0]} y ${cats[1]}. Adivinar una película (que no esté dentro de esas dos categorías) sin realizar la mímica de ninguna de las palabras que lleva el título.`,
    (cats) => `Obtener cuatro estrellas diferentes.`,
    (cats) => `Obtener la estrella de ${cats[0]}. Robar dos estrellas.`,
    (cats) => `Obtener tres estrellas y robar una estrella.`
  ];

  const objectives = [];
  for (let i = 0; i < numTeams; i++) {
    const shuffledCats = [...categories].sort(() => Math.random() - 0.5);
    const selectedCats = shuffledCats.slice(0, 3).map(c => categoryNames[c]);
    const template = objectiveTemplates[i % objectiveTemplates.length];
    objectives.push(template(selectedCats));
  }
  
  return objectives;
};

const DigaloConMimica = () => {
  // Estados del juego
  const [gamePhase, setGamePhase] = useState('setup'); // setup, movieStart, playing, gameOver
  const [numTeams, setNumTeams] = useState(2);
  const [timeLimit, setTimeLimit] = useState(60);
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [starterMovie, setStarterMovie] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [lastTwoCategories, setLastTwoCategories] = useState([]);
  const [showObjectives, setShowObjectives] = useState(false);
  const [usedItems, setUsedItems] = useState({
    peliculasUnapalabra: [],
    directoresFamosos: [],
    series: [],
    peliculasClasicas: [],
    dibujosAnimados: [],
    libros: []
  });

  const timerRef = useRef(null);

  const categoryConfig = {
    peliculasUnapalabra: { name: 'Películas de Una Palabra', color: '#FF6B6B', emoji: '🎬' },
    directoresFamosos: { name: 'Directores Famosos', color: '#4ECDC4', emoji: '🎥' },
    series: { name: 'Series', color: '#FFE66D', emoji: '📺' },
    peliculasClasicas: { name: 'Películas Clásicas', color: '#95E1D3', emoji: '🎞️' },
    dibujosAnimados: { name: 'Dibujos Animados', color: '#F38181', emoji: '🎨' },
    libros: { name: 'Libros', color: '#AA96DA', emoji: '📚' }
  };

  // Efecto del temporizador
  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (isTimerRunning && timer === 0) {
      setIsTimerRunning(false);
      alert('¡Tiempo terminado! Siguiente equipo.');
    }
    return () => clearTimeout(timerRef.current);
  }, [timer, isTimerRunning]);

  // Iniciar juego
  const startGame = () => {
    const teamArray = Array.from({ length: numTeams }, (_, i) => ({
      id: i,
      name: `Equipo ${i + 1}`,
      points: {
        peliculasUnapalabra: 0,
        directoresFamosos: 0,
        series: 0,
        peliculasClasicas: 0,
        dibujosAnimados: 0,
        libros: 0
      },
      stars: {
        peliculasUnapalabra: false,
        directoresFamosos: false,
        series: false,
        peliculasClasicas: false,
        dibujosAnimados: false,
        libros: false
      },
      objective: ''
    }));

    const objectives = generateObjectives(numTeams);
    teamArray.forEach((team, i) => {
      team.objective = objectives[i];
    });

    setTeams(teamArray);
    setGamePhase('movieStart');
  };

  // Mostrar película inicial
  const showStarterMovie = () => {
    const randomMovie = STARTER_MOVIES[Math.floor(Math.random() * STARTER_MOVIES.length)];
    setStarterMovie(randomMovie);
  };

  // Comenzar la partida
  const beginPlaying = () => {
    setGamePhase('playing');
    setStarterMovie(null);
  };

  // Seleccionar categoría
  const selectCategory = (categoryKey) => {
    // Verificar que no se repita más de 2 veces
    if (lastTwoCategories.length === 2 && 
        lastTwoCategories[0] === categoryKey && 
        lastTwoCategories[1] === categoryKey) {
      alert('No puedes elegir la misma categoría tres veces seguidas');
      return;
    }

    // Obtener item aleatorio no usado
    const availableItems = GAME_DATA[categoryKey].filter(
      item => !usedItems[categoryKey].includes(item.title)
    );

    if (availableItems.length === 0) {
      alert('No quedan más items en esta categoría');
      return;
    }

    const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    
    setCurrentCategory(categoryKey);
    setCurrentItem(randomItem);
    setTimer(timeLimit);
    setIsTimerRunning(true);

    // Actualizar últimas dos categorías
    setLastTwoCategories([categoryKey, lastTwoCategories[0]]);

    // Marcar como usado
    setUsedItems({
      ...usedItems,
      [categoryKey]: [...usedItems[categoryKey], randomItem.title]
    });
  };

  // Marcar como correcto
  const markCorrect = () => {
    const updatedTeams = [...teams];
    updatedTeams[currentTeam].points[currentCategory]++;
    
    // Verificar si ganó una estrella (3 puntos)
    if (updatedTeams[currentTeam].points[currentCategory] === 3) {
      updatedTeams[currentTeam].stars[currentCategory] = true;
    }
    
    setTeams(updatedTeams);
    setIsTimerRunning(false);
    setCurrentItem(null);
    setCurrentCategory(null);
  };

  // Siguiente turno
  const nextTurn = () => {
    setCurrentTeam((currentTeam + 1) % numTeams);
    setCurrentItem(null);
    setCurrentCategory(null);
    setIsTimerRunning(false);
  };

  // Robar punto
  const stealPoint = (teamId) => {
    const updatedTeams = [...teams];
    updatedTeams[teamId].points[currentCategory]++;
    
    if (updatedTeams[teamId].points[currentCategory] === 3) {
      updatedTeams[teamId].stars[currentCategory] = true;
    }
    
    setTeams(updatedTeams);
    setIsTimerRunning(false);
    setCurrentItem(null);
    setCurrentCategory(null);
  };

  // Render
  return (
    <div className="game-container">
      {/* SETUP */}
      {gamePhase === 'setup' && (
        <div className="setup-screen">
          <h1 className="game-title">
            <span className="title-word">Dígalo</span>
            <span className="title-word">con</span>
            <span className="title-word">Mímica</span>
          </h1>
          
          <div className="setup-content">
            <div className="setup-option">
              <label>¿Cuántos equipos van a jugar?</label>
              <div className="number-selector">
                {[2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    className={`number-btn ${numTeams === num ? 'active' : ''}`}
                    onClick={() => setNumTeams(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="setup-option">
              <label>Tiempo límite por turno</label>
              <div className="number-selector">
                {[60, 90, 120].map(time => (
                  <button
                    key={time}
                    className={`number-btn ${timeLimit === time ? 'active' : ''}`}
                    onClick={() => setTimeLimit(time)}
                  >
                    {time}s
                  </button>
                ))}
              </div>
            </div>

            <button className="start-btn" onClick={startGame}>
              Comenzar Juego
            </button>
          </div>
        </div>
      )}

      {/* MOVIE START */}
      {gamePhase === 'movieStart' && (
        <div className="movie-start-screen">
          <h2>¡Vamos a ver quién comienza!</h2>
          <p className="instruction">El equipo que sepa primero de qué película se trata, empieza el juego.</p>
          
          {!starterMovie ? (
            <button className="reveal-btn" onClick={showStarterMovie}>
              Mostrar Póster
            </button>
          ) : (
            <div className="starter-movie">
              <div className="movie-poster-big">{starterMovie.poster}</div>
              <p className="movie-hint">{starterMovie.hint}</p>
              <button className="begin-btn" onClick={beginPlaying}>
                Comenzar Partida
              </button>
            </div>
          )}

          <div className="objectives-preview">
            <button 
              className="show-objectives-btn"
              onClick={() => setShowObjectives(!showObjectives)}
            >
              {showObjectives ? 'Ocultar' : 'Ver'} Objetivos Secretos
            </button>
            
            {showObjectives && (
              <div className="objectives-list">
                {teams.map(team => (
                  <div key={team.id} className="objective-card">
                    <h3>{team.name}</h3>
                    <p>{team.objective}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PLAYING */}
      {gamePhase === 'playing' && (
        <div className="playing-screen">
          <div className="game-header">
            <div className="current-turn">
              Turno de: <span className="team-name">{teams[currentTeam].name}</span>
            </div>
            {isTimerRunning && (
              <div className={`timer ${timer <= 10 ? 'timer-warning' : ''}`}>
                ⏱️ {timer}s
              </div>
            )}
          </div>

          <div className="scoreboard">
            {teams.map(team => (
              <div key={team.id} className={`team-card ${team.id === currentTeam ? 'active-team' : ''}`}>
                <h3>{team.name}</h3>
                <div className="stars-display">
                  {Object.keys(categoryConfig).map(catKey => (
                    team.stars[catKey] && (
                      <span key={catKey} className="star-badge" style={{ backgroundColor: categoryConfig[catKey].color }}>
                        ⭐ {categoryConfig[catKey].emoji}
                      </span>
                    )
                  ))}
                </div>
                <div className="points-summary">
                  {Object.keys(team.points).map(catKey => (
                    team.points[catKey] > 0 && (
                      <div key={catKey} className="point-item">
                        <span>{categoryConfig[catKey].emoji}</span>
                        <span>{team.points[catKey]}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          {!currentItem ? (
            <div className="category-selection">
              <h2>Elige una categoría para {teams[currentTeam].name}</h2>
              <div className="categories-grid">
                {Object.keys(categoryConfig).map(catKey => (
                  <button
                    key={catKey}
                    className="category-btn"
                    style={{ backgroundColor: categoryConfig[catKey].color }}
                    onClick={() => selectCategory(catKey)}
                  >
                    <span className="category-emoji">{categoryConfig[catKey].emoji}</span>
                    <span className="category-name">{categoryConfig[catKey].name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="item-display">
              <div className="item-card" style={{ borderColor: categoryConfig[currentCategory].color }}>
                <div className="item-poster">{currentItem.poster}</div>
                <div className="item-title">{currentItem.title}</div>
                {currentItem.director && <div className="item-meta">Dir: {currentItem.director}</div>}
                {currentItem.author && <div className="item-meta">Autor: {currentItem.author}</div>}
                {currentItem.year && <div className="item-meta">Año: {currentItem.year}</div>}
              </div>

              <div className="action-buttons">
                <button className="correct-btn" onClick={markCorrect}>
                  ✓ Correcto
                </button>
                <button className="next-btn" onClick={nextTurn}>
                  → Siguiente Turno
                </button>
              </div>

              <div className="steal-section">
                <h3>¿Otro equipo quiere robar?</h3>
                <div className="steal-buttons">
                  {teams.map(team => (
                    team.id !== currentTeam && (
                      <button
                        key={team.id}
                        className="steal-btn"
                        onClick={() => stealPoint(team.id)}
                      >
                        {team.name} roba
                      </button>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}

          <button 
            className="objectives-toggle"
            onClick={() => setShowObjectives(!showObjectives)}
          >
            {showObjectives ? '👁️ Ocultar' : '🎯 Ver'} Objetivos
          </button>

          {showObjectives && (
            <div className="objectives-overlay">
              {teams.map(team => (
                <div key={team.id} className="objective-display">
                  <h4>{team.name}</h4>
                  <p>{team.objective}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DigaloConMimica;
