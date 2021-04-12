sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Label",
    "sap/m/Text",
    "sap/ui/core/Icon",
    "sap/ui/core/ValueState",
], function (Control, Label, Text, Icon, ValueState) {
        return Control.extend("kellojo.m.Divider", {
            metadata: {
                properties: {
                    text: { type: "string" },
                    src: {type: "string" },
                    useText: {type: "boolean" },
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

                if (oControl.getUseText()) {
                    oRm.renderControl(new Text({
                        text: oControl.getText(),
                    }));
                } else {
                    oRm.renderControl(new Label({
                        text: oControl.getText(),
                    }));
                }


                oRm.write("</div>");
            }
        });
    }
);
