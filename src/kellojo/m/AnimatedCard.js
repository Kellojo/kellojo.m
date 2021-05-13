sap.ui.define([
    "sap/ui/core/Control",
    "./AnimatedCardRenderer",
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

            onAfterRendering: function() {
                const oDomRef = this.getDomRef();

                if (this.getTouchEnabled()) {
                    oDomRef.addEventListener('touchmove', this.onMouseStay.bind(this));
                    oDomRef.addEventListener('touchstart', this.onMouseEnter.bind(this));
                    oDomRef.addEventListener('touchend', this.onMouseExit.bind(this));
                } else {
                    oDomRef.addEventListener('mousemove', this.onMouseStay.bind(this));
                    oDomRef.addEventListener('mouseenter', this.onMouseEnter.bind(this));
                    oDomRef.addEventListener('mouseleave', this.onMouseExit.bind(this));
                }
            },

            getTouchEnabled: function() {
                return 'ontouchstart' in window || navigator.msMaxTouchPoints;
            },

            onMouseEnter: function(e) {
                if (!this.getAnimated()) {
                    return;
                }
                this.addStyleClass("kellojoMAnimatedCard-flg-hover");
            },
            onMouseStay: function(e) {
                if (!this.getAnimated()) {
                    return;
                }

                const oDomRef = this.getDomRef();
                const oShine = document.getElementById(this.getId() + "-shine");

                    var bdst = this.getParent().getDomRef().scrollTop || document.documentElement.scrollTop,
                    bdsl = this.getParent().getDomRef().scrollLeft,
                    pageX = this.getTouchEnabled() ? e.touches[0].pageX : e.pageX,
                    pageY = this.getTouchEnabled() ? e.touches[0].pageY : e.pageY,
                    offsets = oDomRef.getBoundingClientRect(),
                    w = oDomRef.clientWidth || oDomRef.offsetWidth || oDomRef.scrollWidth,
                    h = oDomRef.clientHeight || oDomRef.offsetHeight || oDomRef.scrollHeight,
                    wMultiple = 320/w,
                    offsetX = 0.52 - (pageX - offsets.left - bdsl)/w,
                    offsetY = 0.52 - (pageY - offsets.top - bdst)/h,
                    dy = (pageY - offsets.top - bdst) - h / 2,
                    dx = (pageX - offsets.left - bdsl) - w / 2,
                    yRotate = (offsetX - dx)*(0.07 * wMultiple) * 0.4,
                    xRotate = (dy - offsetY)*(0.1 * wMultiple) * 0.4,
                    imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)',
                    arad = Math.atan2(dy, dx),
                    angle = arad * 180 / Math.PI - 90;
        
                if (angle < 0) {
                    angle = angle + 360;
                }
        
                if(oDomRef.className.indexOf(' kellojoMAnimatedCard-flg-hover') != -1){
                    imgCSS += ' scale3d(1.07,1.07,1.07)';
                }
                oDomRef.style.transform = imgCSS;
                
                oShine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
            },
            onMouseExit: function(e) {
                const oDomRef = this.getDomRef();
                this.removeStyleClass("kellojoMAnimatedCard-flg-hover");

                oDomRef.style.transform = '';
                oDomRef.style.cssText = '';
            },


            
        });
    }
);
