const modeloLabirinto = [
  "WWWWWWWWWWWWWWWWWWWWW", // linha 0
  "W   W     W     W W W", // linha 1
  "W W W WWW WWWWW W W W", // linha 2
  "W W W   W     W W   W", // linha 3
  "W WWWWWWW W WWW W W W", // linha 4
  "W         W     W W W", // linha 5
  "W WWW WWWWW WWWWW W W", // linha 6
  "W W   W   W W     W W", // linha 7
  "W WWWWW W W W WWW W F", // linha 8
  "S     W W W W W W WWW", // linha 9
  "WWWWW W W W W W W W W", // linha 10
  "W     W W W   W W W W", // linha 11
  "W WWWWWWW WWWWW W W W", // linha 12
  "W       W       W   W", // linha 13
  "WWWWWWWWWWWWWWWWWWWWW", // linha 14
];
//14 x 21

let playerPosition = { linha: 9, coluna: 0 };
let movimentos = 0;
let div_resultado = document.querySelector("#container-resultado");

//1. Criar labirinto com base no modelo
function criarLabirinto(modeloLabirinto, playerPosition) {
  const divLabirinto = document.querySelector("#labirinto");
  divLabirinto.innerHTML = "";

  for (let linha = 0; linha < modeloLabirinto.length; linha++) {
    const divLinha = document.createElement("div");
    divLinha.classList.add("linha");

    const str_linha = modeloLabirinto[linha];
    for (let coluna = 0; coluna < str_linha.length; coluna++) {
      const celula = document.createElement("div");
      celula.classList.add("celula");

      if (str_linha[coluna] == "W") {
        celula.classList.add("parede");
      } else if (str_linha[coluna] == "F") {
        celula.classList.add("chegada");
      } else if (
        playerPosition.linha === linha &&
        playerPosition.coluna === coluna
      ) {
        celula.classList.add("jogador");
      } else {
        celula.classList.add("caminho");
      }
      divLinha.appendChild(celula);
    }
    divLabirinto.appendChild(divLinha);
  }
}
criarLabirinto(modeloLabirinto, playerPosition);

//2. Criar movimentos do jogador
document.addEventListener("keydown", function (event) {
  const pressedKey = event.key;

  let newPosition = {
    linha: playerPosition.linha,
    coluna: playerPosition.coluna,
  };

  if (pressedKey === "ArrowUp") {
    newPosition.linha -= 1;
  } else if (pressedKey === "ArrowDown") {
    newPosition.linha += 1;
  } else if (pressedKey === "ArrowLeft") {
    newPosition.coluna -= 1;
  } else if (pressedKey === "ArrowRight") {
    newPosition.coluna += 1;
  }

  if (validarMovimento(newPosition)) {
    criarLabirinto(modeloLabirinto, newPosition);
    movimentos++;
    playerPosition = newPosition;
    checkWinCodition();
  }
});

//3. Validar movimentos
function validarMovimento(posicao) {
  const totalDeLinhas = modeloLabirinto.length;
  const totalDeColunas = modeloLabirinto[0].length;

  const linha = posicao.linha;
  const coluna = posicao.coluna;

  return !(
    coluna < 0 ||
    coluna >= totalDeColunas ||
    linha < 0 ||
    linha >= totalDeLinhas ||
    modeloLabirinto[linha][coluna] === "W"
  );
}

//4. Verificar condicao de vitoria
function checkWinCodition() {
  const linha = playerPosition.linha;
  const coluna = playerPosition.coluna;

  if (modeloLabirinto[linha][coluna] === "F") {
    const finish = document.querySelector(".chegada");
    const avisoFinal = document.querySelector("#resultado");

    avisoFinal.innerHTML = `Voce venceu com ${movimentos} movimentos!`;
    div_resultado.classList.remove("hidden");
    finish.classList.remove("chegada");
    finish.classList.add("jogador");
  }
}

//5. Resetar o labirinto
function resetarLabirinto() {
  movimentos = 0;
  playerPosition = { linha: 9, coluna: 0 };
  criarLabirinto(modeloLabirinto, playerPosition);
  div_resultado.classList.add("hidden");
}
