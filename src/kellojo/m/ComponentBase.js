sap.ui.define([
    "sap/ui/core/UIComponent",
], function (Component) {
    var ComponentBase = Component.extend("kellojo.m.ComponentBase", {
        metadata: {
            events: {
                show: {},
                hide: {},
                unload: {}
            }
        },
    });

    var ComponentBaseProto = ComponentBase.prototype;

    ComponentBaseProto.init = function() {
        Component.prototype.init.apply(this, arguments);

        window.addEventListener("visibilitychange", this.onVisibilityChange.bind(this));
        window.addEventListener("unload", this.fireUnload.bind(this));
    }

    ComponentBaseProto.onVisibilityChange = function() {
        const sState = document.visibilityState;

        if (sState === "visible" && this.m_iBlurTimeout) {
            clearTimeout(this.m_iBlurTimeout);
            return;
        } else if (sState === "visible") {
            this.fireShow({});
            return;
        }

        
        this.m_iBlurTimeout = setTimeout(() => {
            this.m_iBlurTimeout = null;
            if (sState === "hidden") {
                this.fireHide({});
            }
        }, 60000);
    }

    return ComponentBase;
});