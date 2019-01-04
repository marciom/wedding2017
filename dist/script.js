/*!
 * VERSION: 0.1.3
 * DATE: 2017-03-29
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * DrawSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";function a(a,b,c,d,e,f){return c=(parseFloat(c)-parseFloat(a))*e,d=(parseFloat(d)-parseFloat(b))*f,Math.sqrt(c*c+d*d)}function b(a){return"string"!=typeof a&&a.nodeType||(a=_gsScope.TweenLite.selector(a),a.length&&(a=a[0])),a}function c(a,b,c){var d,e,f=a.indexOf(" ");return-1===f?(d=void 0!==c?c+"":a,e=a):(d=a.substr(0,f),e=a.substr(f+1)),d=-1!==d.indexOf("%")?parseFloat(d)/100*b:parseFloat(d),e=-1!==e.indexOf("%")?parseFloat(e)/100*b:parseFloat(e),d>e?[e,d]:[d,e]}function d(c){if(!c)return 0;c=b(c);var d,e,f,g,h,j,k,l=c.tagName.toLowerCase(),m=1,n=1;"non-scaling-stroke"===c.getAttribute("vector-effect")&&(n=c.getScreenCTM(),m=n.a,n=n.d);try{e=c.getBBox()}catch(o){}if(e&&(e.width||e.height)||"rect"!==l&&"circle"!==l&&"ellipse"!==l||(e={width:parseFloat(c.getAttribute("rect"===l?"width":"circle"===l?"r":"rx")),height:parseFloat(c.getAttribute("rect"===l?"height":"circle"===l?"r":"ry"))},"rect"!==l&&(e.width*=2,e.height*=2)),"path"===l)g=c.style.strokeDasharray,c.style.strokeDasharray="none",d=c.getTotalLength()||0,m!==n&&console.log("Warning: <path> length cannot be measured accurately when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."),d*=(m+n)/2,c.style.strokeDasharray=g;else if("rect"===l)d=2*e.width*m+2*e.height*n;else if("line"===l)d=a(c.getAttribute("x1"),c.getAttribute("y1"),c.getAttribute("x2"),c.getAttribute("y2"),m,n);else if("polyline"===l||"polygon"===l)for(f=c.getAttribute("points").match(i)||[],"polygon"===l&&f.push(f[0],f[1]),d=0,h=2;h<f.length;h+=2)d+=a(f[h-2],f[h-1],f[h],f[h+1],m,n)||0;else("circle"===l||"ellipse"===l)&&(j=e.width/2*m,k=e.height/2*n,d=Math.PI*(3*(j+k)-Math.sqrt((3*j+k)*(j+3*k))));return d||0}function e(a,c){if(!a)return[0,0];a=b(a),c=c||d(a)+1;var e=h(a),f=e.strokeDasharray||"",g=parseFloat(e.strokeDashoffset),i=f.indexOf(",");return 0>i&&(i=f.indexOf(" ")),f=0>i?c:parseFloat(f.substr(0,i))||1e-5,f>c&&(f=c),[Math.max(0,-g),Math.max(0,f-g)]}var f,g=_gsScope.document,h=g.defaultView?g.defaultView.getComputedStyle:function(){},i=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,j=-1!==((_gsScope.navigator||{}).userAgent||"").indexOf("Edge");f=_gsScope._gsDefine.plugin({propName:"drawSVG",API:2,version:"0.1.3",global:!0,overwriteProps:["drawSVG"],init:function(a,b,f,g){if(!a.getBBox)return!1;var i,k,l,m,n=d(a)+1;return this._style=a.style,"function"==typeof b&&(b=b(g,a)),b===!0||"true"===b?b="0 100%":b?-1===(b+"").indexOf(" ")&&(b="0 "+b):b="0 0",i=e(a,n),k=c(b,n,i[0]),this._length=n+10,0===i[0]&&0===k[0]?(l=Math.max(1e-5,k[1]-n),this._dash=n+l,this._offset=n-i[1]+l,this._addTween(this,"_offset",this._offset,n-k[1]+l,"drawSVG")):(this._dash=i[1]-i[0]||1e-6,this._offset=-i[0],this._addTween(this,"_dash",this._dash,k[1]-k[0]||1e-5,"drawSVG"),this._addTween(this,"_offset",this._offset,-k[0],"drawSVG")),j&&(m=h(a),k=m.strokeLinecap,"butt"!==k&&k!==m.strokeLinejoin&&(k=parseFloat(m.strokeMiterlimit),this._addTween(a.style,"strokeMiterlimit",k,k+1e-4,"strokeMiterlimit"))),!0},set:function(a){this._firstPT&&(this._super.setRatio.call(this,a),this._style.strokeDashoffset=this._offset,1===a||0===a?this._style.strokeDasharray=this._offset<.001&&this._length-this._dash<=10?"none":this._offset===this._dash?"0px, 999999px":this._dash+"px,"+this._length+"px":this._style.strokeDasharray=this._dash+"px,"+this._length+"px")}}),f.getLength=d,f.getPosition=e}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"function"==typeof define&&define.amd?define(["TweenLite"],b):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=b())}("DrawSVGPlugin");
/*!
 * jQuery Accordion 0.0.1
 * (c) 2014 Victor Fernandez <victor@vctrfrnndz.com>
 * MIT Licensed.
 */

