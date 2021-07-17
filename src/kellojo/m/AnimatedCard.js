sap.ui.define([
    "sap/ui/core/Control",
    "./AnimatedCardRenderer",
    "kellojo/m/thirdparty/tilt.jquery.min"
], function (Control, AnimatedCardRenderer) {
        return Control.extend("kellojo.m.AnimatedCard", {
            metadata: {
                properties: {
                    animated: {
                        type: 'boolean',
                        defaultValue: true,
                    }
                },
                aggregations: {
                    content: {
                        type: "sap.ui.core.Control",
                        multiple: true,
                    }
                },

                defaultAggregation: 'content',
            },
            renderer: AnimatedCardRenderer,


            init: function() {
                Control.prototype.init.apply(this, arguments);


            },

            exit: function() {
                if (this.m_oTilt) {
                    this.m_oTilt.tilt.destroy.call(this.m_oTilt);
                    this.m_oTilt = null;
                }
            },

            onAfterRendering: function() {
                const oDomRef = this.getDomRef();

                if (this.m_oTilt) {
                    this.m_oTilt.tilt.destroy.call(this.m_oTilt);
                    this.m_oTilt = null;
                }

                this.m_oTilt = jQuery(oDomRef).tilt({
                    speed: 200,
                    maxTilt: 5,
                });
            },



            
        });
    }
);
