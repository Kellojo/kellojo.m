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

                    subscriptions: { type: "object[]" },
                },

                events: {
                    skipSubscription: { },
                    subscribe: { },
                },

            },
            fragment: "kellojo.m.fragment.SubscriptionPurchase",

            init: function() {
                XMLComposite.prototype.init.apply(this, arguments);

                this.m_oNavContainer = this.byId("idNavContainer");
            },

            onSubscribeButtonPress: function() {
                this.setIsPurchasing(true);
                this.fireSubscribe({});

            },

            subscriptionFailed: function() {
                this.setIsPurchasing(false);
            },
            subscriptionPurchased: function() {
                this.setIsPurchasing(false);
                this.m_oNavContainer.to(this.byId("idSubscriptionPurchasedPage"));
                // show confetti
            }

        });
    }
);
