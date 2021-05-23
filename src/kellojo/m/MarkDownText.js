sap.ui.define([
    "sap/ui/core/Control",
    "./thirdparty/markdown-it.min"
], function (Control) {
    return Control.extend("kellojo.m.MarkDownText", {
        metadata: {
            properties: {
                text: {
                    type: "string",
                    defaultValue: ""
                }
            }
        },

        init: function() {
            Control.prototype.init.apply(this, arguments);
            this.m_oMarkDownIt = new markdownit();
        },

        renderer: function (oRm, oControl) {

            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addClass("kellojoMMarkDownText");
            oRm.writeClasses(oControl);
            oRm.write(">");

            oRm.write(oControl.m_oMarkDownIt.render(oControl.getText()));

            oRm.write("</div >");
        }
    });
}
);
