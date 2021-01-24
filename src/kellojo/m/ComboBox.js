sap.ui.define([
    "sap/m/ComboBox",
    "sap/m/ComboBoxRenderer"
], function (ComboBoxBase, ComboBoxRenderer) {
    var ComboBox = ComboBoxBase.extend("kellojo.m.ComboBox", {
        metadata: {
            
        },

        renderer: ComboBoxRenderer
    });

    var ComboBoxProto = ComboBox.prototype;

    ComboBoxProto.setSelectedKey = function(sKey) {
        if (!sKey) {
            this.setValue("");
        }

        ComboBox.prototype.setSelectedKey.apply(this, arguments);
    }


    return ComboBox;
});