sap.ui.define([
    "sap/ui/core/XMLComposite",
    "sap/ui/core/ValueState",
    "sap/ui/core/Core"
], function (XMLComposite, ValueState, Core) {
    var TransactionEditor = XMLComposite.extend("kellojo.m.TransactionEditor", {
        metadata: {
            properties: {

                title: {
                    type: "string",
                    defaultValue: ""
                },
                category: {
                    type: "string",
                    defaultValue: ""
                },
                type: {
                    type: "string",
                    defaultValue: "expense"
                },
                categories: {
                    type: "string[]",
                    defaultValue: []
                },
                isCompleted: {
                    type: "boolean",
                    defaultValue: true
                },
                occurredOn: {
                    type: "object",
                    defaultValue: new Date()
                },
                amount: {
                    type: "Number",
                    defaultValue: 0
                },

                _amount: {
                    type: "any",
                    defaultValue: ["0", "€"]
                },
                currencySymbol: {
                    type: "string",
                    defaultValue: "€"
                },

                customErrorMessage: {
                    type: "string"
                }


            },

            events: {
                
            }
        },

        fragment: "kellojo.m.fragment.TransactionEditor"
    });

    var TransactionEditorProto = TransactionEditor.prototype;


    TransactionEditorProto.init = function () {
        XMLComposite.prototype.init.apply(this, arguments);
        this.addStyleClass("kellojoMTransactionEditor");

        // validation setup
        this.m_aFormFields = [
            {control: this.byId("idTitleInput"), minLength: 3 },
            {control: this.byId("idAmountInput"), minValue: 0 }
        ]
    };

    TransactionEditorProto.onAmountChange = function() {
        this.setAmount(this.get_amount()[0]);
    }

    // ----------------------------
    // Getters & Setters
    // ----------------------------

    TransactionEditorProto.setAmount = function(iAmount) {
        this.setProperty("amount", iAmount);
        this.set_amount([
            iAmount, this.getCurrencySymbol()
        ]);
    }


    // ----------------------------
    // Validation
    // ----------------------------

        /**
     * Validates the form controls, only works, if a property called "this.m_aFormFields" has been created
     * @returns {boolean}
     * @protected
     */
    TransactionEditorProto.validateControls = function() {
        var aFields = this.m_aFormFields,
            bIsValid = true; 

        aFields.forEach((oControlInfo) => {
            var oControl = oControlInfo.control,
                oResourceBundle = Core.getLibraryResourceBundle("kellojo.m"),
                sValue = oControl.getValue(),
                bIsControlValid = true,
                sValueStateText = "";
            
            // min length
            if (oControlInfo.hasOwnProperty("minLength") && sValue.length < oControlInfo.minLength) {
                bIsControlValid = false;
                sValueStateText = oResourceBundle.getText("formValidationMinLengthNotReached", [oControlInfo.minLength]);
            }

            // min value
            var iNumericValue = oControl.getBinding("value").getValue();
            if (Array.isArray(iNumericValue)) {
                iNumericValue = iNumericValue[0];
            }
            if (oControlInfo.hasOwnProperty("minValue") && parseFloat(iNumericValue) <= oControlInfo.minValue) {
                bIsControlValid = false;
                sValueStateText = oResourceBundle.getText("formValidationMinValueNotReached", [oControlInfo.minValue]);
            }



            oControl.setValueState(bIsControlValid ? ValueState.None : ValueState.Error);
            oControl.setValueStateText(sValueStateText);

            if (!bIsControlValid) {
                bIsValid = false;
            }
        });

        return bIsValid;
    };

    /**
     * Resets the validation for all controls
     * @protected
     */
    TransactionEditorProto.resetValidation = function() {
        var aFields = this.m_aFormFields;
        aFields.forEach((oControlInfo) => {
            var oControl = oControlInfo.control;
            oControl.setValueState(ValueState.None);
            oControl.setValueStateText("");
        });
    };

    return TransactionEditor;
});