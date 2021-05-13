sap.ui.define([
    "kellojo/m/AnimatedCard",
    "kellojo/m/library",
    "./SubscriptionTileRenderer"
], function (Control, library, SubscriptionTileRenderer) {
    return Control.extend("kellojo.m.SubscriptionTile", {
        metadata: {
            properties: {
                name: {type: "string"},
                price: {type: "string"},
                color: {
                    type: "kellojo.m.Color",
                    defaultValue: library.Color.Default
                }
            },
            aggregations: {
                submitButton: {
                    multiple: false,
                    type: "sap.m.Button",
                },
                content: {
                    multiple: true,
                    type: "sap.ui.core.Control",
                },
            }
        },

        renderer: SubscriptionTileRenderer,

        init: function() {
            Control.prototype.init.apply(this, arguments);
            this.addStyleClass("kellojoMSubscriptionTile");
        }
    });
}
);
