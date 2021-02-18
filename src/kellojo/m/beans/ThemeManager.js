sap.ui.define([
    "kellojo/m/beans/BeanBase",
    "sap/base/Log",
    "kellojo/m/library"
], function (ManagedObject, Log, library) {
    "use strict";

    var oSchema = ManagedObject.extend("kellojo.m.beans.ThemeManager", {
        metadata: {
            properties: {
                theme: {
                    type: "kellojo.m.Theme",
                    defaultValue: library.Theme.Auto,
                }
            },

            events: {
                themeChange: {
                    parameters: {
                        theme: {
                            type: "kellojo.m.Theme",
                        }
                    }
                }
            }
        }
    }),
        SchemaProto = oSchema.prototype;


    SchemaProto.onInit = function () {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.onColorSchemeChange.bind(this));
    };

    SchemaProto.onColorSchemeChange = function(oEvent) {
        this.setTheme(this.getTheme());
    }


    /**
     * Applies the given theme
     * @param {string} sTheme 
     * @public
     */
    SchemaProto.setTheme = function (sTheme) {
        if (sTheme != this.getTheme()) {
            this.fireThemeChange({
                theme: sTheme,
            });
        }

        this.setProperty("theme", sTheme);
        let sAppliedTheme = sTheme;
        if (sTheme === library.Theme.Auto) {
            sAppliedTheme = this.getDefaultTheme();
        }
        
        sap.ui.getCore().applyTheme(sAppliedTheme);
    };

    /**
     * Get's the default theme by the system
     * @returns {string}
     * @public
     */
    SchemaProto.getDefaultTheme = function() {
        const bIsDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return bIsDarkMode ? "sap_fiori_3_dark" : "sap_fiori_3";
    }


    return oSchema;
});