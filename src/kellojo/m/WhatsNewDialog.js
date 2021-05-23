sap.ui.define([
    "sap/ui/core/XMLComposite",
    "kellojo/m/library",
    "sap/ui/core/Core",
    "sap/ui/core/format/DateFormat",
    "sap/base/strings/formatMessage",
], function (XMLComposite, library, Core, DateFormat, formatMessage) {
    var WhatsNewDialog = XMLComposite.extend("kellojo.m.WhatsNewDialog", {
        metadata: {
            properties: {

                title: {
                    type: "string",
                    defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("whatsNewDialogTitle"),
                },
                closeButtonText: {
                    type: "string",
                    defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("close"),
                },

                version: {
                    type: "string",
                    defaultValue: ""
                },
                releaseDate: {
                    type: "string",
                    defaultValue: null
                },
                creationDate: {
                    type: "string",
                    defaultValue: null
                },
                description: {
                    type: "string",
                    defaultValue: ""
                },
                author: {
                    type: "string",
                    defaultValue: ""
                },
                name: {
                    type: "string",
                    defaultValue: ""
                },
                url: {
                    type: "string",
                    defaultValue: ""
                },
                authorAvatar: {
                    type: "string",
                    defaultValue: ""
                },
            }
        },

        fragment: "kellojo.m.fragment.WhatsNewDialog"
    });

    var WhatsNewDialogProto = WhatsNewDialog.prototype;

    WhatsNewDialogProto.init = function () {

    }

    WhatsNewDialogProto.open = function() {
        this.byId("idDialog").open();
    }

    WhatsNewDialogProto.close = function () {
        this.byId("idDialog").close();
    }

    WhatsNewDialogProto.formatReleaseDate = function (oDate, sAuthor) {
        const oDateFormat = DateFormat.getDateInstance();
        const sDateText = oDate ? oDateFormat.format(new Date(oDate)) : "";
        const oResourceBundle = Core.getLibraryResourceBundle("kellojo.m");
        return oResourceBundle.getText("whatsNewDialogReleasedOn", [sAuthor, sDateText]);
    }

    WhatsNewDialogProto.formatTitle = function(sTitle, sVersion) {
        return formatMessage(sTitle, [sVersion]);
    }


    return WhatsNewDialog;
});