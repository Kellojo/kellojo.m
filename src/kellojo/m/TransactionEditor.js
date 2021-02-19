sap.ui.define([
    "sap/ui/core/XMLComposite",
    "sap/ui/core/ValueState",
    "sap/ui/core/Core",
    "sap/ui/core/format/NumberFormat",
    "kellojo/m/library",
    "sap/ui/Device"
], function (XMLComposite, ValueState, Core, NumberFormat, library, Device) {
    var TransactionEditor = XMLComposite.extend("kellojo.m.TransactionEditor", {
        metadata: {
            properties: {
                isPlannedTransaction: {
                    type: "boolean",
                    defaultValue: false
                },

                title: {
                    type: "string",
                    defaultValue: ""
                },
                showTitleSuggestion: {
                    type: "boolean",
                    defaultValue: !Device.system.phone,
                },
                titleSuggestions: {
                    type: "string[]",
                    defaultValue: null,
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
                currency: {
                    type: "string",
                    defaultValue: "EUR"
                },

                customErrorMessage: {
                    type: "string"
                },

                reccurrence: {
                    type: "kellojo.m.TransactionreccurrenceType",
                    defaultValue: library.TransactionreccurrenceType.MONTHLY
                },
                reccurrences: {
                    type: "string[]",
                    defaultValue: [
                        { key: library.TransactionreccurrenceType.DAILY, text: Core.getLibraryResourceBundle("kellojo.m").getText("reccurrenceDAILY")},
                        { key: library.TransactionreccurrenceType.WEEKLY, text: Core.getLibraryResourceBundle("kellojo.m").getText("reccurrenceWEEKLY")},
                        { key: library.TransactionreccurrenceType.MONTHLY, text: Core.getLibraryResourceBundle("kellojo.m").getText("reccurrenceMONTHLY")},
                        { key: library.TransactionreccurrenceType.YEARLY, text: Core.getLibraryResourceBundle("kellojo.m").getText("reccurrenceYEARLY")},
                    ]
                },
                startingFrom: {
                    type: "object",
                    defaultValue: new Date()
                },
                today: {
                    type: "object",
                    defaultValue: null,
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

        this.m_oNumberFormat = NumberFormat.getCurrencyInstance({
            showMeasure: false
        });

        // validation setup
        this.m_aFormFields = [
            {control: this.byId("idTitleInput"), minLength: 3 },
            {control: this.byId("idAmountInput"), minValue: 0 }
        ];

        if (this.getIsPlannedTransaction()) {
            this.m_aFormFields.push();
        }
    };

    TransactionEditorProto.onAmountChange = function() {
        this.setAmount(this.get_amount()[0]);
    }

    TransactionEditorProto.focusTitle = function() {
        this.byId("idTitleInput").focus();
    }

    // ----------------------------
    // Getters & Setters
    // ----------------------------

    TransactionEditorProto.setAmount = function(iAmount) {
        this.setProperty("amount", iAmount);
        this.set_amount([
            iAmount,
            this.m_oNumberFormat.oLocaleData.getCurrencySymbol(this.getCurrency())
        ]);
    }

    TransactionEditorProto.setCurrency = function(sCurrency) {
        this.setProperty("currency", sCurrency);

        var aAmount = this.get_amount();
        aAmount[1] = this.m_oNumberFormat.oLocaleData.getCurrencySymbol(this.getCurrency());
        this.set_amount(aAmount);
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