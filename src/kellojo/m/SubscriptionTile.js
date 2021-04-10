sap.ui.define([
    "sap/ui/core/Control",
    "kellojo/m/library",
], function (Control, library) {
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



        renderer: function (oRm, oControl) {

            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addClass("kellojoMSubscriptionTile-color-" + oControl.getColor());
            oRm.addClass("kellojoMSubscriptionTile");
            oRm.writeClasses(oControl);
            oRm.write(">");

            oRm.write("<div class='kellojoMSubscriptionTile-name'>");
            oRm.writeEscaped(oControl.getName());
            oRm.write("</div>");

            oRm.write("<div class='kellojoMSubscriptionTile-price'>");
            oRm.writeEscaped(oControl.getPrice());
            oRm.write("</div>");


            oRm.write("<div class='kellojoMSubscriptionTile-content'>");
            oControl.getContent().forEach(oRm.renderControl);
            oRm.write("</div>");


            oRm.write("<div class='kellojoMSubscriptionTile-submitButton'>");
            oRm.renderControl(oControl.getSubmitButton());
            oRm.write("</div>");

            oRm.write("</div>");
        }
    });
}
);
