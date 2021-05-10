sap.ui.define([
    "sap/ui/core/XMLComposite",
    "sap/ui/core/Core",
], function (XMLComposite, Core) {
        return XMLComposite.extend("kellojo.m.SubscriptionPurchase", {
            metadata: {
                properties: {
                    appName: {type: "string", defaultValue: null },
                    isPurchasing: { type: "boolean", defaultValue: false },

                    skipText: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("subscriptionPurchase-skip") },
                    subscribeText: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("subscribe") },
                    chooseSubscriptionTitle: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("chooseSubscriptionTitle") },
                    chooseSubscriptionDetailsText: { type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("chooseSubscriptionDetails") },
                    successTitle: {type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("subscriptionPurchasedTitle") },
                    successDetails: {type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("subscriptionPurchasedDetails") },
                    continueText: {type: "string", defaultValue: Core.getLibraryResourceBundle("kellojo.m").getText("subscriptionPurchasedContinue") },

                    subscriptions: { type: "object[]" },
                    purchasedSubscription: {type: "object" },
                },

                events: {
                    skipSubscription: { },
                    subscribe: {
                        parameters: {
                            subscription: {
                                type: "object",
                            },
                        },
                    },
                    continue: {},
                },

            },
            fragment: "kellojo.m.fragment.SubscriptionPurchase",

            init: function() {
                XMLComposite.prototype.init.apply(this, arguments);

                this.m_oNavContainer = this.byId("idNavContainer");
            },

            onSubscribeButtonPress: function(oEvent) {
                const oSubscription = oEvent.getSource().data("subscription");
                this.setIsPurchasing(true);
                this.fireSubscribe({
                    subscription: oSubscription,
                });
                this.setPurchasedSubscription(oSubscription);
                this.byId("idAnimatedEnumeration").setHidden(true);
            },

            subscriptionFailed: function() {
                this.setIsPurchasing(false);
            },
            subscriptionPurchased: function() {
                this.setIsPurchasing(false);
                this.m_oNavContainer.to(this.byId("idSubscriptionPurchasedPage"));
                this.byId("idConfetti").setActive(true);
                this.byId("idAnimatedEnumeration").setHidden(false);
            },

            reset: function() {
                this.m_oNavContainer.backToTop();
            }

        });
    }
);
