/**
 * Created by stepanjuk on 10.12.13.
 */
define (['text!../templates/employe.html','../Confirm','../innerContainer'], function(templ,Confirm, storage){

    function transit(data,Person){
        Confirm.init(data,Person);
    }
var Person = function(idPerson) {
    var self = this;
    function  onAjaxSuccess(data){

        var idFix = Math.random().toString(36).slice(3,9);
        data.id = id;
        if(parentProject) self.parentProject = parentProject;
        if(forPhoto) self.forPhoto = forPhoto;
        if(projectID) self.projectID = projectID;
        self.idFix = idFix;
        self.domNode= "#"+idFix;
        self.name = data['name'];
        self.surname = data['surname'];
        self.id =data['id'];
        self.photo = data['photo'];
        self.position = data['position'];
        self.currentStatus = data['currentStatus'];
        self.projectList = data['projectList'];
        self.statusList = data['statusList'];
        self.history = data['history'];
        self.searchName = self.name + ' ' + self.surname;

//        console.log(self)
        self.render();
        storage.addObj(self)
    }

    var id = idPerson['id'];
    var projectID = idPerson['projectID'];
    var parentProject =idPerson['parentNode'];// конфликт имен с drag-&-drop
    var forPhoto =idPerson['forPhoto'];

    $.ajax({url: "/user", data:{ id: id}, async: false, success: onAjaxSuccess});
//    return self
    };
    Person.template = templ;
    Person.prototype  = {
        render: function(){
            if(!this.parentProject){this.parentProject = "#inner-board";}

            var divWindow =document.createElement("div");
            $(this.parentProject).append(divWindow);
            $(this.parentProject).append(divWindow);
            divWindow.className = "employeeWindow drag";
            divWindow.id = this.idFix;
            $(divWindow).append(Person.template);
            var self = this;
            $(Person.template).ready(function(){
                $(self.domNode).attr("data-id", self.id);
                $(self.domNode).attr("data-parentProject", self.parentProject);
                if(!self.forPhoto)$(self.domNode).find(".employee-header").append('<button type="button" class="close" data-toggle="tooltip" title="remove from project" aria-hidden="true" >&times;</button>');
                $(self.domNode).find(".united .name").html(self.name+'<br/>'+self.surname);
                $(self.domNode).find(".emplPosition").html(self.position);
                $(self.domNode).find(".united img").attr("src", self.photo);
                if(!self.forPhoto)  self.setHandler();

            });

        },
        setHandler: function(){
            var self =this;
            $(this.domNode).find("button").on('click', function(event){
                if(self.projectID){
                    transit({
                        domNode:self.domNode,
                        id: self.id,
                        lastProject: self.projectID
                    },Person);
                }
                $(self.domNode).remove();
                storage.dropObj(self)
            });

            jQuery(function(S){

                var $div = $('#inner-board');
                $(self.domNode)
                    .drag("start",function( ev, dd ){
                        dd.limit = $div.offset();
                        dd.limit.bottom = dd.limit.top + $div.outerHeight() - $( this ).outerHeight();
                        dd.limit.right = dd.limit.left + $div.outerWidth() - $( this ).outerWidth();

                        return $( this ).clone()
                            .css("opacity", .75 )
                            .appendTo( this.parentNode );
                    })

                    .drag("init", function(ev, dd){
//                        dd.drop=$(".drop");
                    })
                    .drag(function( ev, dd ){
                        $('.drop').css({
                            boxShadow : "0 3px 7px rgba(0, 128, 0, 0.3)"
                        });
                        $(dd.proxy).css({
                            position: 'fixed',
                            top: Math.min( dd.limit.bottom, Math.max( dd.limit.top, dd.offsetY ) ),
                            left: Math.min( dd.limit.right, Math.max( dd.limit.left, dd.offsetX ) )
                        })
                    })
                    .drag("end",function( ev, dd ){
                        $( dd.proxy ).remove();
                        $('.drop').css({
                            border: "1px solid",
                            borderColor: "auto"
                        })
                    });
                var count = 0;
                $('.drop')

                    .drop('end', function (ev,dd){
                        var parentProject = $(dd.proxy).attr("data-parentProject")
//                        console.log('proxy parentProject'+parentProject)
                        $( dd.proxy ).remove();

                        $('.drop').css({
//                            border: "1px solid",
//                            borderColor: "auto"
                            boxShadow : "0 3px 7px rgba(0, 0, 0, 0.3)"
                        })
                       count++;
                        console.log (count)
                       transit({
                            domNode:dd.drag,
                            id: $(dd.drag).attr("data-id"),
                            lastProject: parentProject,
                            currentProject: dd.target.id
                        },Person);
                        $(dd.drag).remove();
                    })
            });
        }
    };

   return Person;

});