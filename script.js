// Obtém o canvas e o contexto
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define a largura e altura da grade
const gridWidth = 10;
const gridHeight = 10;

// Define a velocidade da cobrinha em pixels por segundo
const speed = 20;

// Define a pontuação inicial do jogador
let score = 0;

// Cria a cobrinha
let snake = [
  { x: 10, y: 10 },
  { x: 20, y: 10 },
  { x: 30, y: 10 }
];

// Cria a comida
let food = { x: 50, y: 50 };

// Função que desenha a cobrinha e a comida no canvas
function draw() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobrinha
  snake.forEach(segment => {
    ctx.fillStyle = 'green';
    ctx.fillRect(segment.x, segment.y, gridWidth, gridHeight);
  });

  // Desenha a comida
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridWidth, gridHeight);

  // Mostra a pontuação do jogador
  document.getElementById('score').textContent = `Pontuação: ${score}`;
}

// Função que move a cobrinha
function move() {
    // Cria um novo objeto head que representa a nova posição da cabeça da cobrinha
    const head = {
      x: snake[0].x + direction.x * gridWidth,
      y: snake[0].y + direction.y * gridHeight
    };
  
    // Adiciona a nova posição da cabeça da cobrinha ao início do array e remove o último segmento da cauda
    snake.unshift(head);
    snake.pop();
  
    // Verifica se a cobrinha comeu a comida
    if (head.x === food.x && head.y === food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * canvas.width / gridWidth) * gridWidth,
        y: Math.floor(Math.random() * canvas.height / gridHeight) * gridHeight
      };
      // Adiciona um novo segmento à cauda da cobrinha
      snake.push(snake[snake.length - 1]);
    }
  
    // Verifica se a cobrinha bateu na parede ou em si mesma
    if (
      head.x < 0 ||
      head.x >= canvas.width ||
      head.y < 0 ||
      head.y >= canvas.height ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      alert(`Fim de jogo! Sua pontuação foi ${score}.`);
      document.location.reload();
    }
  }
  
  // Função principal que chama as outras funções a cada intervalo de tempo
  function main() {
    draw();
    move();
  }
  
  setInterval(main, 1000 / speed);