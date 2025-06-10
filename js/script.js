var apiKey = "a65dbb2240a449bd8e7183620242804";

function atualizaDadosCidade(dadosTempoCidade) {
    let cityCard = $("#" + dadosTempoCidade.location.name + "Card");
    cityCard.find(".nomeCidade").text(dadosTempoCidade.location.name);
    cityCard.find(".tempo").html(dadosTempoCidade.current.temp_c + "&deg;");
    cityCard.find(".condicao").html('<span>Clima:</span><span>' + dadosTempoCidade.current.condition.text + '</span>');
    cityCard.find(".sensacao").html("<span>Sensação Térmica:</span><span>" + dadosTempoCidade.current.feelslike_c + "</span>");
}

function populaPagina() {
    $(".nomeCidade").each(function() {
        let nomeCidade = $(this).text();
        $.ajax({
            url: "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + nomeCidade + "&aqi=no&lang=pt",
            success: atualizaDadosCidade
        });
    });
}

$(document).ready(function() {
    populaPagina();
    
    $("#btnAdicionarCidade").click(function() {
        let novaCidade = $("#txtCidade").val().trim();
        if (novaCidade) {
            let novoCard = `
                <div class="col-md-4">
                    <div id="${novaCidade}Card" class="card wheaterCard">
                        <div class="card-header">
                            <h2 class="h5 mb-0 text-center">
                                Tempo agora em<br>
                                <span class="nomeCidade fst-italic">${novaCidade}</span>
                            </h2>
                        </div>
                        <div class="card-body dadosCidade">
                            <p class="tempo display-4 text-center">--&deg;</p>
                            <p class="itemsCD condicao d-flex justify-content-evenly"><span>Clima</span><span>--</span></p>
                            <p class="itemsCD sensacao d-flex justify-content-evenly"><span>Sensação Térmica</span><span>--</span></p>
                        </div>
                    </div>
                </div>`;
            $(".row").append(novoCard);
            
            $.ajax({
                url: "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + novaCidade + "&aqi=no&lang=pt",
                success: atualizaDadosCidade
            });
            
            $("#txtCidade").val("");
        }
    });
});