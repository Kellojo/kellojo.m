
sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Label",
    "sap/ui/core/Icon"
], function (Control, Label, Icon) {
        return Control.extend("kellojo.m.CameraCapture", {
            metadata: {
                properties: {
                    
                },

                events: {
                    imageCaptured: {
                        parameters: {
                            imageBase64: {
                                type: "string"
                            }
                        }
                    }
                }
            },

            init: function() {

            },

            onAfterRendering: function() {
                this.m_oInput = document.getElementById(this.getId() + "-input");
                this.m_oInput.onchange = this.onImageSelected.bind(this, this.m_oInput);
            },

            onImageSelected: function(oInput) {
                this.setBusy(true);
                var reader = new FileReader();
                reader.onloadend = function () {
                    this.setBusy(false);
                    this.fireImageCaptured({
                        imageBase64: reader.result
                    });
                }.bind(this);
                reader.readAsDataURL(oInput.files[0]);
            },

            renderer: function (oRm, oControl) {

                oRm.write("<div");
                oRm.writeControlData(oControl);
                oRm.addClass("kellojoM-cameraCapture");
                oRm.writeClasses(oControl);
                oRm.write(">");

                    oRm.write("<div class='kellojoM-cameraCapture-border' >");

                        oRm.renderControl(new Icon({ src: "sap-icon://add-photo" }).addStyleClass("kellojoM-cameraCapture-icon"));
                        oRm.renderControl(new Label({text: "Scan a bon or bill to create a transaction"}));
                        oRm.write("<input id=" + oControl.getId() + "-input" +  " type='file' accept='video/*;capture=camcorder' class='kellojoM-cameraCapture-input' />");

                    oRm.write("</div>");
                oRm.write("</div>");
            }
        });
    }
);