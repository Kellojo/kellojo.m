sap.ui.define([
	"sap/ui/core/Core",
	"sap/ui/core/library"
],function(Core, Library) {
	"use strict";

	sap.ui.getCore().initLibrary({
		name : "kellojo.m",
		dependencies : [
			"sap.ui.core"
		],
		types: [],
		interfaces: [],
		controls: [
            "kellojo.m.TableActions",
            "kellojo.m.Wrapper",
            "kellojo.m.LineChart",
            "kellojo.m.ColumnChart",
            "kellojo.m.Currency",
            "kellojo.m.Deleter",
            "kellojo.m.CameraCapture",
            "kellojo.m.NoData",
            "kellojo.m.SortTable",
            "kellojo.m.SortColumn",
            "kellojo.m.UserHelpMenu",
            "kellojo.m.beans.BeanBase",
            "kellojo.m.beans.ThemeManager",
            "kellojo.m.Input",
        ],
		elements: [],
		version: "1.0.0"
    });
    
    kellojo.m.TransactionreccurrenceType = {
        DAILY: "DAILY",
        WEEKLY: "WEEKLY",
        MONTHLY: "MONTHLY",
        YEARLY: "YEARLY",
    };

    kellojo.m.TransactionreccurrenceTypeSortOrder = {
        DAILY: 1,
        WEEKLY: 2,
        MONTHLY: 3,
        YEARLY: 4,
    };

    kellojo.m.InputMode = {
        Numeric: "numeric",
        Text: "text",
        Decimal: "decimal",
        Tel: "tel",
        Search: "search",
        Email: "email",
        Url: "url",
    };

    kellojo.m.Theme = {
        Auto: "auto",
        Light: "sap_fiori_3",
        Dark: "sap_fiori_3_dark",
    };

    kellojo.m.Color = {
        BudgetP: "BudgetP",
        Default: "Default"
    };

    kellojo.m.Plan = {
        Free: "Free",
        Professional: "Professional",
    };


    /**
     * Get's the kellojo.m.Theme for a given theme string (fallback kellojo.m.Theme.Auto)
     * @param {string} sTheme 
     * @returns {kellojo.m.Theme}
     */
    kellojo.m.mapStringToTheme = function(sTheme) {
        for (var sKey in kellojo.m.Theme) {
            if (kellojo.m.Theme[sKey] === sTheme) {
                return sTheme;
            }
        }

        return kellojo.m.Theme.Auto;
    }

	return kellojo.m;

}, /* bExport= */ false);