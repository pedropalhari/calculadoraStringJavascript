function inputEquation(texto) {
    texto = '(' + texto + ')';
    for (var i = 0; i < texto.length; i++)
        texto = texto.replace(' ', '');

    //Indexa todos os parenteses
    var abreParenteses = [];
    var fechaParenteses = [];

    var index = texto.indexOf('(');
    while (index != -1) {
        abreParenteses.push(index);
        index = texto.indexOf('(', index + 1);
    }

    index = texto.indexOf(')');
    while (index != -1) {
        fechaParenteses.push(index);
        index = texto.indexOf(')', index + 1);
    }

    while (abreParenteses.length > 0) {
        let ini = abreParenteses.pop();
        let fim = fechaParenteses.shift();
        let resultado = solve(texto.slice(ini + 1, fim));

        texto = texto.slice(0, ini) + resultado + texto.slice(fim + 1);
    }

    return texto;
}

function solve(eq) {
    //Mapeia todos os números e as operações entre eles
    eq += ' '; //Para eu não ter que fazer o 'achamento' de numeros com coisa undefined

    let comecoNumero = false;
    let comeco;
    let fim;
    let numeros = [];
    let operacoes = [];
    for (var i = 0; i < eq.length; i++) {
        //está começando um numero
        if (comecoNumero == false && ((eq[i] >= '0' && eq[i] <= '9') || eq[i] == '.')) {
            comecoNumero = true;
            comeco = i;
        }
        if (comecoNumero == true && !((eq[i] >= '0' && eq[i] <= '9') || eq[i] == '.')) {
            comecoNumero = false;
            fim = i;
            numeros.push(parseFloat(eq.slice(comeco, fim)));
            operacoes.push(eq[i]);
        }
    }

    operacoes.pop(); //Tira aquele ' ' que coloquei no inicio

    //Agora os numeros estão separados em pares e o que está entre eles é a operação
    //Entre o 0 e o 1 a operação 0, entre o 1 e o 2 a operação 1, entre o 2 e o 3 a operação 2...

    //Calcula as potencuas
    for (var i = 0; i < operacoes.length; i++) {
        if (operacoes[i] == '^') {
            let calculo = Math.pow(numeros[i], numeros[i + 1]);

            //console.log(numeros[i], '^', numeros[i+1], calculo);

            /**
             * Sente esse truque insano:
             *  Pega os dois numeros, coloca o resultado no primeiro e remove o segundo
             *  Remove a operação pois ela já foi feita
             *  Segura o i pra ver se a próxima operação é a requerida, se não, vai embora
             *
             *  Fiz a prova matemática depois da experimental HUE
             */
            numeros[i] = calculo;
            numeros.splice(i + 1, 1);
            operacoes.splice(i, 1);
            i--;
        }

        //console.log(numeros, operacoes);
    }

    //Calcula as multiplicações/divisões
    for (var i = 0; i < operacoes.length; i++) {
        if (operacoes[i] == '*') {
            let calculo = numeros[i] * numeros[i + 1];

            //console.log(numeros[i], '*', numeros[i+1], calculo);

            numeros[i] = calculo;
            numeros.splice(i + 1, 1);
            operacoes.splice(i, 1);
            i--;
        }

        if (operacoes[i] == '/') {
            let calculo = numeros[i] / numeros[i + 1];

            //console.log(numeros[i], '/', numeros[i+1], calculo);

            numeros[i] = calculo;
            numeros.splice(i + 1, 1);
            operacoes.splice(i, 1);
            i--;
        }

        //console.log(numeros, operacoes);
    }

    //Calcula as somas/subtrações
    for (var i = 0; i < operacoes.length; i++) {
        if (operacoes[i] == '+') {
            let calculo = numeros[i] + numeros[i + 1];

            //console.log(numeros[i], '+', numeros[i+1], calculo);

            numeros[i] = calculo;
            numeros.splice(i + 1, 1);
            operacoes.splice(i, 1);
            i--;
        }

        if (operacoes[i] == '-') {
            let calculo = numeros[i] - numeros[i + 1];

            //console.log(numeros[i], '-', numeros[i+1], calculo);

            numeros[i] = calculo;
            numeros.splice(i + 1, 1);
            operacoes.splice(i, 1);
            i--;
        }

        //console.log(numeros, operacoes);
    }

    //console.log(numeros, operacoes);

    return numeros[0];
}

module.exports = inputEquation;