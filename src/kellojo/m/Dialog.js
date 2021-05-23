sap.ui.define([
    "sap/m/Dialog",
    "sap/m/DialogRenderer",
], function (Dialog, DialogRenderer) {
    var CustomDialog = Dialog.extend("kellojo.m.Dialog", {
        metadata: {
            properties: {
                maxContentHeight: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: null,
                },
                enableAutoHeightAdjustment: {
                    type: "boolean",
                    defaultValue: true,
                },
            }
        },
        renderer: DialogRenderer
    });

    var DialogProto = CustomDialog.prototype;

    DialogProto.init = function () {
        Dialog.prototype.init.apply(this, arguments);
        this.addStyleClass("kellojoMDialog");
    }

    DialogProto.onAfterRendering = function() {
        const oScrollContainer = document.getElementById(`${this.getId()}-scrollCont`);
        let iHeight = oScrollContainer.scrollHeight;

        if (!this.getEnableAutoHeightAdjustment()) {
            return;
        }

        if (this.getMaxContentHeight()) {
            iHeight = Math.max(0, Math.min(iHeight, Number.parseInt(this.getMaxContentHeight())));
        }

        this.setContentHeight(`${iHeight}px`);
    }

    /**
     *
     * @param {Object} $Ref
     * @param {number} iRealDuration
     * @param {function} fnOpened
     * @private
     */
    DialogProto._openAnimation = function ($Ref, iRealDuration, fnOpened) {
        Dialog.prototype._openAnimation.apply(this, arguments);
        try {
            const oBlockLayer = jQuery("#sap-ui-blocklayer-popup")
            oBlockLayer.hide();
            oBlockLayer.fadeIn();
        } catch (error) {
            
        }

    };


    /**
     *
     * @param {Object} $Ref
     * @param {number} iRealDuration
     * @param {function} fnClose
     * @private
     */
    DialogProto._closeAnimation = function ($Ref, iRealDuration, fnClose) {
        try {
            jQuery("#sap-ui-blocklayer-popup").fadeOut();
        } catch (error) {

        }
        
        Dialog.prototype._closeAnimation.apply(this, arguments);
        
    };


    return CustomDialog;
});