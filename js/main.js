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

/* JS puro */

var frase;
var numPalavras;
var tamanhoFrase;

function fraseGenerator() {
    axios.get('https://type.fit/api/quotes')
        .then((res) => {
            frase = document.getElementById("frase").innerText = res.data[Math.floor(Math.random() * 1643)].text;
            numPalavras = frase.split(" ").length;
            tamanhoFrase = document.getElementById("tamanho-frase").innerText = numPalavras;
            //console.log(res.data[Math.floor(Math.random() * 1643)].text);
    });
}

window.onload = fraseGenerator();

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
    fraseGenerator();
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
    console.log(fraseArray);
    console.log(inputUsuarioArray);

    for (let i = 0; i < fraseArray.length; i++) {
        if (fraseArray[i] == inputUsuarioArray[i]) {
            score.acertos++;
        } else {
            score.erros++;
        }
    }

    return `${score.acertos} / ${score.erros}`;
}
