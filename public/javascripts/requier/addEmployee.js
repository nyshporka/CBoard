/**
 * Created by stepanjuk on 29.11.13.
 */

require([/*'stepa','Accordion',*/'text!./templates/addEmployee.html'], function(templ){


    var template = templ;

    $("#buttonAddNewPeople").click(function(event){

    $(template).appendTo($("#inner-board"));

    $('#modalAddPeople form').submit(function(){ //listen for submit event

                var formData = new FormData($(this)[0]);

                $.ajax({
                    url: '/user',
                    type: 'POST',
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (returndata) {
                        onAjaxSuccess(returndata);
                        console.log(returndata)
                    }
                });

                return false;

    });

    $("#modalAddPeople .close").on('click', function(){
                $("#modalAddPeople").remove();
    });

    function onAjaxSuccess(data){// по приходу колбэка после сохранения нового сотрудника

                $("#modalAddPeople :input").val("");

             }

    });

});

