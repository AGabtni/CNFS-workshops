// JavaScript Document

/*
  This script handles the local navigation for the Visez juste website.
  It does two things:
  1) Creates 'Précédant' and 'Suivant' links at the top and the bottom of the page.
  2) Applies the 'active' class to the link to the current page 
  in the local navigation and make the link inactive.
  (At the time of this writing, that navigation was on the right-hand side of the screen.)
*/


(function($){

    
    $.fn.breadcrumbs = function(opts){

	var options = $.extend({}, $.fn.breadcrumbs.defaults, opts);

	return $(this).each(function(){
	    closeNonParentLinks(this, options);
	    $makeBreadcrumbs(this, options).appendTo(options.bread_crumbs_holder_selector);
	    $makeNextPrevious(this, options).appendTo(options.prev_next_holder_selector);
            linkTextNodes(this, options);
	    markCurrentLink(this, options);
	});

	function $getCurrentLinkInElement(container){
	    // All pages within a section have a unique name, so we can simply find the last
	    // index of '/' and then grab everything after it.
	    var page_ref = location.href.substring(location.href.lastIndexOf('/') + 1);
	    // Strip off '#[...]' (in-page anchors/processing directives)
	    page_ref = page_ref.split('#')[0];
            // Find the link with the href matching page_ref.
            // The *last one* is should be our link.
            // Note that 'linkTextNodes' puts links around text nodes
            // and these links have the same hrefs as other links.
            // In those cases, the *last link* is always the one we want.
            var $current_link = $(container).find('a[href="' + page_ref + '"]').last();
	    return $current_link;
	}

	function markCurrentLink(container, options){
	    //Adds specified class to the current link.
	    $curr_a = $getCurrentLinkInElement(container);
	    $curr_a.parent('li').andSelf().addClass(options.current_link_class_name);
	    $curr_a.parentsUntil('#section-nav').filter('li').find('a:first').addClass(options.current_link_parent_class_name);
	}

	function closeNonParentLinks(container, options){
	    //In a group of nested <ul>'s containing links
	    //this function hides the links that aren't parents of the current link
	    var $curr_a = $getCurrentLinkInElement(container);
	    if($curr_a.length === 0){
		return;
	    }
	    $c = $(container);
	    if($curr_a.length === 0){
		return;
	    }
	    $c.find('ul').hide();
	    //Show all the 'ul' parents of the current link
	    $curr_a.parents().filter('ul').show();
	    //Show the first 'ul' in the current link's 'li'
	    $curr_a.parent('li').find('ul:first').show();
	    $curr_a.parent('li').find('li').addClass(options.current_link_children_class_name);
	}

        function linkTextNodes(container, options) {
            // In the case of
            /*
              <ul>
                <li>Unit 1 // no link on parent
                  <ul>
                    <li><a href="1_1.html">Unit 1.1</a></li>
                    <li><a href="1_2.html">Unit 1.2</a></li>                 
                  </ul>
                </li>
              </ul>
            */
            // it's convenient for the user to be able to click on the
            // 'Unit 1' link and go to Unit 1.1's href.
            // This function wraps 'Unit 1' in such a link.
            var $textNodes = getTextNodesIn(container);
            $textNodes.each(function(){
                var $node = $(this);
                var href = $node.nextAll().find('a').eq(0).attr('href');
                if (href) { $node.wrap('<a href="' + href + '">'); }
            });
        }
	
        function getTextNodesIn(container){
            // Returns unwrapped text nodes in the passed container.
            // Contents(), will give just child nodes.
            // Find(), gives all descendant elements but no text nodes.
            var TEXT_NODE_TYPE = 3;
            return $(container).find(":not(a, iframe)").andSelf().contents().filter(function() {
                return this.nodeType == TEXT_NODE_TYPE && !strIsWhitespace(this.nodeValue);
            });
        }

        function strIsWhitespace(str) {
            var nonwhitespace = /.*\S/;
            return !nonwhitespace.test(str);
        }

	function $makeBreadcrumbs(container, options){
	    // Just like it says on the tin,
	    // this function creates a breadcrumb list from 
            // the links in container.
	    var $curr_a = $getCurrentLinkInElement(container);
	    if($curr_a.length == 0){
		return $();
	    }
	    var $lis = $curr_a.parents('li');
	    var $a = $lis.find('a:first');
	    var $as = $a.clone().reverse().truncateText(options.breadcrumbs_max_chars, options.truncated_breadcrumbs_suffix);
	    $as = $wrapBreadcrumbs($as, options);
	    return $as.not($as.last()).add('<span>' + $curr_a.text() + '</span>');
	}

	function $wrapBreadcrumbs($crumbs, options){
	    //This function wraps each of the "crumbs" in the elements specified in options.
	    //Have to create a temporary holder, as wrap doesn't return
	    //the wrapped elements, rather only the original ones.
	    var $div = $('<div>');
	    $crumbs.appendTo($div)
		.not($crumbs.last())
		.each(function(){
		    $(this).after(options.breadcrumbs_separator)})
		    .wrap(options.breadcrumbs_wrapper)
		.end().last()
		.wrap(options.breadcrumbs_wrapper_last);
	    return $div.contents();
	}

	function $makeNextPrevious(container, options){
	    var $a = $(container).find('a');
	    var index = $a.index($getCurrentLinkInElement(container));
	    var $prev_next = $('<div>');

	    //Get the previous and next links in the list.
	    if(index !== 0){
		var $prev = $a.eq(index - 1).clone();		 
		if($prev.length !== 0){
		    $prev.appendTo($prev_next).addClass(options.prev_class_name)
			.attr('title', $prev.text()).text(options.prev_text);
		}
	    }

	    var $next = $a.eq(index + 1).clone();
	    if($next.length !== 0){
		$next.appendTo($prev_next).addClass(options.next_class_name)
		    .attr('title', $next.text()).text(options.next_text);
	    }
	    return $prev_next.contents();
	}
    };


    $.fn.reverse = [].reverse;

    $.fn.truncateText = function(max_chars, suffix){
	return this.each(function(){
	    var suf = suffix || '';
	    var text = $(this).text();
	    if(max_chars !== undefined && text.length > max_chars){
		$(this).attr('title', text)
		    .text(text.substr(0, max_chars) + suf);
	    }
	});
    };

    $.fn.breadcrumbs.defaults = {
	current_link_class_name : 'current', //class name to add to link whose href's LAST element matches the LAST element of the location
	current_link_parent_class_name: 'current-parent', //class name to add to link's parent li's
	current_link_children_class_name : 'current-child', //class name to add to li's that are children of the current link
	bread_crumbs_holder_selector : '#breadcrumbs, #breadcrumbs2',
	prev_next_holder_selector : '#prev-next, #prev-next2',
	next_text : 'next →',
	prev_text : '← prev',
	prev_class_name: 'prev',
	next_class_name: 'next',
	breadcrumbs_max_chars: 10,
	truncated_breadcrumbs_suffix:'...',
	breadcrumbs_wrapper:'',
	breadcrumbs_separator:' » ',
	breadcrumbs_wrapper_last:''
    };

})(jQuery);



