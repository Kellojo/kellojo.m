sap.ui.define([
	"sap/ui/core/Core",
	"sap/ui/core/library"
],function(Core, Library) {
	"use strict";

	sap.ui.getCore().initLibrary({
		name : "com.kellojo.m",
		noLibraryCSS: true,
		dependencies : [
			"sap.ui.core"
		],
		types: [],
		interfaces: [],
		controls: [],
		elements: [],
		version: "1.0.0"
	});

	return com.kellojo.m;

}, /* bExport= */ false);