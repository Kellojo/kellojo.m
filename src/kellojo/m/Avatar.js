sap.ui.define([
    "sap/m/Avatar",
    "sap/m/AvatarRenderer"
], function (Control, AvatarRenderer) {
        return Control.extend("kellojo.m.Avatar", {
            metadata: {
                properties: {
                    animate: {
                        type: "boolean",
                        defaultValue: false
                    }
                }
            },

            renderer: AvatarRenderer,

            init: function() {
                Control.prototype.init.apply(this, arguments);
                this.addStyleClass("kellojoMAvatar");
                this.setAnimate(this.getAnimate());

                this.addStyleClass(`kellojoMAvatar-flg-color-${this.getRandomInt(1, 3)}`);
            },

            setAnimate: function(bAnimate) {
                this.toggleStyleClass("kellojoMAvatar-flg-animate", bAnimate);
                this.setProperty("animate", bAnimate, true);
            },


            getRandomInt: function (iMin, iMax) {
                iMin = Math.ceil(iMin);
                iMax = Math.floor(iMax);
                return Math.floor(Math.random() * (iMax - iMin + 1)) + iMin;
            },

        });
    }
);
