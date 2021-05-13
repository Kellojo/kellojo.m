sap.ui.define([],
	function () {
		"use strict";



		var AnimatedCardRenderer = {
			apiVersion: 2
		};

		AnimatedCardRenderer.render = function (oRm, oControl) {


            oRm.openStart("div", oControl);
            oRm.class("kellojoMAnimatedCard");
            this.addClasses(oRm, oControl);
            oRm.writeClasses(oControl);
            oRm.openEnd();

            oRm.openStart("div", oControl.getId() + "-shine");
            oRm.class("kellojoMAnimatedCard-shine");
            oRm.openEnd();
            oRm.close("div");

            this.renderContent(oRm, oControl);

            oRm.close("div");
        },

        AnimatedCardRenderer.addClasses = function() {

        }

        AnimatedCardRenderer.renderContent = function(oRm, oControl) {
            oControl.getContent().forEach(oRm.renderControl);
        }

		return AnimatedCardRenderer;
	}, true);


