sap.ui.define([
    "sap/m/Input",
    "sap/m/InputRenderer"
], function (Input, InputRenderer) {
        return Input.extend("kellojo.m.Input", {
            metadata: {
                properties: {
                    inputMode: {
                        type: "kellojo.m.InputMode",
                    }
                }
            },

            renderer: InputRenderer,

            onAfterRendering: function() {
                if (!!this._$input && !!this.getInputMode()) {
                    this._$input.attr("inputmode", this.getInputMode());
                }
            }


        });
    }
);
