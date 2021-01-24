sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/Core",
    "sap/ui/core/Icon",
], function (Control, Core, Icon) {
    return Control.extend("kellojo.m.InstallationHint", {
        metadata: {
            properties: {
                text: {
                    type: "string",
                    defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("installationHintText"),
                }
            },

            aggregations: {
                _icon: {
                    hidden: true,
                    type: "sap.ui.core.Icon",
                    multiple: false
                },
            }

        },

        init: function() {
            Control.prototype.init.apply(this, arguments);

            this.set_icon(new Icon({
                src: "sap-icon://arrow-bottom",
            }).addStyleClass("kellojoMInstallationHint-icon"));
        },

        renderer: function (oRm, oControl) {

            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addClass("kellojoMInstallationHint");
            oRm.writeClasses(oControl);
            oRm.write(">");

            oRm.write("<span class='sapThemeText'>");
            oRm.writeEscaped(oControl.getText());
            oRm.write("</span>");

            oRm.renderControl(oControl.get_icon());

            oRm.write("</div >");
        }
    });
}
);
