CustomResolver = Ember.DefaultResolver.extend({
    resolveTemplate: function(parsedName) {
        var resolvedTemplate = this._super(parsedName);
        if (resolvedTemplate) {
            return resolvedTemplate;
        }
        Ember.debug("Template not found, searching folders for './" + parsedName.name + ".hbs'.");
        jQuery.ajax({
            url: "./" + parsedName.name + ".hbs",
            contentType: "text/x-handlebars; charset=utf-8",
            dataType: "text",
            success: function(result) {
                if (result.isOk == false)
                    Ember.warn("Failed to get template.");
                else
                    Ember.TEMPLATES[parsedName.name] = Ember.Handlebars.compile(result);
            },
            async: false
        });
        resolvedTemplate = this._super(parsedName);
        if (resolvedTemplate) {
            Ember.debug("Found file template, everything ok.");
            return resolvedTemplate;
        }
        Ember.warn("Template not found: " + parsedName.name);
        return Ember.TEMPLATES['not_found'];
    }
})