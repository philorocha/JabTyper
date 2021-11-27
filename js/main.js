var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tempoJogo = $("#tempo");
var tempoInicial = tempoJogo.text();

/*var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);*/

//contando caracteres
var campo = $("#campo-digitacao");

campo.on("input", function() {
    var frase = campo.val();
    var nCaracteresDigitados = frase.length;
    $("#caracteres-digitados").text(nCaracteresDigitados);

    $("#palavras-digitadas").text(frase.split(" ").length);
});

var cronometro;

campo.on("focus", function() {
    cronometro = setInterval(function() {
        var tempoRestante = tempoJogo.text();
        if (tempoRestante <= 0) {
            campo.attr("disabled", true);
            clearInterval(cronometro);
            var nome = $("#nome").val();
            var palavrasDigitadas = $("#palavras-digitadas").text();
            var pontuacao = palavrasDigitadas/tempoInicial * 60;
            $("#tabela-resultado").append("<tr><td>"+nome+"</td><td>"+pontuacao+"</td></tr>");
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
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoInicial)
})

/*
JS puro
var campo = document.getElementById("campo-digitacao");
campo.addEventListener("input", function(event) {
    let frase = campo.value;
    let nCaracteresDigitados = frase.length;
    let caracteresDigitados = document.getElementById("caracteres-digitados");
    caracteresDigitados.innerText = nCaracteresDigitados;

    document.getElementById("palavras-digitadas").innerText = frase.split(" ").length;
});

var tempoJogo = document.getElementById("tempo");
campo.addEventListener("focus", function() {
    setInterval(function() {
        let tempoRestante = tempoJogo.innerHTML;
        if (tempoRestante <= 0) {
            campo.setAttribute("disabled", true);
        } else {
            tempoRestante--;
            tempoJogo.innerHTML = tempoRestante;
        }
    }, 1000);
}, {once: true});*/