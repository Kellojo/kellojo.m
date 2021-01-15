sap.ui.define([
    "kellojo/m/beans/BeanBase",
    "sap/base/Log"
], function (ManagedObject, Log) {
    "use strict";

    var oSchema = ManagedObject.extend("kellojo.m.beans.ThemeManager", {
        metadata: {
            properties: {
                storageKey: {
                    type: "string",
                    defaultValue: "theme"
                },
                defaultTheme: {
                    type: "string",
                    defaultValue: "sap_fiori_3"
                },
            }
        }
    }),
        SchemaProto = oSchema.prototype;


    SchemaProto.onInit = function () {
        this.setTheme(this.getTheme());
    };


    /**
     * Applies the given theme
     * @param {string} sTheme 
     * @public
     */
    SchemaProto.setTheme = function (sTheme) {
        localStorage.setItem(this.getStorageKey(), sTheme);
        sap.ui.getCore().applyTheme(sTheme);
    };

    /**
     * Applies the given theme
     * @returns {string} sTheme
     * @public
     */
    SchemaProto.getTheme = function() {
        return localStorage.getItem(this.getStorageKey()) || this.getDefaultTheme();
    };

    /**
     * Is the dark theme active
     * @returns {boolean}
     * @public
     */
    SchemaProto.isDarkTheme = function() {
        return this.getTheme() === "sap_fiori_3_dark";
    }


    return oSchema;
});