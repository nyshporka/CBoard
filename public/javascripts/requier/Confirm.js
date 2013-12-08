/**
 * Created by Jura on 08.12.13.
 */

define(['Classes/Person','text!./templates/addRemoveDate.html'], function(Person,templ){
//    console.log(Person)
    var Confirm  = {
        template: templ,
        init: function(data){
            console.log(data)
            Confirm.domNode = data['domNode'];
            Confirm.id = data['id'];
            if(data['lastProject']){
                Confirm.lastProject = data['lastProject'];
            }else{
                Confirm.lastProject = "freeShooter";
            }
            if(data['currentProject']){
                Confirm.currentProject = data['currentProject'];
            }else{
                Confirm.currentProject = "freeShooter";
            }


            Confirm.render();
        },
        render: function(){
            $(Confirm.template).appendTo($("#inner-board"));
            $("#formConfirmDate").ready(function(){
                $(".datepicker").datepicker();
                $("#lastProject").val(Confirm['lastProject']);
                $("#currentProject").val(Confirm['currentProject']);
                $(Confirm.domNode).remove();
                Person.init({
                    id: Confirm['id'],
                    forPhoto: 'true',
                    parentNode: "#windowForPhoto"
                });





            });


        }
    }
        return Confirm;
});