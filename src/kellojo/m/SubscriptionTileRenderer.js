sap.ui.define([
    "sap/ui/core/Renderer",
    "./AnimatedCardRenderer",
],
	function (Renderer, AnimatedCardRenderer) {
		"use strict";



		var SubscriptionTileRenderer = Renderer.extend(AnimatedCardRenderer);
        SubscriptionTileRenderer.apiVersion = 2

        SubscriptionTileRenderer.addClasses = function(oRm, oControl) {
            oRm.addClass("kellojoMSubscriptionTile-color-" + oControl.getColor());
        }

		SubscriptionTileRenderer.renderContent = function (oRm, oControl) {
    
            oRm.write("<div class='kellojoMSubscriptionTile-name'>");
            oRm.writeEscaped(oControl.getName());
            oRm.write("</div>");

            oRm.write("<div class='kellojoMSubscriptionTile-price'>");
            oRm.writeEscaped(oControl.getPrice());
            oRm.write("</div>");


            oRm.write("<div class='kellojoMSubscriptionTile-content'>");
            oControl.getContent().forEach(oRm.renderControl);
            oRm.write("</div>");


            oRm.write("<div class='kellojoMSubscriptionTile-submitButton'>");
            oRm.renderControl(oControl.getSubmitButton());
            oRm.write("</div>");
            
        };

		return SubscriptionTileRenderer;

	}, true);


