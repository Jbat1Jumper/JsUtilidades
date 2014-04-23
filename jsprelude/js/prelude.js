function PreludeObject() {
    this.type = ["NewObject"];
}
function CreateClass(clas, name)
{
    clas.className = name;
    clas.attr = {};
    clas.private = {};
    clas.public = {};
    clas.parents = [];
    clas.constructor = function (obj, args) {};
}
function create(clas, args) {
    var obj = new PreludeObject();
    clas.parents.forEach(function(parent) {
        _fill_from_class(parent, obj);
    });
    _fill_from_class(clas, obj);
    clas.constructor(obj, args);
    return obj;
}
function _fill_from_class(clas, obj) {
    obj.type.push(clas.className);
    for (var at in clas.attr) {
        obj[at] = clas.attr[at];
    }
    // TODO: privatize private methods
    for (var f in clas.private) {
        obj[f] = clas.private[f];
    }
    for (var f in clas.public) {
        obj[f] = clas.public[f];
    }
}
function is(type, obj){
    if ( type.className !== undefined )
        type = type.className;
    clas = obj.type[obj.type.length-1]
    return obj !== undefined && obj !== null && clas === type;
}
function isinstance(type, obj){
    if ( type.className !== undefined )
        type = type.className;
    return obj.type.indexOf(type) !== -1;
}
function isfunction(foo) {
    // HACK: its not right but works in 99% of cases
    return (foo.toString().indexOf('function ') !== -1);
}
function get_function_name(foo) {
    var ret = foo.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}

// Example of use
TemplateClass = new function(){
    CreateClass(this, "TemplateClass");
    this.parents = [];
    
    this.attr.templateAttr = 42;
    
    this.constructor = function(obj, args){
    }
    
    this.private.templatePrivFunc = function (){
    }
    
    this.public.templateFunc = function () {
    }
}

