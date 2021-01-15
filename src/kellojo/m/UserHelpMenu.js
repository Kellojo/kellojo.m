
sap.ui.define([
    "sap/ui/core/XMLComposite",
    "sap/ui/core/Core",
    "sap/m/StandardListItem",
    "sap/ui/Device"
], function (XMLComposite, Core, StandardListItem, Device) {
    var UserHelpMenu = XMLComposite.extend("kellojo.m.UserHelpMenu", {
        metadata: {
            properties: {
                title: { type: "string" },
                items: { type: "object[]", defaultValue: [] },
                closeButtonVisible: {type: "boolean", defaultValue: false},

                exportVisible: { type: "boolean", defaultValue: false },
                signOutVisible: { type: "boolean", defaultValue: false },

                dataExportLabel: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("UserHelpMenuExport") },
                getMobileAppLabel: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("UserHelpMenuGetMobileApp") },
                getDesktopAppLabel: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("UserHelpMenuGetDesktopApp") },
                websiteLabel: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("UserHelpMenuWebsite") },
                settingsLabel: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("UserHelpMenuSettings") },
                signOutLabel: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("UserHelpMenuSignOut") },

                darkModeLabel: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("userHelpMenuDarkMode") },
                darkModeEnabled: {
                    type: "boolean",
                    defaultValue: false
                },

                isPhone: {
                    type:"boolean",
                    defaultValue: Device.system.phone
                },

                backButtonVisible: {
                    type: "boolean",
                    defaultValue: false
                }
            },

            events: {
                close: {},

                exportPress: {},
                getDesktopAppPress: {},
                getMobileAppPress: {},
                websitePress: {},
                signOutPress: {},

                switchDarkMode: {
                    parameters: {
                        enabled: {
                            type: "boolean"
                        }
                    }
                }
            }
        },

        fragment: "kellojo.m.fragment.UserHelpMenu"
    });

    var UserHelpMenuProto = UserHelpMenu.prototype;

    UserHelpMenuProto.init = function() {
        this.m_oList = this.byId("idList");
        this.m_oPopover = this.byId("idPopover");
        this.m_oNavCon = this.byId("idNavContainer");
        this.m_oPopover.attachAfterClose(function() {
            this.fireClose();
            this.destroy();
        }.bind(this));
    };

    UserHelpMenuProto.openBy = function(oSourceControl, sPlacement) {
        this.m_oPopover.setPlacement(sPlacement);
        this.m_oPopover.openBy(oSourceControl);
        return this;
    };

    UserHelpMenuProto.close = function() {
        this.m_oPopover.close();
    }

    UserHelpMenuProto.onSettingsPress = function() {
        this.m_oNavCon.to(this.byId("idSettingsPage"));
        this.setBackButtonVisible(true);
    }

    UserHelpMenuProto.onBackPress = function() {
        this.m_oPopover._getPopup().setAutoClose(false);
        setTimeout(() => {
            this.m_oPopover._getPopup().setAutoClose(true);
        }, 501);

        this.m_oNavCon.backToTop();
        this.setBackButtonVisible(false);
    }

    UserHelpMenuProto.onSwitchDarkMode = function(oEvent) {
        this.fireSwitchDarkMode({
            enabled: oEvent.getParameter("state")
        });
    }

    // --------------------------
    // Getters & Setters
    // --------------------------

    UserHelpMenuProto.getTitle = function() {
        return this.getProperty("title") ||  Core.getLibraryResourceBundle("kellojo.m").getText("userHelpMenuTitle");
    }

    return UserHelpMenu;
});