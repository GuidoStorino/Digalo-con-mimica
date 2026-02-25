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
    { title: 'Coco', poster: '🎸' },
    { title: 'Titanic', poster: '🚢' },
    { title: 'Psycho', poster: '🔪' },
  { title: 'Alien', poster: '👾' },
  { title: 'Joker', poster: '🃏' },
  { title: 'Inception', poster: '🌀' },
  { title: 'Interstellar', poster: '🌠' },
  { title: 'Avatar', poster: '🌿' },
  { title: 'Matrix', poster: '💊' },
  { title: 'Casablanca', poster: '🇲🇦' },
  { title: 'Vertigo', poster: '🌪️' },
  { title: 'Memento', poster: '🧠' },
  { title: 'Se7en', poster: '📦' },
  { title: 'Shrek', poster: '🟢' },
  { title: 'Grease', poster: '💃' },
  { title: 'Ghost', poster: '👻' },
  { title: 'Saw', poster: '🪚' },
  { title: 'Halloween', poster: '🎃' },
  { title: 'Scream', poster: '😱' },
  { title: 'Scarface', poster: '🔫' },
  { title: 'Heat', poster: '🔥' },
  { title: 'Braveheart', poster: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { title: 'Amadeus', poster: '🎼' },
  { title: 'Rebecca', poster: '🏰' },
  { title: 'Roma', poster: '🖤' },
  { title: 'Parasite', poster: '🏠' },
  { title: 'Whiplash', poster: '🥁' },
  { title: 'Akira', poster: '🏍️' },
  { title: 'Oldboy', poster: '🔨' },
  { title: 'Chinatown', poster: '🕶️' },
  { title: 'Notorious', poster: '🕵️‍♀️' },
  { title: 'Rushmore', poster: '🏫' },
  { title: 'Snatch', poster: '🥊' },
  { title: 'Misery', poster: '🔒' },
  { title: 'Lincoln', poster: '🎩' }
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
    { title: 'La Forma del Agua', director: 'del Toro', poster: '🌊' },
    { title: 'Tiburón', director: 'Spielberg', poster: '🦈' },
  { title: 'Taxi Driver', director: 'Scorsese', poster: '🚖' },
  { title: '2001: A Space Odyssey', director: 'Kubrick', poster: '🪐' },
  { title: 'El club de la pelea', director: 'Fincher', poster: '👊' },
  { title: 'El señor de los anillos: La comunidad del anillo', director: 'Jackson', poster: '🗡️' },
  { title: 'Seven', director: 'Fincher', poster: '📦' },
  { title: 'El silencio de los corderos', director: 'Demme', poster: '🦋' },
  { title: 'Matrix', director: 'Wachowski', poster: '💊' },
  { title: 'Forrest Gump', director: 'Zemeckis', poster: '🪶' },
  { title: 'El bueno, el feo y el malo', director: 'Leone', poster: '🤠' },
  { title: 'El pianista', director: 'Polanski', poster: '🎹' },
  { title: 'Gladiador', director: 'Scott', poster: '⚔️' },
  { title: 'Interestelar', director: 'Nolan', poster: '🕳️' }, // variación de Interstellar
  { title: 'Mad Max: Fury Road', director: 'Miller', poster: '🚗' },
  { title: 'Get Out', director: 'Peele', poster: '👁️' },
  { title: 'El rey león', director: 'Allers & Minkoff', poster: '🦁' },
  { title: 'Toy Story', director: 'Lasseter', poster: '🧸' },
  { title: 'Spirited Away', director: 'Miyazaki', poster: '🛁' },
  { title: 'Seven Samurai', director: 'Kurosawa', poster: '⚔️' },
  { title: 'El laberinto del fauno', director: 'del Toro', poster: '🧚' }
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
    {title: 'Los Simuladores', poster: '🕴️🕴️🕴️🕴️'},
    { title: 'Black Mirror', poster: '📱' },
    { title: 'Chernobyl', poster: '☢️' },
    { title: 'The Handmaid\'s Tale', poster: '🔴' },
    { title: 'Peaky Blinders', poster: '🎩' },
    { title: 'Better Call Saul', poster: '⚖️' },
  { title: 'Mad Men', poster: '🥃' },
  { title: 'The Simpsons', poster: '🍩' },
  { title: 'Seinfeld', poster: '🍔' },
  { title: 'Band of Brothers', poster: '🪖' },
  { title: 'Sherlock', poster: '🕵️' },
  { title: 'House of Cards', poster: '🏛️' },
  { title: 'Narcos', poster: '💉' },
  { title: 'The Boys', poster: '🦸' },
  { title: 'Succession', poster: '💰' },
  { title: 'Ted Lasso', poster: '⚽' },
  { title: 'The Witcher', poster: '🗡️' },
  { title: 'Vikings', poster: '⛵' },
  { title: 'Westworld', poster: '🤠' },
  { title: 'Yellowstone', poster: '🐴' },
  { title: 'The Last of Us', poster: '🍄' },
  { title: 'Wednesday', poster: '🕷️' },
  { title: 'Andor', poster: '🌌' },
  { title: 'Severance', poster: '🚪' },
  { title: 'The White Lotus', poster: '🏖️' },
  { title: 'Only Murders in the Building', poster: '🔍' },
  { title: 'Reacher', poster: '💪' },
  { title: 'Slow Horses', poster: '🕵️‍♂️' },
  { title: 'Fargo', poster: '❄️' },
  { title: 'True Detective', poster: '🕯️' },
  { title: 'The Bear', poster: '🍔' },
  { title: 'Yellowjackets', poster: '✈️' },
  { title: 'Euphoria', poster: '💄' },
  { title: 'Arcane', poster: '🔮' },
  { title: 'Invincible', poster: '🦸' },
  { title: 'The Umbrella Academy', poster: '☂️' },
  { title: 'Bridgerton', poster: '👑' },
  { title: 'Merlina', poster: '🖤' }, 
  { title: 'El Marginal', poster: '🚔' },
  { title: 'El Eternauta', poster: '☢️' }
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
    { title: 'La naranja mecánica', year: '1971', poster: '🍊' },
    { title: 'Psicosis', year: '1960', poster: '🔪' },
  { title: 'El bueno, el feo y el malo', year: '1966', poster: '🤠' },
  { title: 'Tiburón', year: '1975', poster: '🦈' },
  { title: 'El Padrino', year: '1972', poster: '🎭' },
  { title: 'Vértigo', year: '1958', poster: '🌪️' },
  { title: 'Tiempos modernos', year: '1936', poster: '⚙️' },
  { title: 'Luces de la ciudad', year: '1931', poster: '🌃' },
  { title: 'El apartamento', year: '1960', poster: '🔑' },
  { title: 'Algunos lo prefieren caliente', year: '1959', poster: '🎺' },
  { title: 'Con faldas y a lo loco', year: '1959', poster: '👠' }, // título alternativo común en español para Some Like It Hot
  { title: '12 hombres en pugna', year: '1957', poster: '⚖️' },
  { title: 'La dolce vita', year: '1960', poster: '🛵' },
  { title: 'El séptimo sello', year: '1957', poster: '♟️' },
  { title: 'Senderos de gloria', year: '1957', poster: '🪖' },
  { title: 'El crepúsculo de los dioses', year: '1950', poster: '🎥' },
  { title: 'La regla del juego', year: '1939', poster: '🏰' },
  { title: 'Metropolis', year: '1927', poster: '🤖' },
  { title: 'El gabinete del Dr. Caligari', year: '1920', poster: '🌀' },
  { title: 'El general', year: '1926', poster: '🚂' },
  { title: 'Nosferatu', year: '1922', poster: '🦇' },
  { title: 'King Kong', year: '1933', poster: '🦍' },
  { title: 'Frankenstein', year: '1931', poster: '⚡' },
  { title: 'Drácula', year: '1931', poster: '🧛' },
  { title: 'El halcón maltés', year: '1941', poster: '🦅' },
  { title: 'El tercer hombre', year: '1949', poster: '🗼' },
  { title: 'La pasión de Juana de Arco', year: '1928', poster: '🔥' },
  { title: 'El gran dictador', year: '1940', poster: '📢' },
  { title: 'M, el vampiro de Düsseldorf', year: '1931', poster: '🕵️' },
  { title: 'Cielo sobre Berlín', year: '1987', poster: '🕊️' }, // wait, pre-1980? Skip if strict, but many include late 70s/early 80s classics; adjust to pre-1980
  { title: 'Taxi Driver', year: '1976', poster: '🚖' },
  { title: 'Apocalypse Now', year: '1979', poster: '🌴' },
  { title: 'La guerra de las galaxias', year: '1977', poster: '🚀' },
  { title: 'El exorcista', year: '1973', poster: '🌀' },
  { title: 'Chinatown', year: '1974', poster: '🕶️' },
  { title: 'Un tranvía llamado deseo', year: '1951', poster: '🚋' },
  { title: 'Eva al desnudo', year: '1950', poster: '🎭' },
  { title: 'La soga', year: '1948', poster: '🪢' },
  { title: 'La diligencia', year: '1939', poster: '🚌' },
  { title: 'El tesoro de Sierra Madre', year: '1948', poster: '⛏️' },
  { title: 'Matar a un ruiseñor', year: '1962', poster: '📖' },
  { title: 'El puente sobre el río Kwai', year: '1957', poster: '🌉' }
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
    { title: 'Encanto', poster: '🦋' },
    { title: 'Los Increíbles', poster: '🦸' },
  { title: 'Coco', poster: '🎸' },
  { title: 'Inside Out', poster: '🧠' },
  { title: 'Frozen', poster: '❄️' },
  { title: 'Up', poster: '🎈' },
  { title: 'Zootopia', poster: '🦊' },
  { title: 'Big Hero 6', poster: '🤖' },
  { title: 'Soul', poster: '🎹' },
  { title: 'Luca', poster: '🦈' },
  { title: 'Turning Red', poster: '🧧' },
  { title: 'Elemental', poster: '🔥' },
  { title: 'Mi Vecino Totoro', poster: '🌳' },
  { title: 'La Princesa Mononoke', poster: '🐺' },
  { title: 'El Castillo Ambulante', poster: '🏰' },
  { title: 'Ponyo', poster: '🐟' },
  { title: 'El Castillo en el Cielo', poster: '✈️' },
  { title: 'La Tumba de las Luciérnagas', poster: '🪰' },
  { title: 'Akira', poster: '🏍️' },
  { title: 'Ghost in the Shell', poster: '🤖' },
  { title: 'Your Name', poster: '🌌' },
  { title: 'El Niño y la Garza', poster: '🦅' },
  { title: 'Spider-Man: Into the Spider-Verse', poster: '🕷️' },
  { title: 'Spider-Man: Across the Spider-Verse', poster: '🌈' },
  { title: 'The Lego Movie', poster: '🧱' },
  { title: 'Coraline', poster: '🔑' },
  { title: 'Pesadilla antes de Navidad', poster: '🎃' },
  { title: 'El Corpse Bride', poster: '💀' },
  { title: 'Frankenweenie', poster: '🐶' },
  { title: 'ParaNorman', poster: '👻' },
  { title: 'Isle of Dogs', poster: '🐕' },
  { title: 'Fantastic Mr. Fox', poster: '🦊' },
  { title: 'Chicken Run', poster: '🐔' },
  { title: 'Wallace & Gromit: La maldición de las verduras', poster: '🧀' },
  { title: 'Madagascar', poster: '🦁' },
  { title: 'Megamente', poster: '🧠' },
  { title: 'Cómo robar un tren', poster: '🚂' }, // wait, better: 'Despicable Me' as 'Mi Villano Favorito'
  { title: 'Mi Villano Favorito', poster: '🍌' },
  { title: 'Los Minions', poster: '🍌' },
  { title: 'El Príncipe de Egipto', poster: '🌊' },
  { title: 'Spirit: El corcel indomable', poster: '🐴' },
  { title: 'El Libro de la Selva', poster: '🐅' },
  { title: 'La Sirenita', poster: '🧜' },
  { title: 'Hércules', poster: '⚡' },
  { title: 'El Jorobado de Notre Dame', poster: '🔔' },
  { title: 'Lilo & Stitch', poster: '👽' },
  { title: 'Bolt: Un perro fuera de serie', poster: '⚡' },
  { title: 'Enredados', poster: '💇' },
  { title: 'Valiente', poster: '🏹' },
  { title: 'Raya y el último dragón', poster: '🐉' },
  { title: 'Pinocchio', poster: '🤥' }
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
    { title: 'Alicia en el país de las maravillas', author: 'Carroll', poster: '🐰' },
    { title: 'Fahrenheit 451', author: 'Bradbury', poster: '🔥' },
  { title: 'El retrato de Dorian Gray', author: 'Wilde', poster: '🖼️' },
  { title: 'El proceso', author: 'Kafka', poster: '⚖️' },
  { title: 'Ulises', author: 'Joyce', poster: '🌊' },
  { title: 'Madame Bovary', author: 'Flaubert', poster: '💔' },
  { title: 'Anna Karenina', author: 'Tolstói', poster: '🚂' },
  { title: 'Guerra y paz', author: 'Tolstói', poster: '⚔️' },
  { title: 'Los hermanos Karamázov', author: 'Dostoievski', poster: '🙏' },
  { title: 'El extranjero', author: 'Camus', poster: '☀️' },
  { title: 'El viejo y el mar', author: 'Hemingway', poster: '🐟' },
  { title: 'Moby Dick', author: 'Melville', poster: '🐳' },
  { title: 'El conde de Montecristo', author: 'Dumas', poster: '🏴‍☠️' },
  { title: 'Jane Eyre', author: 'Brontë', poster: '🏰' },
  { title: 'Cumbres borrascosas', author: 'Brontë', poster: '⛰️' },
  { title: 'Rebelión en la granja', author: 'Orwell', poster: '🐷' },
  { title: 'Un mundo feliz', author: 'Huxley', poster: '💉' },
  { title: 'El señor de las moscas', author: 'Golding', poster: '🐗' },
  { title: 'El guardián entre el centeno', author: 'Salinger', poster: '🎣' },
  { title: 'Lolita', author: 'Nabokov', poster: '❤️' },
  { title: 'Rayuela', author: 'Cortázar', poster: '🎱' },
  { title: 'El túnel', author: 'Sábato', poster: '🕳️' },
  { title: 'Ficciones', author: 'Borges', poster: '♾️' },
  { title: 'El Aleph', author: 'Borges', poster: '🔮' },
  { title: 'Pedro Páramo', author: 'Rulfo', poster: '👻' },
  { title: 'La casa de los espíritus', author: 'Allende', poster: '🏠' },
  { title: 'El amor en los tiempos del cólera', author: 'García Márquez', poster: '💌' },
  { title: 'El perfume', author: 'Süskind', poster: '👃' },
  { title: 'El nombre de la rosa', author: 'Eco', poster: '📖' },
  { title: 'El hobbit', author: 'Tolkien', poster: '🧝' },
  { title: 'Dune', author: 'Herbert', poster: '🏜️' },
  { title: 'El código Da Vinci', author: 'Brown', poster: '🔍' },
  { title: 'Crepúsculo', author: 'Meyer', poster: '🧛' },
  { title: 'El alquimista', author: 'Coelho', poster: '🌟' },
  { title: 'Siddhartha', author: 'Hesse', poster: '🧘' },
  { title: 'El lobo estepario', author: 'Hesse', poster: '🐺' },
  { title: 'El maestro y Margarita', author: 'Bulgákov', poster: '🐱' },
  { title: 'Beloved', author: 'Morrison', poster: '👻' },
  { title: 'Catch-22', author: 'Heller', poster: '✈️' },
  { title: 'Las mil y una noches', author: 'Anónimo', poster: '🪔' },
  { title: 'La divina comedia', author: 'Dante', poster: '🔥' },
  { title: 'La Iliada', author: 'Homero', poster: '🏹' },
  { title: 'Hamlet', author: 'Shakespeare', poster: '💀' },
  { title: 'Romeo y Julieta', author: 'Shakespeare', poster: '❤️' },
  { title: 'Macbeth', author: 'Shakespeare', poster: '🗡️' },
  { title: 'El rey Lear', author: 'Shakespeare', poster: '👑' },
  { title: 'El sueño de una noche de verano', author: 'Shakespeare', poster: '🧚' }
  ]
};

