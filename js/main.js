/*var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tempoJogo = $("#tempo");
var tempoInicial = tempoJogo.text();
var campo = $("#campo-digitacao");
var nome = $("#nome");

campo.on("input", function() {
    var frase = campo.val();
    var nCaracteresDigitados = frase.length;
    $("#caracteres-digitados").text(nCaracteresDigitados);
    $("#palavras-digitadas").text(frase.split(" ").length);
});

var cronometro;

campo.on("focus", function() {
    //Impedir que jogo inicie sem o jogador informar o nome
    if (nome.val().length == 0) {
        alert("Digite o nome do jogador!");
        $("#nome").focus();
        return;
    }
    cronometro = setInterval(function() {
        var tempoRestante = tempoJogo.text();
        if (tempoRestante <= 0) {
            campo.attr("disabled", true);
            clearInterval(cronometro);
            var nome = $("#nome").val();
            var palavrasDigitadas = $("#palavras-digitadas").text();
            var pontuacao = palavrasDigitadas/tempoInicial * 60;
            $("#tabela-resultado").append("<tr><td class='w3-center'>"+nome+"</td><td class='w3-center'>"+pontuacao+"</td></tr>");
        } else {
            tempoRestante--;
            tempoJogo.text(tempoRestante);
        }
    }, 1000);
});

$("#botao-reiniciar").on("click", function() {
    clearInterval(cronometro);
    campo.attr("disabled", false);
    campo.val("");
    nome.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoInicial)
    nome.focus();
})*/

/*
JS puro*/

const frases = [
    'Eu acredito que às vezes são as pessoas que ninguém espera nada que fazem as coisas que ninguém consegue imaginar.',
    'Nós só podemos ver um pouco do futuro, mas o suficiente para perceber que há muito a fazer.',
    'As máquinas me surpreendem muito frequentemente.',
    'Os computadores são inúteis. Eles só podem dar respostas.',
    'Para fazer um procedimento recursivo é preciso ter fé.',
    'Todos neste país deveriam aprender a programar um computador, pois isto ensina a pensar.',
    'Para entender recursão, devemos primeiro compreender uma recursão.',
    'Primeiro resolva o problema. Depois escreva o código',
    'Eu preciso de uma boa nota em Web 2',
    'Falar é fácil, me mostre o código.'
];


var frase = document.getElementById("frase").innerText;
var numPalavras = frase.split(" ").length;
var tamanhoFrase = document.getElementById("tamanho-frase").innerText = numPalavras;
var campo = document.getElementById("campo-digitacao");
var tempoJogo = document.getElementById("tempo");
var tempoInicial = tempoJogo.innerText;
var reiniciarBtn = document.getElementById("botao-reiniciar");
var cronometro;

campo.addEventListener("input", function(event) {
    let textoUser = campo.value;
    let nCaracteresDigitados = textoUser.length;
    let caracteresDigitados = document.getElementById("caracteres-digitados");
    caracteresDigitados.innerText = nCaracteresDigitados;

    document.getElementById("palavras-digitadas").innerText = textoUser.split(" ").length;
});


campo.addEventListener("focus", function() {
    //Impedir que jogo inicie sem o jogador informar o nome
    if (nome.value.length == 0) {
        alert("Digite o nome do jogador!");
        nome.focus();
        return;
    }
    cronometro = setInterval(function() {
        let tempoRestante = tempoJogo.innerText;
        if (tempoRestante <= 0) {
            campo.setAttribute("disabled", true);
            clearInterval(cronometro);
            console.log(calculaScore(frase, campo.value));
            let pontuacao = calculaScore(frase, campo.value);
            let nome = document.getElementById("nome").value;
            let palavrasDigitadas = document.getElementById("palavras-digitadas").innerText;
            // let pontuacao = palavrasDigitadas/tempoInicial * 60;
            let tabela = document.getElementById("tabela-resultado");
            let tr = document.createElement("tr");
            let td_user = document.createElement("td");
            let td_score = document.createElement("td");
            td_user.className = "w3-center";
            td_score.className = "w3-center";

            td_user.appendChild(document.createTextNode(nome));
            tr.appendChild(td_user);
            td_score.appendChild(document.createTextNode(pontuacao));
            tr.appendChild(td_score);
            tabela.appendChild(tr);
        } else {
            tempoRestante--;
            tempoJogo.innerHTML = tempoRestante;
        }
    }, 1000);
}, {once: false});

reiniciarBtn.addEventListener("click", function() {
    clearInterval(cronometro);
    campo.removeAttribute("disabled");
    campo.value = "";
    document.getElementById("nome").value = "";
    document.getElementById("caracteres-digitados").innerText = "0";
    document.getElementById("palavras-digitadas").innerText = "0";
    document.getElementById("tempo").innerText = tempoInicial;
    nome.focus();
});

function calculaScore(frase, inputUsuario) {
    let score = {
        "acertos": 0,
        "erros": 0
    };

    let fraseArray = frase.split(' ');
    let inputUsuarioArray = inputUsuario.split(' ');

    for (let i = 0; i < fraseArray.length; i++) {
        if (fraseArray[i] == inputUsuarioArray[i]) {
            score.acertos++;
        } else {
            score.erros++;
        }
    }

    return `${score.acertos} / ${score.erros}`;
}
