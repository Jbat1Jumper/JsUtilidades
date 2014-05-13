App = Ember.Application.create({
    Resolver: CustomResolver
});

App.Router.map(function() {
    this.resource("screen_tab");
    this.resource("bill_acceptor_tab");
    this.resource("printer_tab");
    this.resource("io_tab");
    this.resource("sas_tab");
});

App.Person = Ember.Object.extend({
    init: function() {
        this.set('salutation', "Mr/Ms");
    },

    salutationDidChange: function() {

    }.observes('salutation').on('init')
});

App.ScreenTabController = Ember.Controller.extend({
    pr: App.Person.create(),

    init: function() {
        console.log("INITIALIZEEEENG");
    },
    actions: {
        update: function() {
            console.log("UPDATED");
        }
    }
});

App.RefreshableModel = Ember.Object.extend({
    init: function() {
        console.log("INITIALIZEEEENG REFRESHABLE MODEL");
    },
    updateCount: 0,
    update: function() {
        console.log("STARTING UPDATE");
        var me = this;
        Ember.run.later(function() {
            if (me.isDestroyed)
                return;
            console.log("RUNNING UPDATE NUMBER " + me.updateCount.toString());
            me.set("updateCount", me.updateCount + 1);
        }, 500);
    }.observes("updateCount").on("init")
})


App.ScreenTabRoute = Ember.Route.extend({
    init: function() {
        console.log("INITIALIZEEEENG SCREEEEN ROUTE");
    },
    activate: function() {
        console.log("AAACTIVATIIING SCREEEN TAB");
    },
    deactivate: function() {
        console.log("DEEEEEAAACTIVATIIING SCREEEN TAAAB");
    },
    last_model: null,
    model: function() {
        if (this.last_model != null)
            this.last_model.destroy();
        console.log("CREAAATING SCREEEEN MODEL");

        this.set("last_model", App.RefreshableModel.create());
        return this.get("last_model");
    }
})

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('printer_tab');
    }
});