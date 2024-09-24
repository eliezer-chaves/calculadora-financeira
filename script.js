// Máscara de entrada para o aporte mensal
IMask(document.getElementById('aporteMensal'), {
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

        document.getElementById('anosInvestidos').value = textoAnos + textoMeses;
    } else {
        document.getElementById('anosInvestidos').value = '';
    }
}

// Adiciona um ouvinte de evento para o formulário
document.getElementById('financeForm').addEventListener('keypress', function (event) {
    // Verifica se a tecla pressionada é 'Enter'
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão de enviar o formulário
        calcular(); // Chama a função de cálculo
    }
});

function calcular() {
    const aporteMensal = parseFloat(document.getElementById('aporteMensal').value.replace(/[R$\s.]/g, '').replace(',', '.'));
    const numPeriodos = parseInt(document.getElementById('numPeriodos').value);
    const taxaJurosAnual = parseFloat(document.getElementById('taxaJuros').value.replace(/[.\s%]/g, '').replace(',', '.')) / 100;
    const considerarInflacao = document.getElementById('considerarInflacao').checked;
    const inflacaoAnual = considerarInflacao ? parseFloat(document.getElementById('inflacao').value.replace(/[.\s%]/g, '').replace(',', '.')) / 100 : 0;

    if (isNaN(aporteMensal) || isNaN(numPeriodos) || isNaN(taxaJurosAnual) || (considerarInflacao && isNaN(inflacaoAnual))) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    // Cálculo da taxa de juros mensal
    const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;

    // Cálculo do montante final
    let montanteFinal = 0;
    for (let i = 0; i < numPeriodos; i++) {
        montanteFinal = (montanteFinal + aporteMensal) * (1 + taxaJurosMensal);
    }

    const totalAportado = aporteMensal * numPeriodos;
    const totalJuros = montanteFinal - totalAportado;

    // Exibição dos valores iniciais (sem inflação)
    document.getElementById('montanteFinal').value = 'R$ ' + montanteFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('totalAportado').value = 'R$ ' + totalAportado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('totalJuros').value = 'R$ ' + totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Cálculo e exibição da taxa mensal e taxa diária
    const taxaMensalPercentual = taxaJurosMensal * 100;
    document.getElementById('taxaMensal').value = taxaMensalPercentual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' %';

    const taxaJurosDiaria = Math.pow(1 + taxaJurosMensal, 1 / 30) - 1;
    const taxaDiariaPercentual = taxaJurosDiaria * 100;
    document.getElementById('taxaDiaria').value = taxaDiariaPercentual.toLocaleString('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) + ' %';

    // Ajuste pela inflação, se necessário
    if (considerarInflacao && inflacaoAnual > 0) {
        const inflacaoMensal = Math.pow(1 + inflacaoAnual, 1 / 12) - 1;
        let montanteComInflacao = montanteFinal;

        // Aplicar o desconto da inflação sobre o montante final
        for (let i = 0; i < numPeriodos; i++) {
            montanteComInflacao /= (1 + inflacaoMensal);
        }

        const totalInflacao = montanteFinal - montanteComInflacao;

        // Exibir montante ajustado pela inflação e o total da inflação descontada
        document.getElementById('montanteComInflacao').value = 'R$ ' + montanteComInflacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('totalInflacao').value = 'R$ ' + totalInflacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        document.getElementById('montanteComInflacao').value = 'R$ ' + montanteFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('totalInflacao').value = 'R$ 0,00';
    }

    document.getElementById('resultados').style.display = 'block';
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    const btn = document.getElementById('toggleTheme');
    const lampIcon = btn.querySelector('.lamp-icon');

    if (body.classList.contains('dark-mode')) {
        btn.classList.remove('lamp-off');
        btn.classList.add('lamp-on');
        lampIcon.textContent = '💡';
    } else {
        btn.classList.remove('lamp-on');
        btn.classList.add('lamp-off');
        lampIcon.textContent = '🌑';
    }
}
