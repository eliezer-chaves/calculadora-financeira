
// Máscara de entrada para a taxa de juros com símbolo de porcentagem
IMask(document.getElementById('taxaAnual'), {
    mask: Number,
    scale: 2,
    signed: false,
    radix: ',',
    mapToRadix: ['.'],
    suffix: ' %'
});

// Adiciona um ouvinte de evento para o formulário
document.getElementById('taxasEquivalentes').addEventListener('keypress', function (event) {
    // Verifica se a tecla pressionada é 'Enter'
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão de enviar o formulário
        calcularEquivalencia(); // Chama a função de cálculo
    }
});

function calcularEquivalencia() {
    
    const taxaAnual = parseFloat(document.getElementById('taxaAnual').value.replace(/[.\s%]/g, '').replace(',', '.')) / 100;

    if (isNaN(taxaAnual)) {
        $('#modalAviso').modal('show')
        return;
    }

    // Cálculo da taxa de juros mensal
    const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;


    // Cálculo e exibição da taxa mensal e taxa diária
    const taxaMensalPercentual = taxaMensal * 100;
    document.getElementById('taxaMensal').value = taxaMensalPercentual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' %';

    const taxaJurosDiaria = Math.pow(1 + taxaMensal, 1 / 30) - 1;
    
    const taxaDiariaPercentual = taxaJurosDiaria * 100;
    document.getElementById('taxaDiaria').value = taxaDiariaPercentual.toLocaleString('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) + ' %';

    document.getElementById('resultados').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
        });
});