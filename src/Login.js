sap.ui.define([
    "sap/ui/core/XMLComposite",
    "sap/ui/core/Core"
], function (XMLComposite, Core) {
        var Login =  XMLComposite.extend("kellojo.m.Login", {
            metadata: {
                properties: {
                    login_title: {
                        type: "string"
                    },
                    login_emailPlaceholder: {
                        type: "string"
                    },
                    login_passwordPlaceholder: {
                        type: "string"
                    },
                    login_passwordRepeatPlaceholder: {
                        type: "string"
                    },
                    login_forgotPassword: {
                        type: "string"
                    },
                    login_createAccountQuestion: {
                        type: "string"
                    },
                    login_signIn: {
                        type: "string"
                    },

                    registration_title: {
                        type: "string"
                    },
                    registration_loginQuestion: {
                        type: "string"
                    },
                    registration_signUp: {
                        type: "string"
                    },

                    email: {
                        type: "string",
                        defaultValue: ""
                    },
                    password: {
                        type: "string",
                        defaultValue: ""
                    },
                    password1: {
                        type: "string",
                        defaultValue: ""
                    },

                    emailValueState: {
                        type: "string"
                    },
                    passwordValueState: {
                        type: "string"
                    },
                    password1ValueState: {
                        type: "string"
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

            fragment: "kellojo.m.fragment.Login"
        });

        var LoginProto = Login.prototype;


        LoginProto.init = function() {
            this.addStyleClass("kellojoMLogin");
            this.m_oNavContainer = this.byId("idNavContainer");
            this.m_oSignUpForm = this.byId("idSignUpForm");
            this.m_oSignInForm = this.byId("idSignInForm");
        };


        LoginProto.toSignIn = function() {
            this.m_oNavContainer.backToTop();
        };
        LoginProto.toSignUp = function() {
            this.m_oNavContainer.to(this.byId("idSignUpPage"));
        };

        LoginProto.onSignInPress = function() {
            if (this.validateInput().isValidSignIn) {
                this.fireSignIn({
                    email: this.getEmail(),
                    password: this.getPassword()
                });
            } else {
                this.m_oSignInForm.removeStyleClass("kellojoMLogin-loginForm-flg-error");
                setTimeout(function() {
                    this.m_oSignInForm.addStyleClass("kellojoMLogin-loginForm-flg-error");
                }.bind(this), 0);
            }
        };
        LoginProto.onSignUpPress = function() {
            if (!this.validateInput().isValidSignUp) {
                this.m_oSignUpForm.removeStyleClass("kellojoMLogin-loginForm-flg-error");
                setTimeout(function() {
                    this.m_oSignUpForm.addStyleClass("kellojoMLogin-loginForm-flg-error");
                }.bind(this), 0);
            } else {
                this.fireSignUp({
                    email: this.getEmail(),
                    password: this.getPassword(),
                });
            }
        };

        /**
         * Validates the input of the email & password fields
         * @public
         */
        LoginProto.validateInput = function() {
            var sPassword = this.getPassword(),
            sPassword1 = this.getPassword1(),
            sEmail = this.getEmail(),
            bIsValidPassword1 = sPassword === sPassword1,
            bIsValidPassword = sPassword.length >= 6,
            bIsValidEmail = sEmail.length >= 3 && sEmail.includes("@");

            this.setEmailValueState(bIsValidEmail ? "None" : "Error");
            this.setPasswordValueState(bIsValidPassword ? "None" : "Error");
            this.setPassword1ValueState(bIsValidPassword1 && bIsValidPassword ? "None" : "Error");

            return {
                isValidSignIn: bIsValidPassword && bIsValidEmail,
                isValidSignUp: bIsValidPassword && bIsValidPassword1 && bIsValidEmail
            }; 
        };

        LoginProto.onForgotPasswordPress = function() {
            this.firePasswordForgotten({});
        };

        /**
         * Resets the login
         * @public
         */
        LoginProto.reset = function() {
            this.m_oNavContainer.to(this.byId("idSignInPage"), "show");
            this.setPassword1ValueState("None")
                .setPasswordValueState("None")
                .setEmailValueState("None")
                .setEmail("")
                .setPassword("")
                .setPassword1("")
                .setCustomErrorMessage("");

            return this;
        }

        // ----------------------------
        // Getters & Setters
        // ----------------------------

        LoginProto.getLogin_title = function() {
            return this.getProperty("login_title") || Core.getLibraryResourceBundle("kellojo.m").getText("login_title");
        }

        LoginProto.getLogin_emailPlaceholder = function() {
            return this.getProperty("login_emailPlaceholder") || Core.getLibraryResourceBundle("kellojo.m").getText("login_emailPlaceholder");
        }

        LoginProto.getLogin_passwordPlaceholder = function() {
            return this.getProperty("login_passwordPlaceholder") || Core.getLibraryResourceBundle("kellojo.m").getText("login_passwordPlaceholder");
        }

        LoginProto.getLogin_passwordRepeatPlaceholder = function() {
            return this.getProperty("login_passwordRepeatPlaceholder") || Core.getLibraryResourceBundle("kellojo.m").getText("login_passwordRepeatPlaceholder");
        }

        LoginProto.getLogin_forgotPassword = function() {
            return this.getProperty("login_forgotPassword") || Core.getLibraryResourceBundle("kellojo.m").getText("login_forgotPassword");
        }

        LoginProto.getLogin_createAccountQuestion = function() {
            return this.getProperty("login_createAccountQuestion") || Core.getLibraryResourceBundle("kellojo.m").getText("login_createAccountQuestion");
        }

        LoginProto.getLogin_signIn = function() {
            return this.getProperty("login_signIn") || Core.getLibraryResourceBundle("kellojo.m").getText("login_signIn");
        }

        LoginProto.getRegistration_title = function() {
            return this.getProperty("registration_title") || Core.getLibraryResourceBundle("kellojo.m").getText("registration_title");
        }

        LoginProto.getRegistration_loginQuestion = function() {
            return this.getProperty("registration_loginQuestion") || Core.getLibraryResourceBundle("kellojo.m").getText("registration_loginQuestion");
        }

        LoginProto.getRegistration_signUp = function() {
            return this.getProperty("registration_signUp") || Core.getLibraryResourceBundle("kellojo.m").getText("registration_signUp");
        }


    return Login;
});