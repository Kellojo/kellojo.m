sap.ui.define([
    "sap/ui/core/XMLComposite",
    "kellojo/m/library",
    "sap/ui/core/Core",
    "sap/ui/core/format/DateFormat",
], function (XMLComposite, library, Core, DateFormat) {
    var AppTitle = XMLComposite.extend("kellojo.m.AppTitle", {
        metadata: {
            properties: {

                title: {
                    type: "string",
                    defaultValue: ""
                },
                version: {
                    type: "string",
                    defaultValue: ""
                },
                subscription: {
                    type: "kellojo.m.Plan",
                    defaultValue: library.Plan.Free,
                },
                subscriptionExpiration: {
                    type: "Date",
                    defaultValue: null,
                },

            }
        },

        fragment: "kellojo.m.fragment.AppTitle"
    });

    var AppTitleProto = AppTitle.prototype;

    AppTitleProto.formatVersionLabel = function(sVersion, sSubscription) {
        const oResourceBundle = Core.getLibraryResourceBundle("kellojo.m");
        const sSubscriptionText = oResourceBundle.getText(`subscription-${sSubscription}`);
        return `${sVersion} ${sSubscriptionText}`;
    }

    AppTitleProto.formatVersionTooltip = function(sVersion, sSubscription, oDate) {
        const oDateFormat = DateFormat.getDateTimeInstance();
        const oResourceBundle = Core.getLibraryResourceBundle("kellojo.m");
        const sSubscriptionText = oResourceBundle.getText(`subscription-${sSubscription}`);
        const sDate = oDate ?  oDateFormat.format(oDate) : "tbd.";
        return oResourceBundle.getText("versionLabelTooltip", [sVersion, sSubscriptionText, sDate]);
    }


    return AppTitle;
});