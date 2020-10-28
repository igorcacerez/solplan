$(document).ready(function () {


    getEstados();
    
    
    $('#simulador_estado').on("change",function(){
		
        var uf_id = $('#simulador_estado option:selected').val();
      
        getCidades(uf_id);
    });
    



    $('#form_simulador').on("submit",function(event){


        event.preventDefault();


        $('#modal_simulador_outros_dados').modal('show')

    })
});