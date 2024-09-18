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

            if (isNaN(aporteMensal) || isNaN(numPeriodos) || isNaN(taxaJurosAnual)) {
                alert('Preencha todos os campos corretamente.');
                return;
            }

            const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;

            let montanteFinal = 0;
            for (let i = 0; i < numPeriodos; i++) {
                montanteFinal = (montanteFinal + aporteMensal) * (1 + taxaJurosMensal);
            }

            const totalAportado = aporteMensal * numPeriodos;
            const totalJuros = montanteFinal - totalAportado;

            document.getElementById('montanteFinal').value = 'R$ ' + montanteFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            document.getElementById('totalAportado').value = 'R$ ' + totalAportado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            document.getElementById('totalJuros').value = 'R$ ' + totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            const taxaMensalPercentual = taxaJurosMensal * 100;
            document.getElementById('taxaMensal').value = taxaMensalPercentual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' %';

            document.getElementById('resultados').style.display = 'block';

            // Limpa o formulário após o cálculo
            document.getElementById('financeForm').reset();

            // Limpa o campo de anos
            document.getElementById('anosInvestidos').value = '';
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