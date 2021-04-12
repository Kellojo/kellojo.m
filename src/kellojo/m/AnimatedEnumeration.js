sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {
        return Control.extend("kellojo.m.AnimatedEnumeration", {
            metadata: {
                properties: {
                    hidden: {
                        type: "boolean",
                        defaultValue: true,
                    }
                },
                aggregations: {
                    content: {
                        multiple: true,
                        type: "sap.ui.core.Control",
                    }
                },

                defaultAggregation: "content",
            },

            init: function() {
                Control.prototype.init.apply(this, arguments);
                this.setHidden(true);
            },

            renderer: function (oRm, oControl) {

                oRm.write("<div");
                oRm.writeControlData(oControl);
                oRm.addClass("kellojoMAnimatedEnumeration");
                oRm.writeClasses(oControl);
                oRm.write(">");

                oControl.getContent().forEach((oChild) => {
                    oRm.renderControl(oChild);
                });

                oRm.write("</div>");
            },

            setHidden: function(bHidden) {
                this.setProperty("hidden", bHidden, true);

                if (bHidden) {
                    this.addStyleClass("kellojoMAnimatedEnumeration-flg-hidden-content");
                } else {
                    const iDelay = 0.5;
                    this.getContent().forEach((oChild, iIndex) => {
                        oChild.getDomRef().style["transition-delay"] = iIndex * iDelay + "s";
                    });
    
                    this.removeStyleClass("kellojoMAnimatedEnumeration-flg-hidden-content");
                }
            },
        });
    }
);
