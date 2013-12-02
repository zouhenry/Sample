/**
 * Created by henry on 11/28/13.
 */
hz.app.module("Grid", function (Grid, app) {
    Grid.ItemView= Marionette.CompositeView.extend({
        template: "#template_grid_row",
        tagName: "tr"
    });

    Grid.CompositeView = Marionette.CompositeView.extend({
        template: "#template_grid",
        itemView: Grid.ItemView,
        itemViewContainer: "[data-id=items]",
        ui:{
            txtFirstName: "[data-id=txtFirstName]",
            txtLastName: "[data-id=txtLastName]",
            txtEmail: "[data-id=txtEmail]"
        },
        events:{
            "click [data-id=btnAdd]": "addItem",
            "click th>a": function(event) {
                var attr = $(event.currentTarget).data("property");
                this.collection.sortColumn(attr);
                this.collection.trigger("reset");
            }
        },
        addItem: function(event){
            //need to escape string
            var newItem = {
                Id: this.collection.length + 1,
                FirstName: this.ui.txtFirstName.val(),
                LastName: this.ui.txtLastName.val(),
                Email: this.ui.txtEmail.val()
            };
            this.collection.add(newItem);
        }
    });

    Grid.ContainerController = hz.ViewController.extend({
        itemView: Grid.CompositeView
    });
})