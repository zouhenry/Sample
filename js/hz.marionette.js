window.hz = window.hz || {};
window.hz.Marionette = window.hz.Marionette || {};

hz.ViewController = Marionette.Controller.extend({
    itemView: null,
    view: null,
    getItemViewArgs: function () {
        return _.extend({}, this.options, { controller: this, model: this.model });
    },
    getItemView: function(){
        return Marionette.getOption(this, "itemView");
    },
    initialize: function (options) {
        this.triggerMethod("before:initialize", options);
        this.triggerMethod("initializing", options);
        this.triggerMethod("initialize", options);
    },
    onInitializing: function(options){
        this.collection = this.getCollection();
        this.model = this.collection.length > 0 ? this.collection.at(0) : this.options.model;
    },
    getCollection: function () {
        return this.collection || Marionette.getOption(this, "collection") || new Backbone.Collection();
    },
    createView: function () {
        var doCreateView = this.triggerMethod("before:create:view");
        if (doCreateView === false) {
            //if onBeforeCreateView returns false, it indicates not to render views
            return null;
        }
        this.triggerMethod("creating:view");
        this.triggerMethod("create:view");
        return this.view;
    },
    onCreatingView: function(){
        var args = this.getItemViewArgs();
        var view = this.getItemView();
        this.view = new view(args);
    },
    close: function() {
        this.triggerMethod("before:close");
        this.triggerMethod("closing");
        this.triggerMethod("close");
    },
    onClosing: function(){
        this.stopListening();
    }
});


hz.SortableCollection = Backbone.Collection.extend({
    lastSortedColumn: "",
    inAscendingSort: true,
    sortColumn: function(attributeName) {
        var compareItem;
        if(this.length > 0) {
            this.setSortColumnAndSortOrder(attributeName);
            if(this.inAscendingSort) {
                this.comparator = function(item) {
                    compareItem = item.get(attributeName);

                    // if string, lowercase first
                    return (typeof(compareItem) === "string") ? compareItem.toLowerCase() : compareItem;
                };
            } else {
                this.comparator = function(item) {
                    compareItem = item.get(attributeName);
                    if(typeof(compareItem) === "string") {
                        // if string, code for reverse sort
                        var str = compareItem;

                        str = str.toLowerCase();
                        str = str.split("");
                        str = _.map(str, function(letter) {
                            return String.fromCharCode(-(letter.charCodeAt(0)));
                        });
                        return str;
                    } else {
                        return -item.get(attributeName);
                    }
                };
            }
        }
        this.sort();
    },
    setSortColumnAndSortOrder: function (attributeName) {
        if (this.lastSortedColumn == attributeName) {
            this.inAscendingSort = !this.inAscendingSort;
        } else {
            this.inAscendingSort = true;
        }
        this.lastSortedColumn = attributeName;
    }
});