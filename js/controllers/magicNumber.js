// Máscara de entrada para o aporte mensal
IMask(document.getElementById('preco'), {
    mask: 'R$ num',
    blocks: {
        num: {
            mask: Number,
            thousandsSeparator: '.',
            radix: ','
        }
    }
});
// Máscara de entrada para o aporte mensal
IMask(document.getElementById('dividendo'), {
    mask: 'R$ num',
    blocks: {
        num: {
            mask: Number,
            thousandsSeparator: '.',
            radix: ','
        }
    }
});

// Adiciona um ouvinte de evento para o formulário
document.getElementById('magicNumberForm').addEventListener('keypress', function (event) {
    // Verifica se a tecla pressionada é 'Enter'
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão de enviar o formulário
        calculoMagicNumber(); // Chama a função de cálculo
    }
});


function calculoMagicNumber() {
    const preco = parseFloat(document.getElementById('preco').value.replace(/[R$\s.]/g, '').replace(',', '.'));
    const dividendo = parseFloat(document.getElementById('dividendo').value.replace(/[R$\s.]/g, '').replace(',', '.'));

    if (isNaN(preco) || isNaN(dividendo)) {
        //alert('Preencha todos os campos corretamente.');
        $('#modalAviso').modal('show')
        return;
    }

    const numCotas = preco / dividendo;
    const investimentoTotal = numCotas * preco;
    const rendaMensal = numCotas*dividendo;
    const dy = (dividendo/preco)*100;

    document.getElementById('numCotas').innerHTML = 'Número de Cotas Necessárias: <b>' + parseInt(numCotas) + '</b> cotas.'
    document.getElementById('investimentoTotal').innerHTML = 'Investimento Necessário: <b>R$ ' + investimentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })+'</b>.';
    document.getElementById('rendaMensal').innerHTML = 'Ganho mensal: <b>R$ ' + rendaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })+'</b>.';
    document.getElementById('dy').innerHTML = 'Dividend Yield (mensal): <b>' + dy.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' %</b>.';


    document.getElementById('resultado').style.display = 'block';

}

document.addEventListener("DOMContentLoaded", function () {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
        });
});