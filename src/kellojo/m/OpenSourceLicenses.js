sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {
        return Control.extend("kellojo.m.OpenSourceLicenses", {
        metadata: {
            properties: {
                licenses: { type: "object", defaultValue: null },
            },
        },

        init: function () {

        },

        renderer: function (oRm, oControl) {

            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addClass("kellojoMOpenSourceLicenses");
            oRm.writeClasses(oControl);
            oRm.write(">");

            let oLicenses = oControl.getLicenses();
            if (!!oLicenses) {
                const aLicenses = Object.keys(oLicenses);
                aLicenses.forEach((sLicense) => {

                    oRm.write("<div class='kellojoMOpenSourceLicenses-licenseContainer'>");

                    oRm.write("<div class='kellojoMOpenSourceLicenses-licenseTitle'>");
                    oRm.writeEscaped(sLicense);
                    oRm.write("</div>");

                    oRm.write("<div>");
                    oRm.writeEscaped(oLicenses[sLicense].fullLicenseText);
                    oRm.write("</div>");


                    oRm.write("</div>");

                });
            }

            oRm.write("</div>");
        }
    });
}
);