;(function ( $, window, document, undefined ) {

    var pluginName = 'accordion',
        defaults = {
            transitionSpeed: 300,
            transitionEasing: 'ease',
            controlElement: '[data-control]',
            contentElement: '[data-content]',
            groupElement: '[data-accordion-group]',
            singleOpen: true
        };

    function Accordion(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Accordion.prototype.init = function () {
        var self = this,
            opts = self.options;

        var $accordion = $(self.element),
            $controls = $accordion.find('> ' + opts.controlElement),
            $content =  $accordion.find('> ' + opts.contentElement);

        var accordionParentsQty = $accordion.parents('[data-accordion]').length,
            accordionHasParent = accordionParentsQty > 0;

        var closedCSS = { 'max-height': 0, 'overflow': 'hidden' };

        var CSStransitions = supportsTransitions();

        function debounce(func, threshold, execAsap) {
            var timeout;

            return function debounced() {
                var obj = this,
                    args = arguments;

                function delayed() {
                    if (!execAsap) func.apply(obj, args);
                    timeout = null;
                };

                if (timeout) clearTimeout(timeout);
                else if (execAsap) func.apply(obj, args);

                timeout = setTimeout(delayed, threshold || 100);
            };
        }

        function supportsTransitions() {
            var b = document.body || document.documentElement,
                s = b.style,
                p = 'transition';

            if (typeof s[p] == 'string') {
                return true;
            }

            var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];

            p = 'Transition';

            for (var i=0; i<v.length; i++) {
                if (typeof s[v[i] + p] == 'string') {
                    return true;
                }
            }

            return false;
        }

        function requestAnimFrame(cb) {
            if(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) {
                return  requestAnimationFrame(cb) ||
                        webkitRequestAnimationFrame(cb) ||
                        mozRequestAnimationFrame(cb);
            } else {
                return setTimeout(cb, 1000 / 60);
            }
        }

        function toggleTransition($el, remove) {
            if(!remove) {
                $content.css({
                    '-webkit-transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing,
                    'transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing
                });
            } else {
                $content.css({
                    '-webkit-transition': '',
                    'transition': ''
                });
            }
        }

        function calculateHeight($el) {
            var height = 0;

            $el.children().each(function() {
                height = height + $(this).outerHeight(true);
            });

            $el.data('oHeight', height);
        }

        function updateParentHeight($parentAccordion, $currentAccordion, qty, operation) {
            var $content = $parentAccordion.filter('.open').find('> [data-content]'),
                $childs = $content.find('[data-accordion].open > [data-content]'),
                $matched;

            if(!opts.singleOpen) {
                $childs = $childs.not($currentAccordion.siblings('[data-accordion].open').find('> [data-content]'));
            }

            $matched = $content.add($childs);

            if($parentAccordion.hasClass('open')) {
                $matched.each(function() {
                    var currentHeight = $(this).data('oHeight');

                    switch (operation) {
                        case '+':
                            $(this).data('oHeight', currentHeight + qty);
                            break;
                        case '-':
                            $(this).data('oHeight', currentHeight - qty);
                            break;
                        default:
                            throw 'updateParentHeight method needs an operation';
                    }

                    $(this).css('max-height', $(this).data('oHeight'));
                });
            }
        }

        function refreshHeight($accordion) {
            if($accordion.hasClass('open')) {
                var $content = $accordion.find('> [data-content]'),
                    $childs = $content.find('[data-accordion].open > [data-content]'),
                    $matched = $content.add($childs);

                calculateHeight($matched);

                $matched.css('max-height', $matched.data('oHeight'));
            }
        }

        function closeAccordion($accordion, $content) {
            $accordion.trigger('accordion.close');
            
            if(CSStransitions) {
                if(accordionHasParent) {
                    var $parentAccordions = $accordion.parents('[data-accordion]');

                    updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '-');
                }

                $content.css(closedCSS);

                $accordion.removeClass('open');
            } else {
                $content.css('max-height', $content.data('oHeight'));

                $content.animate(closedCSS, opts.transitionSpeed);

                $accordion.removeClass('open');
            }
        }

        function openAccordion($accordion, $content) {
            $accordion.trigger('accordion.open');
            if(CSStransitions) {
                toggleTransition($content);

                if(accordionHasParent) {
                    var $parentAccordions = $accordion.parents('[data-accordion]');

                    updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '+');
                }

                requestAnimFrame(function() {
                    $content.css('max-height', $content.data('oHeight'));
                });

                $accordion.addClass('open');
            } else {
                $content.animate({
                    'max-height': $content.data('oHeight')
                }, opts.transitionSpeed, function() {
                    $content.css({'max-height': 'none'});
                });

                $accordion.addClass('open');
            }
        }

        function closeSiblingAccordions($accordion) {
            var $accordionGroup = $accordion.closest(opts.groupElement);

            var $siblings = $accordion.siblings('[data-accordion]').filter('.open'),
                $siblingsChildren = $siblings.find('[data-accordion]').filter('.open');

            var $otherAccordions = $siblings.add($siblingsChildren);

            $otherAccordions.each(function() {
                var $accordion = $(this),
                    $content = $accordion.find(opts.contentElement);

                closeAccordion($accordion, $content);
            });

            $otherAccordions.removeClass('open');
        }

        function toggleAccordion() {
            var isAccordionGroup = (opts.singleOpen) ? $accordion.parents(opts.groupElement).length > 0 : false;

            calculateHeight($content);

            if(isAccordionGroup) {
                closeSiblingAccordions($accordion);
            }

            if($accordion.hasClass('open')) {
                closeAccordion($accordion, $content);
            } else {
                openAccordion($accordion, $content);
            }
        }

        function addEventListeners() {
            $controls.on('click', toggleAccordion);
            
            $controls.on('accordion.toggle', function() {
                if(opts.singleOpen && $controls.length > 1) {
                    return false;
                }
                
                toggleAccordion();
            });
            
            $controls.on('accordion.refresh', function() {
                refreshHeight($accordion);
            });

            $(window).on('resize', debounce(function() {
                refreshHeight($accordion);
            }));
        }

        function setup() {
            $content.each(function() {
                var $curr = $(this);

                if($curr.css('max-height') != 0) {
                    if(!$curr.closest('[data-accordion]').hasClass('open')) {
                        $curr.css({ 'max-height': 0, 'overflow': 'hidden' });
                    } else {
                        toggleTransition($curr);
                        calculateHeight($curr);

                        $curr.css('max-height', $curr.data('oHeight'));
                    }
                }
            });


            if(!$accordion.attr('data-accordion')) {
                $accordion.attr('data-accordion', '');
                $accordion.find(opts.controlElement).attr('data-control', '');
                $accordion.find(opts.contentElement).attr('data-content', '');
            }
        }

        setup();
        addEventListeners();
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Accordion( this, options ));
            }
        });
    }

})( jQuery, window, document );
$(document).ready(function(){
	var $hamburger = $('.hamburger'),
		$buttonLabel = $('.buttonLabel'),
		$buttonWrapper = $('.buttonWrapper'),
		$menu = $('.menu'),
		$rsvp = $('.rsvp'),
		$mainNav = $('.mainNav li'),
		$mainNavChildren = $mainNav.children('a');

		$hamburger.on('click', function(e){
		$hamburger.toggleClass('is-active');
		$buttonLabel.toggleClass('buttonLabelClose');

		if ($hamburger.hasClass('is-active')){
			$menu.addClass('menu-is-open');

			// Stagger animation for menu
			$mainNavChildren.each(function(i){
				$(this).stop(true, true).delay((i + 1) * 125).fadeIn('slow', 'swing');
			});

			/*
				Hides menu on link click but I'm still working out 
				on how to hide the menu after RSVP click
			*/
			$mainNavChildren.on('click', function(e){
				e.preventDefault();

				var hash = $(this.hash);

				$('html, body').animate({
					scrollTop: hash.offset().top - 25
				}, 450, function(){
					closeMenu();
					$hamburger.removeClass('is-active');
					$buttonLabel.removeClass('buttonLabelClose');
				});
			});

			$rsvp.fadeOut();
		} else{
			closeMenu();
		};

	});

	function closeMenu() {
		$menu.removeClass('menu-is-open');
		$mainNavChildren.stop(true, true).fadeOut();
		$rsvp.fadeIn();

	};

	//Controller for menu colour switch on scroll

	var waypoint = new Waypoint({
		element: $('#intro'),
		handler: function(direction){
			if (direction === "down"){
				$buttonWrapper.addClass('buttonWrapperBlack');
			} else{
				$buttonWrapper.removeClass('buttonWrapperBlack');
			}
		},
		offset: 75
	});

	//Deals with FAQ accordion
	$('.accordion').accordion({
	    "transitionSpeed": 400
	});
});

$(window).on('load', function(){
	$('.loader').hide().delay(2, function(){
		homeAnimation();
	})
});

var $ampersand = $('.ampersand'),
	$menuItems = $('.hamburger, .rsvp')
	$mouseScroll = $('.icon-scroll');


var tl = new TimelineMax();
tl.set($ampersand, {fill:"none", stroke: "#50E3C2", opacity: "1"}).set('.us', {autoAlpha:0}).set($menuItems, {autoAlpha:0}).set($mouseScroll, {autoAlpha:0});

function homeAnimation(){
	tl.to('.us', 2, {autoAlpha:1})
	.from('.marcio', 1, {opacity:0}, "+=0.7")
	.from($ampersand, 3, {drawSVG:0})
	.to($ampersand, 0.2, { fill: "#50E3C2", strokeWidth:0}, "-=1")
	.to($ampersand, 0.1, {opacity:"0.44"}, "-=1")
	.from('.michelle', 1, {opacity:0})
	.to($mouseScroll, 0.2, {autoAlpha:1})
	.to($menuItems, 0.2, {autoAlpha:1}, "+=0.2");
}