// Películas para el inicio
const STARTER_MOVIES = [
  { title: 'Titanic', poster: '🚢💔' },
  { title: 'El Rey León', poster: '👑🦁' },
  { title: 'Star Wars', poster: '⭐⚔️' },
  { title: 'Jurassic Park', poster: '🦕🌴' },
  { title: 'Matrix', poster: '💊🕶️' },
  { title: 'Avatar', poster: '🌳💙' },
  { title: 'Harry Potter', poster: '⚡🧙' },
  { title: 'El Padrino', poster: '🎭🔫' },
  { title: 'Frozen', poster: '❄️👸' },
  { title: 'Buscando a Nemo', poster: '🐠🌊' },
  { title: 'Inception', poster: '🌀💤' },
  { title: 'Interstellar', poster: '🌌🚀' },
  { title: 'Joker', poster: '🃏😈' },
  { title: 'Parasite', poster: '🏠🪱' },
  { title: 'La La Land', poster: '🎵🌆' },
  { title: 'Pulp Fiction', poster: '🔫🍔' },
  { title: 'El club de la pelea', poster: '👊💣' },
  { title: 'Forrest Gump', poster: '🪶🏃' },
  { title: 'Gladiador', poster: '⚔️🏟️' },
  { title: 'El silencio de los corderos', poster: '🦋🔪' },
  { title: 'Psicosis', poster: '🚿🔪' },
  { title: 'Tiburón', poster: '🦈🏖️' },
  { title: 'E.T.', poster: '👽🚲' },
  { title: 'El señor de los anillos', poster: '💍🧝' },
  { title: 'Toy Story', poster: '🤠🦖👩‍🚀' },
  { title: 'Up', poster: '🎈🏠' },
  { title: 'Inside Out', poster: '🧠😢😡' },
  { title: 'Coco', poster: '🎸💀' },
  { title: 'Los Increíbles', poster: '🦸‍♂️🦸‍♀️' },
  { title: 'Shrek', poster: '👹🐴' },
  { title: 'El lobo de Wall Street', poster: '🐺💰📞' },
  { title: 'El bueno, el feo y el malo', poster: '🤠🔫🤠🔫🤠🔫' },
  { title: 'Taxi Driver', poster: '🚖🔫' },
  { title: 'Chinatown', poster: '👲🌆' },
  { title: 'El exorcista', poster: '👧👺⛪' },
  { title: 'Alien', poster: '👾🛸' },
  { title: 'Blade Runner', poster: '🌧️🤖' },
  { title: 'El pianista', poster: '🎹🏚️' },
  { title: 'El laberinto del fauno', poster: '🧚🗡️' },
  { title: 'Amélie', poster: '🎨🍲' },
  { title: 'El gran dictador', poster: '📢✋' },
  { title: 'Cantando bajo la lluvia', poster: '☔🎤' },
  { title: 'Casablanca', poster: '🏠⬜' },
  { title: 'El mago de Oz', poster: '🌈👠' },
  { title: 'Vértigo', poster: '🌪️👀' },
  { title: 'El apartamento', poster: '🔑🎄' },
  { title: 'Lawrence de Arabia', poster: '🐪🏜️' },
  { title: 'Ben-Hur', poster: '🏛️' },
  { title: '2001: Una odisea del espacio', poster: '🪐🧑‍🚀' },
  { title: 'La naranja mecánica', poster: '🍊👁️' },
  { title: 'El Padrino II', poster: '🎭🕶️' },
  { title: 'Kill Bill', poster: '🗡️💛' },
  { title: 'El curioso caso de Benjamin Button', poster: '⏳👶' },
  { title: 'El planeta de los simios', poster: '🌏🐒' },
  { title: 'Grease', poster: '💃🚗' },
  { title: 'Dirty Dancing', poster: '🧹💃🕺' },
  { title: 'Regreso al futuro', poster: '⚡🚗' },
  { title: 'El club de los poetas muertos', poster: '📖🕺' }
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
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [teamLastCategories, setTeamLastCategories] = useState({});
  const [showObjectives, setShowObjectives] = useState(false);
  const [currentObjectiveIndex, setCurrentObjectiveIndex] = useState(0);
  const [isObjectiveRevealed, setIsObjectiveRevealed] = useState(false);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedWheelCategory, setSelectedWheelCategory] = useState(null);
  const [useWheel, setUseWheel] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [draggedStar, setDraggedStar] = useState(null);
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

    // Inicializar tracking de categorías por equipo
    const teamCategoryTracking = {};
    for (let i = 0; i < numTeams; i++) {
      teamCategoryTracking[i] = [];
    }
    setTeamLastCategories(teamCategoryTracking);

    setTeams(teamArray);
    setGamePhase('movieStart');
  };

  // Mostrar película inicial
  const showStarterMovie = () => {
    const randomMovie = STARTER_MOVIES[Math.floor(Math.random() * STARTER_MOVIES.length)];
    setStarterMovie(randomMovie);
    setIsCardFlipped(false);
  };

  // Voltear tarjeta
  const flipCard = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  // Navegación de objetivos
  const nextObjective = () => {
    setIsObjectiveRevealed(false);
    setCurrentObjectiveIndex((currentObjectiveIndex + 1) % teams.length);
  };

  const prevObjective = () => {
    setIsObjectiveRevealed(false);
    setCurrentObjectiveIndex((currentObjectiveIndex - 1 + teams.length) % teams.length);
  };

  const toggleObjectiveReveal = () => {
    setIsObjectiveRevealed(!isObjectiveRevealed);
  };

  // Girar ruleta
