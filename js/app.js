///////////////////////////////////////////////////////////
// Creates a new application


window.hz.app = window.hz.app|| new Marionette.Application();

$(function() {

    //////////////////////////////////////////////////////
    //Definition the controller
    hz.app.controller = Marionette.Controller.extend({
        loadLandingPage: function() {
            var landingPageView = new Marionette.ItemView({template: "#template_landing_page"});
            hz.app.contentRegion.show(landingPageView);
        },
        loadGrid: function() {
            var gridData = this.getGridData();
            this.gridCollection = new hz.SortableCollection(gridData);
            hz.app.gridController = new hz.app.Grid.ContainerController({collection: this.gridCollection});
            hz.app.contentRegion.show(hz.app.gridController.createView());
        },
        getGridData: function() { //dummy data
            var firstNamePool = ["Abraham", "Ben", "Charlie", "David", "Edward", "Frank", "Guy", "Henry", "Jake", "Kelly", "Linda", "Manny", "Nancy", "Odin", "Patricia", "Quinn", "Richard", "Sam", "Tila", "Umika", "Victoria", "William", "Xena", "Yafa", "Zack"];
            var lastNamePool = ["Lincoln", "Smith", "Doe", "Sullivan", "Zou", "Lee", "Franklin", "Katz", "Jones", "Wilson", "Ling", "Gilbert", "Washington", "Hooker", "Bellows", "Richman"];
            var domainPool = ["google.com", "yahoo.com", "microsoft.com", "gmail.com", "hotmail.com", "abc.com", "projectorpsa.com", "hunnewelled.com", "backbone.com", "tweeter.com"];
            var firstNamePoolLength = firstNamePool.length;
            var lastNamePoolLength = lastNamePool.length;
            var domainPoolLenght = domainPool.length;

            var data = [{Id: 1, FirstName: "Henry", LastName: "Zou", Email: "zouhenry@gmail.com"}];
            var total = 1000;
            var index = 2;
            var firstName;
            var lastName;
            var email;

            do {
                firstName = firstNamePool[hz.utils.getRandomInt(0, firstNamePoolLength - 1)];
                lastName = lastNamePool[hz.utils.getRandomInt(0, lastNamePoolLength - 1)];
                email = firstName + lastName + "@" + domainPool[hz.utils.getRandomInt(0, domainPoolLenght - 1)];
                data.push({Id: index, FirstName: firstName, LastName: lastName, Email: email});
                index++;
            } while(index < total);

            return data;
        }
    });
    ////////////////////////////////////////////////////
    // Your application needs to do useful things, like displaying content in your regions, 
    // starting up your routers, and more. To accomplish these tasks and ensure that your Application is fully configured, you can add initializer callbacks to the application.
    hz.app.addInitializer(function (options) {
        new hz.app.route({ controller: new hz.app.controller() });
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    ////////////////////////////////////////////////////
    // Defining page regions to be accessed directly via "MyApp.[region_name]"
    hz.app.addRegions({
        contentRegion: "#content"
    });

    //////////////////////////////////////////////////////
    // Defining the routes
    hz.app.route = Marionette.AppRouter.extend({
        appRoutes: {
            //"": "loadLandingPage",
            "": "loadLandingPage",
            "grid": "loadGrid"
        }
    });


    //////////////////////////////////////////////////////
    //Kicks off the application
    hz.app.start();
});
