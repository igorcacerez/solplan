$(document).ready(function () {




var PhoneMaskBehavior = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 0.0000-0000' : '(00) 0000-00009';
	},
		spOptions = {
			onKeyPress: function (val, e, field, options) {
				field.mask(PhoneMaskBehavior.apply({}, arguments), options);
			}
		};
    $('.phone').mask(PhoneMaskBehavior, spOptions);
    
    $("#cpf").mask('000.000.000-00');
	$(".pin").mask('000000');
	$(".data").mask('99/99/9999');
	$(".cep").mask('00000-000');
	$(".cpf").mask('000.000.000-00');

	$('.money').maskMoney({
		thousands: '',
		decimal: ',',
		selectAllOnFocus: true,
		allowZero: true
	});


	var owl = $('.owl-carousel2');
	
    owl.owlCarousel({
	
		mouseDrag:false,
		touchDrag:false,
		pullDrag:false,
		freeDrag:false,
        items: 1,
    
	});
	
var owl_main = $('.sl-principal');
owl_main.owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    responsiveClass: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 1,
            nav: false
        },
        1000: {
            items: 1,
            nav: true
        }
    }
});
owl_main.on('mouseleave', function () {
    owl_main.trigger('stop.owl.autoplay'); //this is main line to fix it
    owl_main.trigger('play.owl.autoplay', [owlCarouselTimeout]);
})


var cep_options = {
	clearIfNotMatch: true,
	onComplete: function (cep) {
		$.getJSON("//viacep.com.br/ws/" + $('.cep_with_callback').val().replace(/\D/g, '') + "/json/?callback=?", function (dados) {

			if (!("erro" in dados)) {

				$('.parser_uf').val(dados.uf).change();


				$('.parser_cidade').val(dados.localidade);




				if (dados.uf != "") {
					$('.parser_uf').attr("readonly", "readonly");

				}
				if (dados.localidade != "") {
					$('.parser_cidade').attr("readonly", "readonly");

				}


			} else {
				$('.cep_with_callback').val('');

			}
		});
	},

	onInvalid: function (val, e, f, invalid, options) {
		$('.cep_with_callback').val('');
	}
};

$('.cep_with_callback').mask('00000-000', cep_options);




$('#form_orcamento').on('submit',function(event){

	event.preventDefault();

	var form = $('#form_orcamento');
	var botao = $('.btn-envia-orcamento');


	Swal.fire({
		title: 'Confirmação',
		text: "Confirma o envio da solicitação do orçamento?",
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Não',
		confirmButtonText: 'Sim'
	  }).then((result) => {
		if (result.value) {

			botao.html("Aguarde...").attr('disabled','disabled');

			$.post("/orcamentoController.php", form.serializeArray())
            .done(function (data) {

                var json = $.parseJSON(data);

                if (json.sucesso) {
					Swal.fire({
						
						text: "Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.",
						icon: 'success',
						showCancelButton: false,
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'Ok'
					  }).then((result) => {
						if (result.value) {
						 window.location.replace('/')
						}
					  })

					

                } else {

					botao.html('Enviar Formulário <i class="fas fa-arrow-right"></i> ').removeAttr('disabled');

					Swal.fire({
						title: 'Opps',
						text: json.mensagem,
						icon: 'error',

					});
					



                }




			});
			

	
		}
	  })


	
});



$('#form_contato').on('submit',function(event){

	event.preventDefault();

	var form = $('#form_contato');
	var botao = $('.send-contact-form');
	botao.html("Aguarde...").attr('disabled','disabled');


	$.post("/contatoController.php", form.serializeArray())
	
	.done(function (data) {

		var json = $.parseJSON(data);

		if (json.sucesso) {
			Swal.fire({
				
				text: "Sua solicitação foi enviada com sucesso! Em breve entraremos em contato.",
				icon: 'success',
				showCancelButton: false,
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Ok'
			  }).then((result) => {
				if (result.value) {
				 window.location.replace('/')
				}
			  })

			

		} else {

			botao.html('Enviar <i class="fas fa-arrow-right"></i>').removeAttr('disabled');

			Swal.fire({
				title: 'Opps',
				text: json.mensagem,
				icon: 'error',

			});
			



		}




	});

	
});

$('.profile-item').on('click',function(e){
	e.preventDefault();

var slide=$(this).data('goto');
$('.profile-item').removeClass('active')
$(this).toggleClass('active');

$('.owl-carousel2').trigger('to.owl.carousel',slide)
})

});

function getEstados(){
	
	
	$.getJSON("https://servicodados.ibge.gov.br/api/v1/localidades/estados", function(data) {
		
		var html = '';
		var len = data.length;
		var html = '<option selected="selected" value="">- Selecione -</option>';
		
			for (var i = 0; i < len; i++) {
			  html += '<option value="' + data[i].id + '" data-sigla="'+ data[i].sigla +'"> ' +    data[i].nome + '</option>';
			}
		//console.log(html);	
		$("#simulador_estado").html(html);
		
		
		});
	
}

function getCidades(uf){
	
	
	$.getJSON("https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+uf+"/municipios", function(data) {
		
		var html = '';
		var len = data.length;
		var html = '<option selected="selected" value="">- Selecione -</option>';
		
			for (var i = 0; i < len; i++) {
			  html += '<option value="' + data[i].nome + '">' +    data[i].nome + '</option>';
			}
		//console.log(html);	
		$("#simulador_cidade").html(html);
		
		
		});
	
}


function menu(tipo)
{
	if(tipo === "abre")
	{
		$(".sidebar-menu-mobile").css("left","0px");
		$(".fundo-menu").fadeIn();
	}
	else
	{
		$(".sidebar-menu-mobile").css("left","-100%");
		$(".fundo-menu").fadeOut();
	}
}