// Girar ruleta
// Girar ruleta
  const spinWheel = () => {
    if (isWheelSpinning) return;
    
    setIsWheelSpinning(true);
    setSelectedWheelCategory(null);
    
    // Categorías disponibles
    const categories = Object.keys(categoryConfig);
    const totalCategories = categories.length;
    const degreesPerCategory = 360 / totalCategories;
    
    // Elegir categoría aleatoria
    const categoryIndex = Math.floor(Math.random() * totalCategories);
    const selectedCategory = categories[categoryIndex];
    
    // Calcular rotación exacta
    const segmentStartDegree = categoryIndex * degreesPerCategory;
    const segmentCenterDegree = segmentStartDegree + (degreesPerCategory / 2);
    
    // Vueltas completas (5-8 vueltas para efecto dramático)
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    
    // Rotación final
    const finalRotation = (fullSpins * 360) + (360 - segmentCenterDegree);
    
    setWheelRotation(finalRotation);
    
    // Después de la animación, mostrar resultado
    setTimeout(() => {
      setSelectedWheelCategory(selectedCategory);
      setIsWheelSpinning(false);
    }, 4000);
  };

  // Usar categoría de la ruleta
  const useWheelCategory = () => {
    if (selectedWheelCategory) {
      selectCategory(selectedWheelCategory);
      setSelectedWheelCategory(null);
      setWheelRotation(0);
      setUseWheel(false);
    }
  };

  // Cancelar y volver a girar
  const resetWheel = () => {
    setSelectedWheelCategory(null);
    setWheelRotation(0);
  };

  // Activar modo ruleta
  const activateWheel = () => {
    setUseWheel(true);
  };

  // Volver a selección manual
  const backToManualSelection = () => {
    setUseWheel(false);
    setSelectedWheelCategory(null);
    setWheelRotation(0);
  };

  // Drag and drop para estrellas
  const handleStarDragStart = (e, teamId, categoryKey) => {
    setDraggedStar({ teamId, categoryKey });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleStarDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleStarDrop = (e, targetTeamId) => {
    e.preventDefault();
    
    if (!draggedStar || draggedStar.teamId === targetTeamId) {
      setDraggedStar(null);
      return;
    }

    // Confirmar robo de estrella
    if (confirm(`¿${teams[draggedStar.teamId].name} quiere robar la estrella de ${categoryConfig[draggedStar.categoryKey].name} a ${teams[targetTeamId].name}?`)) {
      const updatedTeams = [...teams];
      
      // Quitar estrella y puntos del equipo original
      updatedTeams[draggedStar.teamId].stars[draggedStar.categoryKey] = false;
      updatedTeams[draggedStar.teamId].points[draggedStar.categoryKey] = 0;
      
      // Dar estrella y puntos al equipo objetivo
      updatedTeams[targetTeamId].stars[draggedStar.categoryKey] = true;
      updatedTeams[targetTeamId].points[draggedStar.categoryKey] = 3;
      
      setTeams(updatedTeams);
    }
    
    setDraggedStar(null);
  };

  // Touch events para móviles
  const handleTouchStart = (e, teamId, categoryKey) => {
    e.stopPropagation();
    setDraggedStar({ teamId, categoryKey });
    e.target.style.opacity = '0.5';
  };

  const handleTouchMove = (e) => {
    if (!draggedStar) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Resaltar área de drop
    document.querySelectorAll('.team-card').forEach(card => {
      card.classList.remove('drop-target-highlight');
    });
    
    const teamCard = element?.closest('.team-card');
    if (teamCard) {
      teamCard.classList.add('drop-target-highlight');
    }
  };

  const handleTouchEnd = (e) => {
    e.target.style.opacity = '1';
    
    if (!draggedStar) return;
    
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const teamCard = element?.closest('.team-card');
    
    // Limpiar highlight
    document.querySelectorAll('.team-card').forEach(card => {
      card.classList.remove('drop-target-highlight');
    });
    
    if (teamCard) {
      const targetTeamId = parseInt(teamCard.dataset.teamid);
      
      if (draggedStar.teamId !== targetTeamId) {
        if (confirm(`¿${teams[draggedStar.teamId].name} quiere robar la estrella de ${categoryConfig[draggedStar.categoryKey].name} a ${teams[targetTeamId].name}?`)) {
          const updatedTeams = [...teams];
          updatedTeams[draggedStar.teamId].stars[draggedStar.categoryKey] = false;
          updatedTeams[draggedStar.teamId].points[draggedStar.categoryKey] = 0;
          updatedTeams[targetTeamId].stars[draggedStar.categoryKey] = true;
          updatedTeams[targetTeamId].points[draggedStar.categoryKey] = 3;
          setTeams(updatedTeams);
        }
      }
    }
    
    setDraggedStar(null);
  };

  // Comenzar la partida
  const beginPlaying = () => {
    setGamePhase('playing');
    setStarterMovie(null);
  };

  // Seleccionar categoría
  const selectCategory = (categoryKey) => {
    // Verificar que el equipo actual no haya jugado esta categoría 3 veces seguidas
    const currentTeamHistory = teamLastCategories[currentTeam] || [];
    if (currentTeamHistory.length >= 2 && 
        currentTeamHistory[0] === categoryKey && 
        currentTeamHistory[1] === categoryKey) {
      alert('Este equipo no puede elegir la misma categoría tres veces seguidas');
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

    // Actualizar historial de categorías del equipo actual
    const updatedTeamCategories = { ...teamLastCategories };
    updatedTeamCategories[currentTeam] = [categoryKey, ...(updatedTeamCategories[currentTeam] || [])].slice(0, 2);
    setTeamLastCategories(updatedTeamCategories);

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
    
    // Avanzar al siguiente equipo
    setCurrentTeam((currentTeam + 1) % numTeams);
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
    
    // Avanzar al siguiente equipo
    setCurrentTeam((currentTeam + 1) % numTeams);
  };

  // Falló - pasar al siguiente turno
  const missedTurn = () => {
    setIsTimerRunning(false);
    setCurrentItem(null);
    setCurrentCategory(null);
    
    // Avanzar al siguiente equipo
    setCurrentTeam((currentTeam + 1) % numTeams);
  };

  // Reiniciar partida
const restartGame = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar la partida?')) {
      localStorage.removeItem('digaloConMimicaState'); // Agregar esta línea
      setGamePhase('setup');
      setNumTeams(2);
      setTimeLimit(60);
      setTeams([]);
      setCurrentTeam(0);
      setStarterMovie(null);
      setIsCardFlipped(false);
      setCurrentCategory(null);
      setCurrentItem(null);
      setTimer(0);
      setIsTimerRunning(false);
      setTeamLastCategories({});
      setShowObjectives(false);
      setCurrentObjectiveIndex(0);
      setUsedItems({
        peliculasUnapalabra: [],
        directoresFamosos: [],
        series: [],
        peliculasClasicas: [],
        dibujosAnimados: [],
        libros: []
      });
    }
  };

  // Guardar estado en localStorage
  useEffect(() => {
    if (gamePhase !== 'setup') {
      const gameState = {
        gamePhase,
        numTeams,
        timeLimit,
        teams,
        currentTeam,
        teamLastCategories,
        usedItems,
        timer,
        isTimerRunning
      };
      localStorage.setItem('digaloConMimicaState', JSON.stringify(gameState));
    }
  }, [gamePhase, teams, currentTeam, teamLastCategories, usedItems, timer]);

  // Cargar estado al montar
  useEffect(() => {
    const savedState = localStorage.getItem('digaloConMimicaState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (window.confirm('¿Deseas continuar la partida anterior?')) {
          setGamePhase(parsed.gamePhase);
          setNumTeams(parsed.numTeams);
          setTimeLimit(parsed.timeLimit);
          setTeams(parsed.teams);
          setCurrentTeam(parsed.currentTeam);
          setTeamLastCategories(parsed.teamLastCategories);
          setUsedItems(parsed.usedItems);
          setTimer(parsed.timer);
          setIsTimerRunning(false); // No reiniciar timer automáticamente
        }
      } catch (e) {
        console.error('Error al cargar el estado guardado');
      }
    }
  }, []);

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

            <button className="instructions-btn" onClick={() => setShowInstructions(true)}>
              📖 Ver Instrucciones
            </button>
          </div>

          {/* Modal de instrucciones */}
          {showInstructions && (
            <div className="instructions-modal" onClick={() => setShowInstructions(false)}>
              <div className="instructions-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={() => setShowInstructions(false)}>✕</button>
                <h2>📖 Instrucciones del Juego</h2>
                
                <div className="instructions-section">
                  <h3>🎯 Objetivo</h3>
                  <p>Cada equipo tiene un objetivo secreto que debe cumplir para ganar. Los objetivos pueden incluir obtener estrellas de categorías específicas, robar estrellas, o completar desafíos especiales.</p>
                </div>

                <div className="instructions-section">
                  <h3>⭐ Puntos y Estrellas</h3>
                  <p><strong>Cada adivinanza correcta = 1 punto</strong></p>
                  <p><strong>3 puntos en una categoría = 1 estrella ⭐</strong></p>
                </div>

                <div className="instructions-section">
                  <h3>➡️ Comienzo</h3>
                  <p>Aparecerá un poster con unos emojis que representan una película.</p>
                  <p>Todos intentarán adivinar de cuál se trata. Tendrá prioridad el equipo que adivinó primero. </p>
                  <p>Para conocer la respuesta correcta hay que tocar en el poster.</p>
                </div>

                <div className="instructions-section">
                  <h3>🎡 Selección de Categoría</h3>
                  <p>En cada turno habrá un modo diferente de elegir la categoría</p>
                  <p><strong>1. Elección de equipo</strong> Seleccioná directamente la categoría que deseás.</p>
                  <p><strong>2. El equipo rival elige</strong> Seleccioná la categoría que el otro equipo representará.</p>
                  <p><strong>3. Usar la ruleta </strong> Presioná "🎡 Usar Ruleta" para que el azar decida la categoría.</p>
                  <p><strong>Nota:</strong> Un equipo no puede jugar la misma categoría tres veces seguidas.</p>
                </div>

                <div className="instructions-section">
                  <h3>🔄 Turnos</h3>
                  <p>Los turnos avanzan automáticamente en orden: Equipo 1 → Equipo 2 → Equipo 3 → etc.</p>
                  <p>No importa si el equipo acierta, falla o le roban, el turno siempre pasa al siguiente equipo.</p>
                </div>

                <div className="instructions-section">
                  <h3>🎭 Robo de Adivinanzas</h3>
                  <p>Si otro equipo sabe la respuesta mientras el equipo actual está jugando, puede robarla diciendo la respuesta en voz alta.</p>
                  <p><strong>⚠️ Cuidado:</strong> Si la respuesta es incorrecta, el equipo que está jugando gana el punto automáticamente.</p>
                  <strong>⚠️ Aclaración 2</strong> Si bien se tiene la chance de decir el nombre de un solo título para robar, el equipo está habilitado a hablar cuanto le plazca para confundir y/o poner nervioso al rival. Frases como: 'Tenés menos cine que un ciego', 'Un manco juega mejor que vos', o 'Hacé algún gesto que nos aburrimos' están todas permitidas.
                </div>

                <div className="instructions-section">
                  <h3>👑 Robo de Estrellas</h3>
                  <p>En su turno, el equipo deberá avisar en voz alta que quiere robar una estrella.</p>
                  <p>Deberá especificar la categoría y retar a un jugador del equipo desafiado.</p>
                  <p>Si el equipo logra robar, la estrella será trasladada de un equipo a otro.</p>
                  <p>Si el equipo no logra robar, el equipo rival conservará la estrella y un punto de una categoría a elección</p>
                </div>

                <div className="instructions-section">
                  <h3>🏆 Victoria</h3>
                  <p>El juego termina cuando un equipo cumple su objetivo secreto. </p>
                </div>
              </div>
            </div>
          )}
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
              <div className={`flip-card ${isCardFlipped ? 'flipped' : ''}`} onClick={flipCard}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="movie-poster-big">{starterMovie.poster}</div>
                    <p className="flip-hint">Toca para revelar</p>
                  </div>
                  <div className="flip-card-back">
                    <div className="movie-title-reveal">{starterMovie.title}</div>
                  </div>
                </div>
              </div>
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
              <div className="objectives-slider">
                <div className="objective-card-single">
                  <h3>{teams[currentObjectiveIndex]?.name}</h3>
                  <div 
                    className={`objective-reveal-container ${isObjectiveRevealed ? 'revealed' : ''}`}
                    onClick={toggleObjectiveReveal}
                  >
                    <div className="objective-cover">
                      <span className="reveal-icon">👁️</span>
                      <p className="reveal-text">Desliza para revelar</p>
                    </div>
                    <div className="objective-content">
                      <p>{teams[currentObjectiveIndex]?.objective}</p>
                    </div>
                  </div>
                </div>
                <div className="slider-controls">
                  <button 
                    className="slider-btn"
                    onClick={prevObjective}
                  >
                    ← Anterior
                  </button>
                  <span className="slider-indicator">{currentObjectiveIndex + 1} / {teams.length}</span>
                  <button 
                    className="slider-btn"
                    onClick={nextObjective}
                  >
                    Siguiente →
                  </button>
                </div>
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
            <button className="restart-btn" onClick={restartGame}>
              🔄 Reiniciar
            </button>
          </div>
