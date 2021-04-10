sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Label",
    "sap/ui/core/Icon",
    "sap/ui/core/ValueState",
], function (Control, Label, Icon, ValueState) {
        return Control.extend("kellojo.m.Divider", {
            metadata: {
                properties: {
                    text: { type: "string" },
                    src: {type: "string" },
                    iconValueState: { type: "sap.ui.core.ValueState", defaultValue: ValueState.None },
                }
            },

            renderer: function (oRm, oControl) {

                oRm.write("<div");
                oRm.writeControlData(oControl);
                oRm.addClass("kellojoMLabel");
                oRm.writeClasses(oControl);
                oRm.write(">");

                if (!!oControl.getSrc()) {
                    oRm.renderControl(new Icon({
                        src: oControl.getSrc(),
                    }).addStyleClass("kellojoMLabel-flg-" + oControl.getIconValueState()));
                }

                oRm.renderControl(new Label({
                    text: oControl.getText(),
                }));

                oRm.write("</div>");
            }
        });
    }
);
