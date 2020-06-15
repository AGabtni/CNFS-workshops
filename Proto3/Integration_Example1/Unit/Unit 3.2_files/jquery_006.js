/*Creates a tooltip based on the title attibute of the passed element*/

(function($){
	//originale 300
    var BUBBLE_WIDTH = 520;
    var BUBBLE_OFFSET_Y = -25;

    var tips = [];

    var template = '<div class="gritter-item-wrapper">' +
	    '  <div class="tooltip-tongue"></div>' +
	    '  <div class="tooltip-wrapper">' +
	    '  <div class="gritter-top"></div>' +
	    '  <div class="gritter-item">' +
	    '    <div class="gritter-without-image">' +
	    '      <div class="content"></div>' +
	    '    </div>' +
	    '    <div style="clear: both;"></div>' +
	    '  </div>' +
	    '  <div class="gritter-bottom"></div>' +
	    '</div>' +
	    '</div>';

    function Tip(el) {
        this.init(el);
    }

    Tip.prototype = {
        anchor : undefined,
        bubble : undefined,
        text : undefined,
        accessibilityText : undefined,
        mouseInTongue : false,
        mouseInBubble : false,
        show : function(){
            if (this.bubble) return;
            tips.forEach(function(tip){tip.hide();});
            this.makeBubble();
            this.positionBubble();
            $(this.bubble).css({'z-index': 6}).hide().fadeIn();
        },
        hide : function(){
            if (!this.bubble) return;
            var bubble = this.bubble;
            this.bubble = undefined;
            $(bubble).fadeOut(function(){$(bubble).remove();});
        },
        makeAccessibilityHelper : function(el){
 	    this.accessibilityText = $('<div class="ui-helper-hidden-accessible">(' + this.text + '\)</div>').insertAfter(el).get(0);
            this.emulateLinkFocus();
        },
        emulateLinkFocus : function() {
            // Emulate focus on bubble links.
            // They don't receive focus because they're appended to 'body' 
            // and so they're out of source order.
            // The hidden links in accessibilityText receive focus,
            // and accessibilityText is the same as bubble's text.
            // When a link in accessibilityText receives focus,
            // we'll highlight the corresponding link in the bubble.
            var that = this;
            var $anchor = $(this.anchor);
            var $accessibilityText = $(this.accessibilityText);
            var removeLinkFocus = function() {
                $(that.bubble).find('a').removeClass('focus');
            };
            $anchor.focus(function(){
                removeLinkFocus();
            });
            $accessibilityText.find('a').focus(function(){
                that.show();
                var $accessibilityLinks = $accessibilityText.find('a');
                var linkIndex = $accessibilityLinks.index(this);
                if (that.bubble) {
                    removeLinkFocus();
                    $(that.bubble).find('a').eq(linkIndex).addClass('focus');
                }
            });
        },
        makeAnchor : function(el) {
            var $el = $(el);
            //Remove the title attribute to avoid the native tooltip from the browser ...
            $el.removeAttr('title');
	    //but insert the text after the element for accessibility.
            this.anchor = $el.get(0);
            this.makeAccessibilityHelper(el);
            this.setupAnchorEvents();
            $el.attr("tabindex", 0);
            return this.anchor;
        },
        setupAnchorEvents : function(){
            var $anchor = $(this.anchor);
            var that = this;
	    $anchor.mouseover(function(){that.show();});
            $anchor.focus(function(){that.show();});
            $anchor.click(function(e){e.preventDefault();});
        },
        makeBubble : function() {
	    var $bubble = $(template);
	    $bubble.find('.content').html(this.text);
	    $bubble.appendTo('body');
            $bubble.hide();
            var that = this;
            this.bubble = $bubble.get(0); 
            this.setupBubbleEvents();
            return this.bubble;
        },
        setupBubbleEvents : function() {
            var that = this;
            var mouseIsOut = function() {
                return !(that.mouseInBubble || that.mouseInTongue);
            };
            var hideIfOut = function() {
                setTimeout(function(){if (mouseIsOut()) that.hide();}, 10);
            };
            var $bubble = $(this.bubble);
            $bubble.find('.tooltip-tongue').mouseout(function(e){
                that.mouseInTongue = false;
                hideIfOut();
            }).mouseover(function(){
                that.mouseInTongue = true;
            });
            $bubble.find('.tooltip-wrapper').mouseout(function(e){
                that.mouseInBubble = false;
                hideIfOut();
            }).mouseover(function(){
                that.mouseInBubble = true;
            });
            $(document).keyup(function(e) {
                if (e.keyCode == 13) { $('.save').click(); }     // enter
                if (e.keyCode == 27) { $('.cancel').click(); }   // esc
            });
        },
        positionBubble : function() {
            var offset = $(this.anchor).offset();
            $(this.bubble).css({'top': offset.top + BUBBLE_OFFSET_Y,
                      'left': offset.left - BUBBLE_WIDTH/2,
                      'position': 'absolute',
                      'width': BUBBLE_WIDTH});
        },
        init : function(el){
            this.text = $(el).attr('title');
            this.makeAnchor(el);
            tips.push(this);
        }
    };

    function setupHideOnEscapeKeyUp() {
        // We want to dismiss all tips when "esc" is pressed.
        // We just need a single listener for an arbitrary x number of tips.
        $(document).keyup(function(e) {
            var escape_key_code = 27;
            if (e.keyCode == escape_key_code) { 
                tips.forEach(function(tip){tip.hide();}); 
            }
        });
    }

    setupHideOnEscapeKeyUp();

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            'use strict';
            var i, len;
            for (i = 0, len = this.length; i < len; ++i) {
                if (i in this) {
                    fn.call(scope, this[i], i, this);
                }
            }
        };
    }

    $.fn.tooltip = function(options){
	return this.each(function(options){
            new Tip(this);
	});
    };
    
})(jQuery);