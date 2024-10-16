document.getElementById('btnCalc').addEventListener('click', function() {
    // Constantes
    const DISTANCIA = 120; // distância em Km entre as paradas A e B
    const PEDAGIO_BASE = 20; // valor do pedágio

    // Captura de dados de entrada
    let placa = document.getElementById('placa').value;
    let hora1 = document.getElementById('hora1').value;
    let hora2 = document.getElementById('hora2').value;

    // Verificação de campos vazios
    if (!placa || !hora1 || !hora2) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Conversão de tempo para milissegundos
    let inicio = new Date(`1970-01-01T${hora1}Z`);
    let fim = new Date(`1970-01-01T${hora2}Z`);
    let tempoGasto = (fim - inicio) / (1000 * 60 * 60); // tempo em horas

    // Se tempo gasto for negativo (ex.: a segunda parada é no outro dia)
    if (tempoGasto < 0) {
        alert("Horário da segunda parada deve ser posterior ao da primeira parada.");
        return;
    }

    // Cálculo da velocidade média
    let velocidadeMedia = DISTANCIA / tempoGasto;

    // Cálculo do desconto no pedágio
    let desconto = 0;
    if (velocidadeMedia <= 60) {
        desconto = 0.15; // 15% de desconto
    } else if (velocidadeMedia <= 100) {
        desconto = 0.10; // 10% de desconto
    } else {
        desconto = 0; // Sem desconto
    }

    // Cálculo do valor do pedágio
    let valorPedagio = PEDAGIO_BASE * (1 - desconto);

    // Exibindo os resultados na tela
    document.getElementById('PlacaVeic').innerText = placa;
    document.getElementById('TrechoA').innerText = hora1;
    document.getElementById('TrechoB').innerText = hora2;
    document.getElementById('timeGast').innerText = `${tempoGasto.toFixed(2)} horas`;
    document.getElementById('veloMed').innerText = `${velocidadeMedia.toFixed(2)} km/h`;
    document.getElementById('valor').innerText = `R$ ${valorPedagio.toFixed(2)}`;

    // Armazenamento para relatórios
    registrarDados(velocidadeMedia, valorPedagio);
});

document.getElementById('btnLimp').addEventListener('click', function() {
    document.getElementById('placa').value = '';
    document.getElementById('hora1').value = '';
    document.getElementById('hora2').value = '';
    document.getElementById('PlacaVeic').innerText = '';
    document.getElementById('TrechoA').innerText = '';
    document.getElementById('TrechoB').innerText = '';
    document.getElementById('timeGast').innerText = '';
    document.getElementById('veloMed').innerText = '';
    document.getElementById('valor').innerText = '';
});

// Variáveis globais para armazenar os dados
let menorVelocidade = Infinity;
let maiorVelocidade = 0;
let somaVelocidades = 0;
let totalVeiculos = 0;
let totalValores = 0;
let inicioProcesso = null;
let finalProcesso = null;

// Função para registrar os dados de cada veículo
function registrarDados(velocidade, valor) {
    // Atualizando menor e maior velocidade
    if (velocidade < menorVelocidade) {
        menorVelocidade = velocidade;
    }
    if (velocidade > maiorVelocidade) {
        maiorVelocidade = velocidade;
    }

    // Atualizando a soma das velocidades e o número de veículos
    somaVelocidades += velocidade;
    totalVeiculos++;

    // Atualizando o total de valores cobrados
    totalValores += valor;

    // Captura do início e final do processo
    let agora = new Date();
    if (!inicioProcesso) {
        inicioProcesso = agora; // Primeiro veículo
    }
    finalProcesso = agora; // Último veículo sempre será o mais recente
}

// Função para fechar o caixa e exibir o relatório final
function fecharCaixa() {
    if (totalVeiculos === 0) {
        alert("Nenhum veículo processado.");
        return;
    }

    let mediaVelocidade = somaVelocidades / totalVeiculos;

    alert(`Relatório do Turno:
    - Menor Velocidade: ${menorVelocidade.toFixed(2)} km/h
    - Maior Velocidade: ${maiorVelocidade.toFixed(2)} km/h
    - Média das Velocidades: ${mediaVelocidade.toFixed(2)} km/h
    - Total Valores Cobrados: R$ ${totalValores.toFixed(2)}
    - Início do Processamento: ${inicioProcesso.toLocaleTimeString()}
    - Final do Processamento: ${finalProcesso.toLocaleTimeString()}`);
}