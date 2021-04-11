sap.ui.define([
    "sap/ui/core/Control",
    "kellojo/m/thirdparty/confetti.browser.min",
], function (Control) {
        return Control.extend("kellojo.m.Confetti", {
            metadata: {
                properties: {
                    active: { type: "boolean", defaultValue: false },
                    duration: { type: "number", defaultValue: 2000 },
                }
            },

            init: function() {
                Control.prototype.init.apply(this, arguments);

                this.fnConfetti = confetti.create(myCanvas, { resize: true });
            },

            setActive: function(bActive) {
                clearTimeout(this.this.m_oConfettiTimeout);
                if (bActive) {
                    fnConfetti();
                    
                    this.m_oConfettiTimeout = setTimeout(() => {
                        this.setActive(false);
                    }, this.getDuration());
                } else {
                    fnConfetti.reset();
                }
            },

            renderer: function (oRm, oControl) {

                oRm.write("<div");
                oRm.writeControlData(oControl);
                oRm.addClass("kellojoMConfetti");
                oRm.writeClasses(oControl);

                oRm.write("<canvas class='kellojoMConfetti-Canvas' id='" + oControl.getId() + "-confetti'/>");

                oRm.write("></div>");
            }
        });
    }
);
