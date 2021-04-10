sap.ui.define([
    "sap/ui/core/Control",
    "kellojo/m/library",
], function (Control, library) {
    return Control.extend("kellojo.m.SubscriptionContainer", {
        metadata: {
            properties: {

            },
            aggregations: {
                content: {
                    multiple: true,
                    type: "sap.ui.core.Control",
                },
            },

            defaultAggregation: "content",
        },



        renderer: function (oRm, oControl) {

            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addClass("kellojoMSubscriptionContainer");
            oRm.writeClasses(oControl);
            oRm.write(">");

            oControl.getContent().forEach(oRm.renderControl);

            oRm.write("</div>");
        }
    });
}
);
