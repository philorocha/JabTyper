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
var campo = document.getElementById("campo-digitacao");
var tempoJogo = document.getElementById("tempo");
var tempoInicial = tempoJogo.innerText;
var reiniciarBtn = document.getElementById("botao-reiniciar");
var cronometro;

campo.addEventListener("input", function(event) {
    let frase = campo.value;
    let nCaracteresDigitados = frase.length;
    let caracteresDigitados = document.getElementById("caracteres-digitados");
    caracteresDigitados.innerText = nCaracteresDigitados;

    document.getElementById("palavras-digitadas").innerText = frase.split(" ").length;
});


campo.addEventListener("focus", function() {
    //Impedir que jogo inicie sem o jogador informar o nome
    if (nome.value.length == 0) {
        alert("Digite o nome do jogador!");
        nome.focus();
        return;
    }
    cronometro = setInterval(function() {
        let tempoRestante = tempoJogo.innerHTML;
        if (tempoRestante <= 0) {
            campo.setAttribute("disabled", true);
            clearInterval(cronometro);
            let nome = document.getElementById("nome").value;
            let palavrasDigitadas = document.getElementById("palavras-digitadas").innerText;
            let pontuacao = palavrasDigitadas/tempoInicial * 60;
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