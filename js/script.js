var apiKey = "a65dbb2240a449bd8e7183620242804";

function atualizaDadosCidade(dadosTempoCidade) {
    let cityCard = $("#" + dadosTempoCidade.location.name + "Card");
    cityCard.find(".cityName").text(dadosTempoCidade.location.name);
    cityCard.find(".temp").html(dadosTempoCidade.current.temp_c + "&deg;");
    cityCard.find(".condition").html('<span>Clima</span><span>' + dadosTempoCidade.current.condition.text + '</span>');
    cityCard.find(".sensacao").html("<span>Sensação Térmica</span><span>" + dadosTempoCidade.current.feelslike_c + "</span>");
}

function populaPagina() {
    $(".cityName").each(function() {
        let nomeCidade = $(this).text();
        $.ajax({
            url: "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + nomeCidade + "&aqi=no&lang=pt",
            success: atualizaDadosCidade
        });
    });
}

$(document).ready(function() {
    populaPagina();
    
    $("#btnAddCity").click(function() {
        let novaCidade = $("#txtCidade").val().trim();
        if (novaCidade) {
            let novoCard = `
                <div class="col-md-4">
                    <div class="card wheaterCard" id="${novaCidade}Card">
                        <div class="card-header">
                            <h2 class="h5 mb-0 text-center">
                                Tempo agora em<br>
                                <span class="cityName fst-italic">${novaCidade}</span>
                            </h2>
                        </div>
                        <div class="card-body cityData">
                            <p class="temp display-4 text-center">--&deg;</p>
                            <p class="itemsCD condition d-flex justify-content-between"><span>Clima</span><span>--</span></p>
                            <p class="itemsCD sensacao d-flex justify-content-between"><span>Sensação Térmica</span><span>--</span></p>
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