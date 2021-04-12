sap.ui.define([
    "sap/ui/core/Control",
    "kellojo/m/thirdparty/confetti.browser.min",
], function (Control) {
        return Control.extend("kellojo.m.Confetti", {
            metadata: {
                properties: {
                    active: { type: "boolean", defaultValue: false },
                    duration: { type: "int", defaultValue: 10000 },
                }
            },

            init: function() {
                Control.prototype.init.apply(this, arguments);
                
            },

            onAfterRendering: function() {
                const oParentElement = this.getDomRef().parentElement;
                const oCanvas = document.getElementById(this.getId() + "-confetti");
                oCanvas.width = oParentElement.offsetWidth;
                oCanvas.height = oParentElement.offsetHeight;

                this.fnConfetti = confetti.create(
                    oCanvas,
                    { resize: true }
                );
            },

            renderer: function (oRm, oControl) {

                oRm.write("<div");
                oRm.writeControlData(oControl);
                oRm.addClass("kellojoMConfetti");
                oRm.writeClasses(oControl);
                oRm.write(">");

                oRm.write("<canvas class='kellojoMConfetti-Canvas' id='" + oControl.getId() + "-confetti'></canvas>");

                oRm.write("</div>");
            },

            setActive: function(bActive) {
                clearTimeout(this.m_oConfettiTimeout);
                if (bActive) {
                    this.fnConfetti();
                    
                    this.m_oConfettiTimeout = setTimeout(() => {
                        this.setActive(false);
                    }, this.getDuration());
                } else {
                    this.fnConfetti.reset();
                }
            },


        });
    }
);
