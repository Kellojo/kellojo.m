sap.ui.define([
    "sap/ui/core/Control",
    "kellojo/m/library",
], function (Control, library) {
    return Control.extend("kellojo.m.Tag", {
        metadata: {
            properties: {
                text: {
                    type: "string",
                    defaultValue: ""
                },
                spacingLeft: {
                    type: "boolean",
                    defaultValue: false
                },
                color: {
                    type: "kellojo.m.Color",
                    defaultValue: library.Color.BudgetP
                }
            }
        },

        renderer: function (oRm, oControl) {

            oRm.write("<div");
            oRm.writeControlData(oControl);

            if (oControl.getSpacingLeft()) {
                oRm.addClass("kellojoMTag-flg-left");
            }

            oRm.addClass("kellojoMTag-color-" + oControl.getColor());

            oRm.addClass("kellojoMTag");
            oRm.writeClasses(oControl);
            oRm.write(">");
            oRm.writeEscaped(oControl.getText());
            oRm.write("</div>");
        }
    });
}
);
