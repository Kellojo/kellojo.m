
sap.ui.define([
    "sap/ui/core/XMLComposite",
    "sap/ui/core/Core",
    "sap/m/StandardListItem",
    "sap/ui/Device",
    "sap/ui/core/format/NumberFormat",
], function (XMLComposite, Core, StandardListItem, Device, NumberFormat) {
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

                currencyLabel: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("userHelpMenuCurrencyLabel") },
                availableCurrencies: { type: "object[]" },
                selectedCurrency: {
                    type: "string",
                    defaultValue: "EUR"
                },

                isPhone: {
                    type:"boolean",
                    defaultValue: Device.system.phone
                },

                backButtonVisible: {
                    type: "boolean",
                    defaultValue: false
                },

                installationHintVisible: {
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
                },

                currencyChange: {
                    parameters: {
                        currency: {
                            type: "string"
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

        this.m_oNumberFormat = NumberFormat.getCurrencyInstance({
            showMeasure: false
        });

        this.m_oPopover.addEventDelegate({
            onAfterRendering: this.onAfterRendering.bind(this)
        });
    };

    UserHelpMenuProto.onAfterRendering = function() {
        let iHeight = 0;

        iHeight = this.m_oList.$().outerHeight(true);

        this.m_oPopover.setContentHeight(iHeight + "px");
    }

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

    UserHelpMenuProto.onSelectCurrency = function(oEvent) {
        this.fireCurrencyChange({
            currency: oEvent.getParameter("selectedItem").getKey()
        });
    }

    // --------------------------
    // Getters & Setters
    // --------------------------

    UserHelpMenuProto.getTitle = function() {
        return this.getProperty("title") ||  Core.getLibraryResourceBundle("kellojo.m").getText("userHelpMenuTitle");
    }


    UserHelpMenuProto.formatCurrencySymbol = function(sCurrency) {
        return this.m_oNumberFormat.oLocaleData.getCurrencySymbol(sCurrency);
    }

    return UserHelpMenu;
});