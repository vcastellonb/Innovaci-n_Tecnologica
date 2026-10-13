// Unidad 2 — Multitudes y agentes · IPC121NSCT
// Equipo:       ______________________
// Integrantes:  ______________________
//
// Este es el mismo archivo que va a crecer clase a clase, de la Clase 1 a la Clase 8.
// No lo reemplaces por otro: cada clase agrega una capacidad sobre lo que ya hay acá.

let agentes = [];
let cantidad = 50;    
let radio = 80;      

function setup() {
  createCanvas(400, 400); 

  for (let i = 0; i < cantidad; i++) {
    agentes.push({
      x: random(30, 370),
      y: random(30, 370),
      vx: random(-2, 2),
      vy: random(-2, 2),
      d: map(noise(i * 0.1), 0, 1, 10, 20)
    });
  }
}

function draw() {
  background(245, 243, 235); 
  noStroke();

  for (let a of agentes) {
    alinear(a);      
    mover(a);        
    aplicarBorde(a); 
    mostrar(a);      
  }
}

function mover(a) {
  a.x += a.vx;
  a.y += a.vy;
}

function aplicarBorde(a) {
  if (a.x > 390) {
    a.x = 390;
    a.vx *= -1;
  }
  if (a.x < 10) {
    a.x = 10;
    a.vx *= -1;
  }
  if (a.y > 390) {
    a.y = 390;
    a.vy *= -1;
  }
  if (a.y < 10) {
    a.y = 10;
    a.vy *= -1;
  }
}

function alinear(a) {
  let sx = 0;
  let sy = 0;
  let n = 0;

  for (let b of agentes) {
    if (a !== b && dist(a.x, a.y, b.x, b.y) < radio) {
      sx += b.vx;
      sy += b.vy;
      n++;
    }
  }
  
  if (n > 0) {
    a.vx = lerp(a.vx, sx / n, 0.08);
    a.vy = lerp(a.vy, sy / n, 0.08);
  }
}

function mostrar(a) {
  let n = 0;
  for (let b of agentes) {
    if (a !== b && dist(a.x, a.y, b.x, b.y) < radio) {
      n++;
    }
  }

  if (n > 0) {
    fill(46, 196, 230); 
  } else {
    fill(120);  
  }

  circle(a.x, a.y, a.d);
}
