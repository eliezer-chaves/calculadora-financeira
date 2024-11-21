// Máscara de entrada para o aporte mensal
IMask(document.getElementById('capitalInicial'), {
    mask: 'R$ num',
    blocks: {
        num: {
            mask: Number,
            thousandsSeparator: '.',
            radix: ','
        }
    }
});

// Máscara de entrada para a taxa de juros com símbolo de porcentagem
IMask(document.getElementById('taxaJuros'), {
    mask: Number,
    scale: 2,
    signed: false,
    radix: ',',
    mapToRadix: ['.'],
    suffix: ' %'
});

function atualizarAnos() {
    const numPeriodos = parseInt(document.getElementById('numPeriodos').value);
    if (!isNaN(numPeriodos)) {
        const anos = Math.floor(numPeriodos / 12);
        const meses = numPeriodos % 12;

        let textoAnos = anos === 1 ? '1 ano' : `${anos} anos`;
        let textoMeses = meses > 0 ? (meses === 1 ? ' e 1 mês' : ` e ${meses} meses`) : '';

        document.getElementById('mesesInvestidos').value = textoAnos + textoMeses;
    } else {
        document.getElementById('mesesInvestidos').value = '';
    }
}

// Adiciona um ouvinte de evento para o formulário
document.getElementById('jurosSimples').addEventListener('keypress', function (event) {
    // Verifica se a tecla pressionada é 'Enter'
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão de enviar o formulário
            calcularJurosSimples(); // Chama a função de cálculo
        }
});

function calcularJurosSimples() {
    const capitalInicial = parseFloat(document.getElementById('capitalInicial').value.replace(/[R$\s.]/g, '').replace(',', '.'));

    const numPeriodos = parseInt(document.getElementById('numPeriodos').value);

    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value.replace(/[.\s%]/g, '').replace(',', '.')) / 100;

    if (isNaN(capitalInicial) || isNaN(numPeriodos) || isNaN(taxaJuros)) {
        $('#modalAviso').modal('show')
        return;
    }

    let resultado = capitalInicial*taxaJuros*numPeriodos;
    const montante = resultado + capitalInicial

    // Exibição dos valores iniciais (sem inflação)
    document.getElementById('montanteFinal').value = 'R$ ' + montante.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    document.getElementById('resultado').value = 'R$ ' + resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    document.getElementById('resultados').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
        });
});