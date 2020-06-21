sap.ui.define([
    "sap/ui/core/XMLComposite",
    "sap/ui/core/Core"
], function (XMLComposite, Core) {
    var TransactionEditor = XMLComposite.extend("kellojo.m.TransactionEditor", {
        metadata: {
            properties: {
                TransactionEditor_title: {
                    type: "string"
                },
                TransactionEditor_emailPlaceholder: {
                    type: "string"
                },
                TransactionEditor_passwordPlaceholder: {
                    type: "string"
                },
                TransactionEditor_passwordRepeatPlaceholder: {
                    type: "string"
                },
                TransactionEditor_forgotPassword: {
                    type: "string"
                },
                TransactionEditor_createAccountQuestion: {
                    type: "string"
                },
                TransactionEditor_signIn: {
                    type: "string"
                },

                registration_title: {
                    type: "string"
                },
                registration_TransactionEditorQuestion: {
                    type: "string"
                },
                registration_signUp: {
                    type: "string"
                },

                title: {
                    type: "string",
                    defaultValue: ""
                },
                category: {
                    type: "string",
                    defaultValue: ""
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
                    type: "date",
                    defaultValue: new Date()
                },
                amount: {
                    type: "number",
                    defaultValue: 0
                },

                customErrorMessage: {
                    type: "string"
                }


            },

            events: {
                signIn: {

                },
                signUp: {

                },
                passwordForgotten: {

                },

            }
        },

        fragment: "kellojo.m.fragment.TransactionEditor"
    });

    var TransactionEditorProto = TransactionEditor.prototype;


    TransactionEditorProto.init = function () {
        this.addStyleClass("kellojoMTransactionEditor");
        this.m_oNavContainer = this.byId("idNavContainer");
        this.m_oSignUpForm = this.byId("idSignUpForm");
        this.m_oSignInForm = this.byId("idSignInForm");
    };

    // ----------------------------
    // Getters & Setters
    // ----------------------------




    return TransactionEditor;
});