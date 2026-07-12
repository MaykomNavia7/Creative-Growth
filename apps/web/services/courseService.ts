export interface Lesson {
  id: string;
  title: string;
  duration: string;
  order: number;
  videoUrl: string;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  duration: string;
  lessonsCount: number;
  progress: number;
  category: "Piano" | "Teoría" | "Canto" | "Guitarra";
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    id: "piano-101",
    title: "Fundamentos de Piano I",
    description: "Domina la postura de las manos, el mapa del teclado, escalas mayores y digitación básica con retroalimentación visual.",
    level: "Principiante",
    duration: "4.5 horas",
    lessonsCount: 4,
    progress: 35,
    category: "Piano",
    lessons: [
      {
        id: "piano-l1",
        title: "Lección 1: Conociendo el Teclado",
        duration: "10 mins",
        order: 1,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Free public test video
        content: `### Bienvenido a tu primera lección de piano.
        
En esta lección aprenderás a identificar las notas en el teclado:
* Las teclas blancas representan los tonos naturales: C, D, E, F, G, A, B.
* Las teclas negras representan los semitonos (sostenidos y bemoles), agrupados en grupos de 2 y 3.
* El **Do Central (C4)** se encuentra justo a la izquierda del grupo de dos teclas negras en el centro del piano.`
      },
      {
        id: "piano-l2",
        title: "Lección 2: Postura y Digitación",
        duration: "12 mins",
        order: 2,
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        content: `### Postura correcta al piano:
1. Mantén la espalda recta y los pies apoyados en el suelo.
2. Tus brazos deben estar paralelos al suelo.
3. Tus dedos deben curvarse como si sostuvieras una pelota pequeña.
4. Toca las teclas con la yema de los dedos, no con la parte plana.`
      },
      {
        id: "piano-l3",
        title: "Lección 3: Tu primera escala (Do Mayor)",
        duration: "15 mins",
        order: 3,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        content: `### La escala de Do Mayor (C Major):
La escala de Do Mayor consiste en tocar las teclas blancas desde C hasta el siguiente C.
Digitación recomendada para mano derecha:
* **C4** - Dedo 1 (Pulgar)
* **D4** - Dedo 2 (Índice)
* **E4** - Dedo 3 (Medio)
* *Cruza el pulgar por debajo del dedo 3*
* **F4** - Dedo 1 (Pulgar)
* **G4** - Dedo 2
* **A4** - Dedo 3
* **B4** - Dedo 4
* **C5** - Dedo 5`
      },
      {
        id: "piano-l4",
        title: "Lección 4: Acordes Básicos Mayores",
        duration: "18 mins",
        order: 4,
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        content: `### Qué es un Acorde Triada:
Un acorde se forma al presionar 3 notas simultáneamente.
El acorde de **Do Mayor (C)** se compone de:
* **Raíz**: C
* **Tercera Mayor**: E
* **Quinta Justa**: G

Practica tocando estas tres notas juntas usando los dedos 1, 3 y 5 de tu mano derecha.`
      }
    ]
  },
  {
    id: "theory-101",
    title: "Teoría Musical y Armonía",
    description: "Aprende los cimientos de la música clásica y moderna: intervalos, escalas relativas, el círculo de quintas y progresiones armónicas.",
    level: "Intermedio",
    duration: "6.0 horas",
    lessonsCount: 3,
    progress: 60,
    category: "Teoría",
    lessons: [
      {
        id: "theory-l1",
        title: "Lección 1: Intervalos Musicales",
        duration: "15 mins",
        order: 1,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        content: `### ¿Qué es un Intervalo?
Un intervalo es la distancia en tono/altura entre dos notas musicales.
Los intervalos más comunes son:
* **Segunda Menor**: 1 semitono (ej. E a F)
* **Segunda Mayor**: 2 semitonos (ej. C a D)
* **Tercera Menor**: 3 semitonos (ej. A a C)
* **Tercera Mayor**: 4 semitonos (ej. C a E)
* **Quinta Justa**: 7 semitonos (ej. C a G)`
      },
      {
        id: "theory-l2",
        title: "Lección 2: Construcción de Escalas",
        duration: "20 mins",
        order: 2,
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        content: `### Estructura de la Escala Mayor:
Toda escala mayor sigue la siguiente secuencia de intervalos:
**Tono - Tono - Semitono - Tono - Tono - Tono - Semitono** (T-T-S-T-T-T-S)

Si empezamos en C:
* C + Tono = D
* D + Tono = E
* E + Semitono = F
* F + Tono = G
* G + Tono = A
* A + Tono = B
* B + Semitono = C`
      },
      {
        id: "theory-l3",
        title: "Lección 3: El Círculo de Quintas",
        duration: "25 mins",
        order: 3,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        content: `### El Mapa de la Armonía:
El Círculo de Quintas es una representación geométrica de la relación entre los 12 tonos de la escala cromática, sus armaduras de clave correspondientes y sus tonalidades relativas mayores y menores.
* Moviéndose a la derecha (sentido horario), avanzamos por intervalos de quintas justas (C -> G -> D -> A -> E -> B...).
* Cada paso agrega un sostenido (#) a la armadura de clave.`
      }
    ]
  }
];

export function getCourses(): Course[] {
  return COURSES;
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find(c => c.id === id);
}