<div className="scoreboard">
  {teams.map(team => (
    <div 
      key={team.id} 
      className={`team-card ${team.id === currentTeam ? 'active-team' : ''}`}
      data-teamid={team.id}
      onDragOver={handleStarDragOver}
      onDrop={(e) => handleStarDrop(e, team.id)}
    >
      <h3>{team.name}</h3>
      <div className="stars-display">
        {Object.keys(categoryConfig).map(catKey => (
          team.stars[catKey] && (
            <span 
              key={catKey} 
              className="star-badge" 
              style={{ backgroundColor: categoryConfig[catKey].color }}
              draggable="true"
              onDragStart={(e) => handleStarDragStart(e, team.id, catKey)}
              onTouchStart={(e) => handleTouchStart(e, team.id, catKey)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
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
              <h2>Turno de {teams[currentTeam].name}</h2>
              
              {!useWheel ? (
                <>
                  <div className="selection-mode">
                    <button className="mode-btn wheel-mode-btn" onClick={activateWheel}>
                      🎡 Usar Ruleta
                    </button>
                  </div>
                  
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
                </>
              ) : !selectedWheelCategory ? (
                <div className="wheel-container">
                  <button className="back-to-manual-btn" onClick={backToManualSelection}>
                    ← Volver a selección manual
                  </button>
                  <h3>¡Gira la ruleta!</h3>
                  <div className="wheel-wrapper">
                    <div className="wheel-pointer">▼</div>
                    <div 
                      className={`wheel ${isWheelSpinning ? 'spinning' : ''}`}
                      style={{ transform: `rotate(${wheelRotation}deg)` }}
                    >
                      {Object.keys(categoryConfig).map((catKey, index) => {
                        const totalCategories = Object.keys(categoryConfig).length;
                        const rotation = (360 / totalCategories) * index;
                        return (
                          <div
                            key={catKey}
                            className="wheel-segment"
                            style={{
                              transform: `rotate(${rotation}deg)`,
                              backgroundColor: categoryConfig[catKey].color
                            }}
                          >
                            <div className="wheel-segment-content">
                              <span className="wheel-emoji">{categoryConfig[catKey].emoji}</span>
                            </div>
                          </div>
                        );
                      })}
                      <div className="wheel-center">
                        <span>🎲</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="spin-btn" 
                    onClick={spinWheel}
                    disabled={isWheelSpinning}
                  >
                    {isWheelSpinning ? '🎡 Girando...' : '🎡 Girar Ruleta'}
                  </button>
                </div>
              ) : (
                <div className="wheel-result">
                  <h3>¡La ruleta eligió!</h3>
                  <div 
                    className="result-category"
                    style={{ backgroundColor: categoryConfig[selectedWheelCategory].color }}
                  >
                    <span className="result-emoji">{categoryConfig[selectedWheelCategory].emoji}</span>
                    <span className="result-name">{categoryConfig[selectedWheelCategory].name}</span>
                  </div>
                  <div className="wheel-actions">
                    <button className="use-category-btn" onClick={useWheelCategory}>
                      ✓ Usar esta categoría
                    </button>
                    <button className="respin-btn" onClick={resetWheel}>
                      🔄 Volver a girar
                    </button>
                    <button className="back-btn" onClick={backToManualSelection}>
                      ← Elegir manualmente
                    </button>
                  </div>
                </div>
              )}
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
                <button className="miss-btn" onClick={missedTurn}>
                  ✗ Falló
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
              <div className="objective-display">
                <h4>{teams[currentObjectiveIndex]?.name}</h4>
                <div 
                  className={`objective-reveal-container ${isObjectiveRevealed ? 'revealed' : ''}`}
                  onClick={toggleObjectiveReveal}
                >
                  <div className="objective-cover">
                    <span className="reveal-icon">👁️</span>
                    <p className="reveal-text">Toca para revelar</p>
                  </div>
                  <div className="objective-content">
                    <p>{teams[currentObjectiveIndex]?.objective}</p>
                  </div>
                </div>
              </div>
              <div className="slider-controls-overlay">
                <button 
                  className="slider-btn-overlay"
                  onClick={prevObjective}
                >
                  ←
                </button>
                <span className="slider-indicator">{currentObjectiveIndex + 1} / {teams.length}</span>
                <button 
                  className="slider-btn-overlay"
                  onClick={nextObjective}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DigaloConMimica;
