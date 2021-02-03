sap.ui.define([
    "sap/ui/base/ManagedObject"
], function (ManagedObject) {
    "use strict";

    var oManager = ManagedObject.extend("kellojo.m.beans.Sorter", {
        metadata: {
            
        }
    }),
        ManagerProto = oManager.prototype;

    /**
     * Sorty by date
     * @param {any} dateA 
     * @param {any} dateB 
     * @returns {int}
     * @public
     */
    oManager.sortByDate = function (oDateA, oDateB) {
        var iDateA = oDateA,
            iDateB = oDateB;
        if (typeof oDateA === "string") {
            iDateA = new Date(oDateA).getTime();
        }

        if (typeof oDateB !== "number") {
            iDateB = new Date(oDateB).getTime();
        }

        return iDateB - iDateA;
    };

    return oManager;
});