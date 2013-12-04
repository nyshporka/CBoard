var dbModels = require('./dbShemas');

var respondJSON = function(res, data) {
    res.writeHeader(200,{
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify(data))
}


exports.getPerson = function(req, res){
    dbModels.Person.findOne({_id: req.body.id}, function(err, pers) {
        respondJSON(res, pers)
    })
}

exports.getPersons = function(req, res){
    dbModels.Person.find(function(err, persons) {
        respondJSON(res, persons)
    })
}

exports.getProject = function(req, res){
    dbModels.Project.findOne({_id: req.body.id}, function(err, proj) {
        respondJSON(res, proj)
    })
}

exports.getProjects = function(req, res){
    dbModels.Project.find(function(err, projects) {
        respondJSON(res, projects)
    })
}


