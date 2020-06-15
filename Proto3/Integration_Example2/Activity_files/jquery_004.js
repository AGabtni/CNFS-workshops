/**
 * jQuery.wordQuiz
 * Copyright (c) 2010 Steve Rokeby | steve.rokeby(at)gmail(dot)com 
 * MIT Licensed
 * Thanks to the Centre for e-Learning at the University of Ottawa
 * for allowing me the time to work on this code. 
 * Date: 03/03/2010
 * 
 * @projectDescription Easy transformation of static HTML to interactive quiz
 * Works with jQuery +1.4.1 Tested on Firefox 3, IE 6/7/8, Safari 3, Chrome 5 beta
 * 
 * @author Steve Rokeby
 * @version 1.0.1
 * 
 * @id jQuery.wordQuiz
 * @id jQuery.fn.wordQuiz
 * @return {jQuery} Returns the same jQuery object, for chaining
 * 
 * @param {Object} options object. See $.fn.wordQuiz.defaults for details.
 * 
 * @dec Create quizzes from all divs using default options
 * @example $('div').wordQuiz();
 * 
 * @dec Create quizzes from all divs with 'quiz' class using some option overrides
 * @example $('div.quiz').wordQuiz({'correct_icon_html':'Good job, you are right! '});
 *
 * @requires jQuery
 */

(function( $ ){
      var cache = {};	  

      /**
       * _tmpl 
       <p>MIT Licensed</p>
       <p>Creates a template function based on the passed string and, if passed, 
       returns the results of the function using 'data' as the parameter</p>
       <p>Code originally posted here: http://ejohn.org/blog/javascript-micro-templating/</p>
       * @function _tmpl
       * @returns {Function} The template function
       * @returns {String} An HTML string
       * @author John Resig http://ejohn.org/
       * @private
       * 
       */
      function _tmpl(str, data){

	  var fn = cache[str] = cache[str] ||
	   
	  // Generate a reusable function that will serve as a template
	  // generator (and which will be cached).
	  new Function("obj",
		       "var p=[],print=function(){p.push.apply(p,arguments);};" +
		       
		       // Introduce the data as local variables using with(){}
		       "with(obj){p.push('" +
		       
		       // Convert the template into pure JavaScript
		       str
		       .replace(/[\r\t\n]/g, " ")
		       .split("<%").join("\t")
		       .replace(/((^|%>)[^\t]*)'/g, "$1\r")
		       .replace(/\t=(.*?)%>/g, "',$1,'")
		       .split("\t").join("');")
		       .split("%>").join("p.push('")
		       .split("\r").join("\\'")
		       + "');}return p.join('');");
	  // Provide some basic currying to the user
	  return data? fn( data ) : fn;
      }

      /**
       * _c
       <p>Simple Firebug (http://getfirebug.com/) logging function</p>
       <p>Function checks if Firebug console is available. If it
       is, msg is logged to it.
       * @function _c
       * @param {msg} msg The message to log.
       * @returns nothing
       * @private
       */

      function _c(){	  
	  if (window.console && window.console.log){   
	      window.console.log(arguments);
	  }
      }

     /**
      * $.fn.iterTriggerHandler
      * 
      * Extends jQuery. Calls to triggerHandler only trigger the first
      * element in a jQuery collection. This simply loops through all of the elements
      * in the collection and calls triggerHandler on them, then returns the collection.
      * 
      * @returns jQuery object for chaining
      *   
      */

     $.fn.iterTriggerHandler = function(msg){
	return this.each(function(){
			     $(this).triggerHandler(msg);
			 }); 
     };

     /**
      * $.fn.wordQuiz
      * 
      * Extends jQuery. Calls such as $('.some-selector').wordQuiz()
      * will create a new wordquiz from elements matched by .some-selector.
      * 
      * @returns jQuery object for chaining
      * 
      */

      $.fn.wordQuiz = function(options){
	  
	  return this.each(function(){
			       /*
				* Code below could be used as a method call 
				* on an already-created quiz. 
				* There's currently no need for this,
				* I'm leaving the code for future development.
				if(typeof options == 'string'){
				var quiz = $.data(this, 'word-quiz');
				quiz[options].apply(quiz, options);
				//INIT with options
				}else 
				*/

			       //If the quiz already exists on this element, don't create it again.
			       if($(this).data('word-quiz') == undefined){
				   $.data(this, 'word-quiz', new $.fn.wordQuiz.Quiz(this, options));
			       }else{
				   _c('Wordquiz was already created on this element.');
			       }
			   });
      };

      /**
       * $.fn.wordQuiz.Quiz
       * This is the element created on each element passed in by wordQuiz.
       * It serves as a wrapper for creating questions, buttons, and feedback 
       * from the HTML elements it contains. It's is also responsible for 
       * scoring the questions.
       * @class
       * @param container {DOMElement} The DOM element to modify and add methods to.
       *     It should hold question elements, identified by the 'question_selector'
       *     property specified in $.fn.wordQuiz.defaults, or in the passed options. 
       * @param options {Object} The options passed to the object. These will override the default
       *     properties in $.fn.wordQuiz.defaults 
       */ 
      $.fn.wordQuiz.Quiz = function(container, options){
	  // build main options
	  this.options = options = $.extend({}, $.fn.wordQuiz.defaults, options);
	  this.element = container;	 

	  //Add score keeper functionality to our Quiz
	  $.extend(this, $.fn.wordQuiz._score_keeper);
          this.init();

	  //Add capability to post
	  $.extend(this, $.fn.wordQuiz._poster);
	  this.init();

	  //Add messenger functionality to our Quiz
	  $.extend(this, $.fn.wordQuiz.messenger);

	  //Grab a temporary reference (Creating jQuery objects is expensive.)
	  var $c = $(container);

	  //Add 'd-link' to reset HTML on '.subscriber'
	  $(options.d_link_html).prependTo(container)
	      .find('a').bind('click submit', function(e){
				  e.preventDefault();
				  $c.find('.subscriber').iterTriggerHandler('reset-html');
			      });

	  //Make feedback
	  $c.find(options.feedback_selector).wordFeedback();
	  
	  //Make questions
	  $c.find(options.question_selector).wordQuestion(options);

	  //Questions are created, trigger 'get-score' to count the questions
	  //and update scoreboard.
	  $c.iterTriggerHandler('get-score');
	  
	  //Create buttons. BroadcastButtons take a 'context' element.
	  //See BroadcastButtons class for details.
	  var broadcaster_button_options = $.extend({}, options , {'context':this.element});
	  $c.find(this.options.broadcaster_button_selector).each(function(){
								     $.data(this, 'broadcaster-button', new $.fn.wordQuiz.BroadcasterButton(this, broadcaster_button_options));
								 });	 
      };

     /**
      * 
      * $.fn.wordQuiz.messenger
      * 
      * This is just a wrapper for getting messages on the screen.
      * Needs to be overwritten by your application.
      * 
      */
      $.fn.wordQuiz.messenger = {
	  _tmplMessage : function(msg, data){
	      var _msg = {};
	      for(var i in msg){
		  if(typeof msg[i] === 'string'){
		      _msg[i] = _tmpl(msg[i], data);		      
		  }
	      }
	      this.addMessage(_msg);
	  },

	  //Overwrite this ...
	  addMessage : function(msg){
	      
	  }
      };


     /**
      * $.fn.wordQuiz._poster
      * <p>_poster collects info from the Questions and posts it to a URL
      * Like _score_keeper, it is extended into instances of Quiz.</p>
      */
     
     $.fn.wordQuiz._poster = {
	 init:function(){
	     var $e = $(this.element);
	     var $form = $e.find('form');
	     $e.bind('post', function(){
			 var serial_data;
			 if($.fn.wordQuiz._poster.serialize){
			     serial_data = $.fn.wordQuiz._poster.serialize($form.get(0));
			 }else{
			     serial_data = $form.serialize();
			 }
			 $.post($.fn.wordQuiz._poster.post_url, serial_data);
			 _c(serial_data);
		     });
	 }
     },
     
     $.fn.wordQuiz._poster.post_url = "test.php";

     /*
      //This function will be used to serialize the form data.
      //If it doesn't exist, it'll be 
     $.fn.wordQuiz._poster.serialize = function(form){
	return $(form).find('.post input:checked');
     };
     */

     /**
      * $.fn.wordQuiz._score_keeper
      * <p>_score_keeper is a 'private' object that contains
      * methods allowing a Quiz to keep score of its questions.
      * The methods of _score_keeper are extended 'into' 
      * instances of Quiz.</p>
      * @private 
      */
      $.fn.wordQuiz._score_keeper = {
	  /** @lends _score_keeper **/
	  init : function(){
	      var $e = $(this.element),
	      _scoreTimer,
	      that = this;
	      
	      // 'request-rescore': This custom event is bubbled up 
	      // from scored items when they've 
	      // changed, making a rescore necessary.
	      // 
	      // In the case of an event that works on 
	      // all questions, e.g., 'restart',
	      // each question will bubble 'request-rescore'. 
	      // For this reason, a short-running
	      // timer will keep us from executing 'get-score' excessively.
	      $e.bind('request-rescore', function(){
			  clearTimeout(_scoreTimer);
			  _scoreTimer = setTimeout(function(){$e.iterTriggerHandler('get-score');}, 200);
		      });

	      //Normally, broadcast from a button
	      $e.bind('get-score', {}, function(){
			  var score = that.getScore();
			  $(this).data('score', score);
			  that.updateScoreboard();
			  //If user has 100%, show congratulations message.
			  if(score.total == score.correct){
			      that._tmplMessage(that.options.word_quiz_finished_message, score);
			  }
		      });

	      //Normally, broadcast from a button
	      $e.bind('check-answers', {}, function(){
			  $(this).triggerHandler('get-score');
			  that._tmplMessage(that.options.word_quiz_check_answers_message, $(this).data('score'));
		      });
	  },



	  /**
	   * 
	   * getScore
	   * 
	   * Find all '.scored-item' and total their scores. 
	   * We're going to total a few different things:
	   *   * Number of questions
	   *   * Number of questions correct
	   *   * Number of questions by type
	   *   * Number of questions correct by type
	   *
	   * @returns an object whose properties contain the various totals
	   *
	   */

	  getScore: function(){
	      // Add up the score on this object.
	      var score_obj = {correct:0, total:0};

	      $(this.element).find('.scored-item').each(function(){
							    var data = $(this).data();
							    var type = data.type;
							    score_obj.correct += data.correct || 0;
							    score_obj.total += data.total || 1;
							    if(type){
								if(!score_obj[type + '_correct']){score_obj[type + '_correct'] = 0;}
								if(!score_obj[type + '_total']){score_obj[type + '_total'] = 0;}
								score_obj[type + '_correct'] += data.correct || 0;
								score_obj[type + '_total'] += data.total || 1;
							    }
							});
	      return score_obj;
	  },

	  propertyNameToScoreboardClassName:function(pn){
	      return this.options.scoreboard_selector + '-' + (pn.split('_').join('-'));
	  },
	  
	  updateScoreboard:function(){
	      // This works by transforming property names on 
	      // the score object to class names, then finding
	      // the DOM elements with those class names and setting 
	      // their text equal to the property value:
	      // i.e., score_obj.multiple_choice_total = 4
	      // will set the text of <span class="wordscoreboard-multiple-choice-total"></span>
	      // to '4'.
	      var $e = $(this.element),
	      score_obj = $e.data('score');
	      for(var i in score_obj){
		  if (score_obj.hasOwnProperty(i)){
		      var className = this.propertyNameToScoreboardClassName(i);
		      var score = score_obj[i] || 0;
		      $e.find(className).html(score);
		  }
	      }
	  }
      };


      /**
       * wordQuiz.defaults
       */
      $.fn.wordQuiz.defaults = {
	  word_quiz_finished_message: {title:'Good job!', text:'You have completed the quiz.'},
	  word_quiz_check_answers_message: {title:'Score', text:'<%=correct%>/<%=total%>'},
	  question_selector: '.wordquestion', //jQuery selector string for the quiz's questions
	  feedback_selector: '.wordfeedback', //jQuery selector string for the quiz's feedback
	  scoreboard_selector: '.wordscoreboard', //jQuery selector string for the quiz's scoreboard
	  broadcaster_button_selector: 'button', //jQuery selector string for the quiz's buttons
	  broadcaster_button_message_css_class_stub: 'wordquiz-', //Note: no "." prefix, see BroadcasterButton for details
          d_link_html: '<div class="ui-helper-hidden-accessible"><a href="#">Plain HTML</a> ' +
		       'This exercise uses JavaScript to display and hide content. ' +
		       'If you wish to see the plain HTML of the exercise, please ' +
		       'click the "Plain HTML" link.</div>', 
	               //HTML a d-Link, which resets the questions' HTML when clicked. It should contain at least one
	               //empty '<a href="#">' which will be modified to trigger the reset.
          correct_icon_html: '<strong style="color:#009900;">Correct</strong> ', //Icon HTML string to be used in question templates.
          incorrect_icon_html: '<strong style="color:#990000;">Incorrect</strong> ', //Icon HTML string to be used in question templates.
	  type:'find' //Default question type, assuming no other type is specified.
      };


      /**
       * $.fn.wordQuiz.BroadcasterButton
       * This element is created by a Quiz instance on each of its elements
       * that match the broadcaster_button_selector (default is 'button').
       * 
       * This class adds a few methods to the 'container' DOM element that's passed
       * in on instantiation. These boil down to this: On click, the button searches its
       * 'context' for '.subscriber' instances. On each of these instances, it triggers
       * a custom event, or events, whose names are stored in 'this.messages'. The names
       * themselves are derived from the classes of the button instance itself. This is more easily
       * understood with an example:
       * 
       * Clicking on <button class="game-show-all" /> will find all '.subscriber' DOM elements and
       * trigger their 'show-all' events, if they exist.
       * 
       * @class
       * @param container {DOMElement} The DOM element to modify and add methods to.
       *     It should hold question elements, identified by the 'broadcaster_button_selector'
       *     property specified in $.fn.wordQuiz.defaults, or in the passed options. 
       * @param options {Object} Of particular note here is the 'context' property
       *     It sets the context in which the button will search for '.subscriber' instances. 
       *     In most cases, this should be the 'Quiz' this button instance is contained within.
       *     Another important parameter is broadcaster_button_message_css_class_stub. It
       *     specifies the classes that are the messages we should broadcast. For example,
       *     if 'game-' is the stub, we'll identify 'game-show-all' as a class containing
       *     a message and broadcast 'show-all' when clicked. 
       * 
       */ 
      $.fn.wordQuiz.BroadcasterButton = function(container, options){	 
	  this.element = container;
	  this.context = options.context;
	  this.selector_stub = options.broadcaster_button_message_css_class_stub;
	  this.messages = [];
	  
	  this.init = function(){
	      this.messages = this.getMsgsFromCssClass();
	      var that = this;
	      $(this.element).bind('click submit', function(){that.broadcast();});
	  };

	  this.getMsgsFromCssClass = function(){
	      var classes=$(this.element).attr('class').split(' ');
	      var msgs = [];
	      for (var i = 0; i < classes.length; i+=1){
		  var this_class = classes[i];
		  if(this_class.indexOf(this.selector_stub) === 0){
		      msgs.push(this_class.substr(this.selector_stub.length));
		  }
	      }
	      return msgs;
	  };

	  this.broadcast = function(){
	      var msg_len = this.messages.length;
	      for(var i = 0; i < msg_len; i ++){
		  var msg = this.messages[i];
		  $(this.context).find('.subscriber').iterTriggerHandler(msg);

		  // Trigger the message on the 'context' after 
		  // the 'subscribers', in most cases it's the 
		  // containing 'Quiz'. This allows us to tell
		  // our questions to run their 'score' methods, 
		  // then our Quiz can receive the same 'score' 
		  // method and total the individual questions' 
		  // scores.
		  $(this.context).iterTriggerHandler(msg);
		  _c('Broadcast: ' + msg);
	      }
	  };

	  this.init();
	  
      };



      /** 
       * @id jQuery.wordFeedback
       * @id jQuery.fn.wordFeedback
       * @return {jQuery} Returns the same jQuery object, for chaining
       * 
       * @param {Object} options Currently, nothing is done with the passed
       * options, but they are kept in place for future development.
       * 
       * @dec Create feedback from all divs with the class 'feedback' using default options
       * @example $('div.feedback').wordFeedback();
       * 
       * @requires jQuery
       */

      $.fn.wordFeedback = function(options){
	  //Allows for an arbitrary number of passed args, converting them to an array.
	  var args = Array.prototype.slice.call(arguments, 1);
	  
	  return this.each(function(){
			       $.data(this, 'word-quiz-feedback', new $.fn.wordFeedback.Feedback(this, options));
			   });
      };
      
      /**
       * $.fn.wordFeedback.Feedback
       * This is a simple class. Its only job is to listen for a few custom
       * events and hide and show its DOM element accordingly.
       * @class
       * @param container {DOMElement} The DOM element to modify and add methods to.
       *     It should hold question elements, identified by the 'question_selector'
       *     property specified in $.fn.wordQuiz.defaults, or in the passed options. 
       * @param options {Object} The options passed to the object. These will override the default
       *     properties in $.fn.wordFeedback.defaults 
       */ 

      $.fn.wordFeedback.Feedback = function(container, options){
	  
	  // setup configuration
	  this.options = options = $.extend({}, $.fn.wordFeedback.defaults, options);
	  this.element = container;
	  $.extend(this, $.fn.wordFeedback.Feedback.animations);
	  $(this.element).addClass('default-feedback');
	  
	  this.init = function(){
	      var that = this;
	      $(this.element).hide()
		  .addClass('subscriber') // Listen for BroadcasterButton events
		  .bind('show-feedback reset-html', function(){that.show();})
		  .bind('hide-feedback', function(){that.hide();})
	          .bind('restart', function(){that.hide();});
	  };
	  
	  this.init();
      };

     /**
      * Overwritable
      */
      $.fn.wordFeedback.Feedback.animations = {
	  hide:function(){$(this.element).slideUp();},
	  show:function(){$(this.element).slideDown();}
      };

      $.fn.wordFeedback.Feedback.defaults={};


      /** 
       * @id jQuery.wordQuestion
       * @id jQuery.fn.wordQuestion
       * @return {jQuery} Returns the same jQuery object, for chaining
       * 
       * @param {Object} options Not many options are implemented for the moment.
       * Of particular interest is options.type, which specifies the type of question
       * we're going to create. 
       * 
       * @dec Create feedback from all divs with the class 'feedback' using default options
       * @example $('div.question').wordQuestion();
       * 
       * @requires jQuery
       */

      $.fn.wordQuestion = function(options){
	  return this.each(function(){
			       if($(this).data('word-quiz-question') == undefined){
				   $.data(this, 'word-quiz-question', new $.fn.wordQuestion.Question(this, options)); 
			       }else{
				   _c('wordQuestion has already been called on this object.');
			       }
			   });
      };


      /**
       * @id $.fn.wordQuestion.Question
       * @class
       * @param container {DOMElement} The DOM element to modify and add methods to.
       *     It should hold question elements, identified by the 'question_selector'
       *     property specified in $.fn.wordQuiz.defaults, or in the passed options. 
       * @param options {Object} The options passed to the object. These will override the default
       *     properties in $.fn.wordQuestion.defaults 
       * @requires jQuery 
       */ 

      $.fn.wordQuestion.Question = function(container, options){
	  //setup configuration
	  this.options = options = $.extend({}, $.fn.wordQuestion.defaults, options);
	  this.element = container;
	  //Add 'base' question methods and initialize
	  $.extend(this, $.fn.wordQuestion.types.base);
	  this._init();

      };

      $.fn.wordQuestion.defaults = {
	  getCorrectAnswers:function(el){return $(el).find('ins').get()},
	  getIncorrectAnswers:function(el){return $(el).find('del').get()},
      };


      /**
       * @id $.fn.wordQuestion._getLatestId
       * @returns {Number} This is a simple counter function, to be used
       * in cases where we need unique id's for elements, say, radio button groups,
       * or form labels.
       * @private 
       */
      $.fn.wordQuestion.latest_id = -1;

      $.fn.wordQuestion._getLatestId = function(){
	  $.fn.wordQuestion.latest_id += 1;
	  return $.fn.wordQuestion.latest_id;
      };






      /**
       * types holds the methods and properties
       * for each type of question.
       * @type object
       */
      
      $.fn.wordQuestion.types = { 

	  /**
	   * base: All questions receive the properties and methods
	   * of base. In addition, base's _init function is called 
	   * when the question is instantiated. 
	   */
	  base:{

	      _init:function(){
		  var $e = $(this.element);
		  $e.data('html', $e.html())
		      .data('correct', 0)
		      .data('type', this.options.type);
		  this.subscribe();
		  if($.fn.wordQuestion.types.hasOwnProperty(this.options.type)){
		      $.extend(this, $.fn.wordQuestion.types[this.options.type]);
		  }else{
		      _c('wordQuestion: Attempting to extend a question, but ' + this.options.type + ' does not exist.');
		  }
		  if(typeof this.init === 'function'){
		      this.init();
		  }
	      },

	      getCorrectAnswers:function(el){
		  return this.options.getCorrectAnswers(el);
	      },

	      getIncorrectAnswers:function(el){
		  return this.options.getIncorrectAnswers(el);
	      },

	      getCorrectAnswersText:function(el){
		  var arr =  this.getCorrectAnswers(el);
		  for (var i = 0; i < arr.length; i++){
		      arr[i] = $(arr[i]).text();
		  }
		  return arr;
	      },

	      getIncorrectAnswersText:function(el){
		  var arr =  this.getIncorrectAnswers(el);
		  for (var i = 0; i < arr.length; i++){
		      arr[i] = $(arr[i]).text();
		  }
		  return arr;
	      },
	      
	      subscribe:function(){
		  var that = this;
		  var $e = $(this.element);
		  $e.addClass('scored-item'); //Allows our 'quiz' to contact us.
		  $e.addClass('subscriber'); //Allows us to receive notifications from BroadcastButton instances

		  // Bind to custom events.
		  $e.bind('restart', function(ev){that.restart();});
		  $e.bind('check-answers', function(ev){that.checkAnswers();});
		  $e.bind('reset-html', function(ev){that.resetHTML();});
	      },

	      restart:function(){
		  $(this.element).data('correct', 0);
		  _c('restart(), not overridden.');
		  // Placeholder
		  // To be overwritten by specific question types.
	      },

	      checkAnswers:function(){
		  _c('checkAnswers(), not overridden.');
		  // Placeholder
		  // To be overwritten by specific question types.
	      },

	      doTemplate:function(template){
		  // Check to see if the template is a function. 
		  // If not create function from string.
		  if(!$.isFunction(template)){
		      _c('Consider pre-compiling this template, using _tmpl().', template);
		      template = _tmpl(template);
		  }
		  var $e = $(this.element);
		  // Call the template function with current data
		  // and insert the resulting HTML into our element.
		  $e.html(template.call(this, $.extend({}, $e.data(), this.options)));
	      },

	      requestRescore:function(){
		  //Note that this calls trigger on its element.
		  //By calling 'trigger', rather than 'triggerHandler'
		  //the event will be bubbled up to the handler on
		  //one of the parent elements.
		  $(this.element).trigger('request-rescore');
	      },

	      resetHTML:function(callback){
		  this.doTemplate('<%=html%>');
	      }
	      
	  },
	  
	  /**
	   * @property {object} type Typing exercise with <input> textboxes.
	   */

	  type:{

	      templates:{
		  correct:_tmpl('<%=correct_icon_html%><input type="text" name="<%=name%>" value="<%=correct_text%>" size="<%=correct_text_length%>" />'),
		  incorrect:_tmpl('<%=incorrect_icon_html%><input type="text" name="<%=name%>" value="<%=user_response%>" size="<%=correct_text_length%>" /> <span class="quiet">(La bonne réponse est <%=correct_text%>)</span>'),
	          textbox:_tmpl('<input type="text" name="<%=name%>" value="<%=user_response%>" size="<%=correct_text_length%>" />')
	      },

	      init:function(){
		  var correct_text = this.getCorrectAnswersText(this.element)[0];
		  var $e = $(this.element);
		  var box_name = $e.data('name') || 'textbox_' + $.fn.wordQuestion._getLatestId();
		  $e.data('correct_text', correct_text)
		      .data('correct_text_length', correct_text.length)
		      .data('user_response', '')
		      .data('name', box_name);
		  this.doTemplate(this.templates.textbox);
		  $e.data('correct', 0);
		  var that = this;
		  $e.find('input').die().live('keyup', function(){$e.data('user_response', this.value);});
	      },

	      equals:function(a, b){
		  if(a == b)return true;  
		  return false;
	      },

	      restart:function(){
		  this.doTemplate('<%=html%>');
		  this.requestRescore();
		  this.init();
	      },

	      checkAnswers:function(){
		  var $e = $(this.element);
		  if(this.equals($e.data('user_response'), $e.data('correct_text'))){
		      this.doTemplate(this.templates.correct);
		      $e.data('correct', 1);   
		  }else{
		      this.doTemplate(this.templates.incorrect);		      	
		      $e.data('correct', 0);
		  }
	      }

	  },


	  
	  /**
	   * @property {object} type Typing exercise with <input> textboxes.
	   */

	  vj_type:{
	      templates:{
		  correct:_tmpl('<%=correct_icon_html%><input type="text" name="<%=name%>" value="<%=correct_text%>" size="<%=correct_text_length%>" />'),
		  incorrect:_tmpl('<%=incorrect_icon_html%><input type="text" name="<%=name%>" value="<%=user_response%>" size="<%=correct_text_length%>" /> <span class="quiet">(La bonne réponse est <%=quoted_correct_text%>)</span>'),
	          textbox:_tmpl('<input type="text" name="<%=name%>" value="<%=user_response%>" size="<%=correct_text_length%>" />')
	      },

	      init:function(){
		  var correct_text = this.getCorrectAnswersText(this.element)[0];
		  var $e = $(this.element);
		  var box_name = $e.data('name') || 'textbox_' + $.fn.wordQuestion._getLatestId();
		  $e.data('correct_text', correct_text)
		      .data('correct_text_length', correct_text.length)
		      .data('user_response', '')
		      .data('name', box_name)
		      .data('quoted_correct_text', '« ' + ins_text + ' »');
		  if(this.options.either_or_separator == undefined){
		      $e.data('quoted_correct_text', '« ' + ins_text + ' »');
		  }else{
		      var sep = this.options.either_or_separator;
		      $e.data('quoted_correct_text', '« ' + ins_text.split(sep).join('\"' + sep + '\"') + ' »');
		  }
		  this.doTemplate(this.templates.textbox);
		  $e.data('correct', 0);
		  var that = this;
		  $e.find('input').die().live('change', function(){$e.data('user_response', this.value);});
	      },

	      equals:function(user_answer, system_answer){
		  if(this.options.ignore_case === true){
		      user_answer = user_answer.toLowerCase();
		      system_answer = system_answer.toLowerCase();
		  }
		  if(this.options.ignore_whitespace === true){
		      user_answer = user_answer.split(' ').join('');
		      system_answer = system_answer.split(' ').join('');
		  }
		  if(this.options.either_or_separator != undefined){
		      var answer_array = system_answer.split(this.options.either_or_separator);
		      for(var i = answer_array.length - 1; i > -1; i--){
			  if(answer_array[i] == user_answer){
			      return true;
			  }
		      }
		  }else{
		      if(user_answer == system_answer){
			  return true;
		      }
		  }
		  return false;
	      },

	      restart:function(){
		  this.doTemplate('<%=html%>');
		  this.requestRescore();
		  this.init();
	      },

	      checkAnswers:function(){
		  var $e = $(this.element);
		  if(this.equals($e.data('user_response'), $e.data('correct_text'))){
		      this.doTemplate(this.templates.correct);
		      $e.data('correct', 1);   
		  }else{
		      this.doTemplate(this.templates.incorrect);		      	
		      $e.data('correct', 0);
		  }
	      }

	  },



	  /**
	   * @property {object} find In this exercise type, a user attempts to find an incorrect word by clicking on it.
	   */

	  find:{
	      templates:{
		  hidden:_tmpl('<%=incorrect_text%>'),
		  incorrect:_tmpl('<%=incorrect_icon_html%> <del><%=incorrect_text%></del> <ins><%=correct_text%></ins>'),
		  found:_tmpl('<del><%=incorrect_text%></del> <%=correct_icon_html%><ins><%=correct_text%></ins>')
	      },
	      
	      show:function(){
		  this.doTemplate(this.templates.found);
	      },

	      init:function(){
		  var $e = $(this.element);
		  if($e.data('html')){
		      $e.html($e.data('html'));
		  }
		  $e.data('incorrect_text', this.getInorrectAnswersText(this.element)[0])
		      .data('correct_text', this.getCorrectAnswersText(this.element)[0]);
		  var that = this;
		  $e.bind('click submit', function(){that.show(); $e.data('correct', 1); that.requestRescore();});
		  this.doTemplate(this.templates.hidden);
	      },

	      restart:function(){
		  $(this.element).data('correct', 0);
		  this.requestRescore();
		  this.init();
	      },

	      checkAnswers:function(){
		  if($(this.element).data('correct') === 0){
		      this.doTemplate(this.templates.incorrect);
		  }
	      }
	  },
	  
	  /**
	   * @property {object} find In this exercise type, a user attempts to find an incorrect word by clicking on it.
	   */

	  vj_find_type:{
	      templates:{
		  hidden:_tmpl('<%=incorrect_text%>'),
		  incorrect_unfound:_tmpl('<%=incorrect_icon_html%><del><%=incorrect_text%></del> <span class="quiet">(La bonne réponse est <%=quoted_correct_text%>)</span>'),
		  incorrect_found:_tmpl('<%=correct_icon_html%><del><%=incorrect_text%></del> <%=incorrect_icon_html%><input type="text" value="<%=user_response%>" size="<%=correct_text_length%>" /> <span class="quiet">(La bonne réponse est <%=quoted_correct_text%>)</span>'),
		  correct:_tmpl('<%=correct_icon_html%><del><%=incorrect_text%></del> <%=correct_icon_html%><input type="text" value="<%=correct_text%>" size="<%=correct_text_length%>" />'),
		  incorrect:_tmpl('<%=incorrect_icon_html%><input type="text" value="<%=user_response%>" size="<%=correct_text_length%>" /> <span class="quiet">(La bonne réponse est <%=quoted_correct_text%>)</span>'),
	          found:_tmpl('<%=correct_icon_html%><del><%=incorrect_text%></del> <input type="text" value="<%=user_response%>" size="<%=correct_text_length%>" />')
	      },

	      init:function(){
		  var $e = $(this.element);
		  if($e.data('html')){
		      $e.html($e.data('html'));
		  }

		  var ins_text = this.getCorrectAnswersText(this.element);
		  var del_text = this.getIncorrectAnswersText(this.element);

		  $e.data('correct_text', ins_text)
		      .data('incorrect_text', del_text)
		      .data('correct_text_length', ins_text.length)
		      .data('user_response', '')
		      .data('found', false)
		      .data('total', 2)
		      .data('quoted_correct_text', '« ' + ins_text + ' »');

		  var that = this;
		  $e.bind('click submit', function(e){e.stopPropagation(); that.show(); $e.data('found', true); $e.data('correct', 1); $e.find('input').focus(); that.requestRescore();});
		  $e.find('input').die().live('change', function(){$e.data('user_response', this.value);});		
		  this.doTemplate(this.templates.hidden);
	      },

	      show:function(){
		  this.doTemplate(this.templates.found);
	      },

	      restart:function(){
		  $(this.element).data('correct', 0);
		  this.requestRescore();
		  this.init();
	      },

	      equals:function(user_answer, system_answer){
		  if(this.options.either_or_separator != undefined){
		      var answer_array = system_answer.split(this.options.either_or_separator);
		      for(var i = answer_array.length - 1; i > -1; i--){
			  if(answer_array[i] == user_answer){
			      return true;
			  }  		      
		      }
		  }else{
		      if(user_answer == system_answer){
			  return true;
		      }
		  }
		  return false;
	      },

	      checkAnswers:function(){
		  var $e = $(this.element);
		  if($e.data('found') !== true){
		      //not found
		      this.doTemplate(this.templates.incorrect_unfound);
		      $e.data('correct', 0);
		  }else if(!this.equals($e.data('user_response'), $e.data('correct_text'))){
		      //found, but correct answer not typed
		      this.doTemplate(this.templates.incorrect_found);
		      $e.data('correct', 1);
		  }else{
		      //100%!!!!
		      this.doTemplate(this.templates.correct);
		      $e.data('correct', 2);
		  }
	      }
	  },

	  
	  vj_find:{
	      templates:{
		  hidden:_tmpl('<%=incorrect_text%>'),
		  incorrect:_tmpl('<%=incorrect_icon_html%> <del><%=incorrect_text%></del> <ins><%=correct_text%></ins>'),
		  found:_tmpl('<del class="quiet"><%=incorrect_text%></del> <%=correct_icon_html%><ins><%=correct_text%></ins>')
	      },
	      
	      show:function(){
		  this.doTemplate(this.templates.found);
	      },

	      init:function(){
		  var $e = $(this.element);
		  if($e.data('html')){
		      $e.html($e.data('html'));
		  }
		  $e.data('incorrect_text', this.getIncorrectText(this.element))
		      .data('correct_text', this.getCorrectText(this.element));
		  var that = this;
		  $e.bind('click submit', function(e){e.stopPropagation(); that.show(); $e.data('correct', 1); that.requestRescore();});
		  this.doTemplate(this.templates.hidden);
	      },

	      restart:function(){
		  $(this.element).data('correct', 0);
		  this.requestRescore();
		  this.init();
	      },

	      checkAnswers:function(){
		  if($(this.element).data('correct') === 0){
		      this.doTemplate(this.templates.incorrect);
		  }
	      }
	  },


	  /**
	   * @property {object} multiple_choice This is a multiple choice exercise with drop down menus.
	   */

	  multiple_choice:{

	      templates: {
		  // 'default' is reserved, so this is 'default_'.
		  // Note, we could leave these as strings, but we'd
		  // pay for it in speed later. Instead, we'll call _tmpl and
		  // store the functions.
	          default_:_tmpl('<select name="<%=name%>">' +
			   '<% for ( var i = 0; i < answers.length; i+=1 ) {%>' +
		           '<option <%=answers[i].value%> <%=answers[i].selected%>><%=answers[i].text%></option>' + 
		           '<% } %>' +
			   '</select>'),
		  correct:_tmpl('<%=correct_icon_html%>' +
   		           '<select name="<%=name%>">' +
			   '<% for ( var i = 0; i < answers.length; i+=1 ) {%>' +
		           '<option <%=answers[i].value%> <%=answers[i].selected%>><%=answers[i].text%></option>' + 
		           '<% } %>' +
			   '</select>'),
		  incorrect:_tmpl('<%=incorrect_icon_html%> ' +
			    '<select name="<%=name%>">' +
			    '<% for ( var i = 0; i < answers.length; i+=1 ) {%>' +
			    '<option <%=answers[i].value%> <%=answers[i].selected%>><%=answers[i].text%></option>' +
			    '<% } %>' +
			    '</select> (La bonne réponse est : <%=correct_text%>.)')
	      },

	      onChange:function(){
		  var $e = $(this.element);
		  var answers = $e.data('answers');
		  var sel_index = $e.find('select').get(0).selectedIndex;
		  var len = answers.length;

		  for(var i = 0; i < len; i+=1){
		      answers[i].selected = sel_index == i? "selected='selected'" : '';
		  }
		  $e.data('answers', answers)
		      .data('selected_index', sel_index)
		      .data('correct', 0);
		  this.doTemplate(this.templates.default_);
		  this.requestRescore();
	      },

	      init:function(){
		  //In a nutshell, we're going to loop through and grab all of the right/wrong answers
		  //to our question. These will be stored, along with some information for formatting
		  //and evaluation in the DOM element's 'data' (provided by jQuery).
		  var answers = [],
		  correct_text = '',
		  correct_index = -1;
		  var dropdown_name = $(this.element).data('name') || "dropdown_" + $.fn.wordQuestion._getLatestId();
		  //If there's no right answer in the game, 
		  //make sure 'correct_text' is defined, 
		  //otherwise, the template will return an error.
		  $(this.element).find('ins, del').each(function(index){
							    var $t = $(this);
							    var is_right_answer = $t.is('ins'); // 'ins' holds the right answer
							    if(is_right_answer){
								correct_text = $t.html();
								correct_index = index;
							    }
							    answers.push({'text': $t.text(), 'value' : is_right_answer? 'value="true"' : 'value="false"', 'selected' : ''});
							}).end()
		      .data('answers', answers)
		      .data('correct', 0)
		      .data('correct_index', correct_index)
		      .data('selected_index', 0)
		      .data('name', dropdown_name)
		      .data('correct_text', (correct_text? correct_text : ''));
		  var that = this;
		  //jQuery 'live' binds an event to an element that may or may not
		  //exist yet. Use it to attach a 'change' event to our drop down.
		  $(this.element).find('select').die().live('change', function(){that.onChange();});
		  this.doTemplate(this.templates.default_);
	      },
	      
	      isCorrect:function(){
		  var d = $(this.element).data();
		  if(d.selected_index === d.correct_index){
		      return true;
		  }
		  return false;
	      },

	      checkAnswers:function(){
		  if(this.isCorrect() === true){
		      $(this.element).data('correct', 1);
		      this.doTemplate(this.templates.correct);

		  }else{
		      $(this.element).data('correct', 0);
		      this.doTemplate(this.templates.incorrect);
		  }
	      },

	      restart:function(){
		  this.doTemplate('<%=html%>');
		  this.init();
		  this.requestRescore();
	      }
	  },


	  /**
	   * @property {object} multiple_choice This is a multiple choice exercise with drop down menus.
	   */

	  vj_multiple_choice:{

	      templates: {
		  // 'default' is reserved, so this is 'default_'.
		  // Note, we could leave these as strings, but we'd
		  // pay for it in speed later. Instead, we'll call _tmpl and
		  // store the functions.
	          default_:_tmpl('<select>' +
			   '<% for ( var i = 0; i < answers.length; i+=1 ) {%>' +
		           '<option <%=answers[i].value%> <%=answers[i].selected%>><%=answers[i].text%></option>' + 
		           '<% } %>' +
			   '</select>'),
		  correct:_tmpl('<%=correct_icon_html%>' +
   		           '<select>' +
			   '<% for ( var i = 0; i < answers.length; i+=1 ) {%>' +
		           '<option <%=answers[i].value%> <%=answers[i].selected%>><%=answers[i].text%></option>' + 
		           '<% } %>' +
			   '</select>'),
		  incorrect:_tmpl('<%=incorrect_icon_html%> ' +
			    '<select>' +
			    '<% for ( var i = 0; i < answers.length; i+=1 ) {%>' +
			    '<option <%=answers[i].value%> <%=answers[i].selected%>><%=answers[i].text%></option>' +
			    '<% } %>' +
			    '</select> <span class="quiet">(La bonne réponse est « <%=correct_text%> ».)</span>')
	      },

	      onChange:function(){
		  var $e = $(this.element);
		  var answers = $e.data('answers');
		  var sel_index = $e.find('select').get(0).selectedIndex;
		  var len = answers.length;
		  for(var i = 0; i < len; i+=1){
		      answers[i].selected = sel_index == i? "selected='selected'" : '';
		  }
		  $e.data('answers', answers)
		      .data('selected_index', sel_index)
		      .data('correct', 0);
		  this.doTemplate(this.templates.default_);
		  this.requestRescore();
	      },

	      init:function(){
		  //In a nutshell, we're going to loop through and grab all of the right/wrong answers
		  //to our question. These will be stored, along with some information for formatting
		  //and evaluation in the DOM element's 'data' (provided by jQuery).
		  var answers = [],
		  correct_text = '',
		  correct_index = -1;

		  //If there's no right answer in the game, 
		  //make sure 'correct_text' is defined, 
		  //otherwise, the template will return an error.
		  $(this.element).find('ins, del').each(function(index){
							    var $t = $(this);
							    var is_right_answer = $t.is('ins'); // 'ins' holds the right answer
							    if(is_right_answer){
								correct_text = $t.html();
								correct_index = index;
							    }
							    answers.push({'text': $t.text(), 'value' : is_right_answer? 'value="true"' : 'value="false"', 'selected' : ''});
							}).end()
		      .data('answers', answers)
		      .data('correct', 0)
		      .data('correct_index', correct_index)
		      .data('selected_index', 0)
		      .data('correct_text', (correct_text? correct_text : ''));
		  var that = this;
		  //jQuery 'live' binds an event to an element that may or may not
		  //exist yet. Use it to attach a 'change' event to our drop down.
		  $(this.element).find('select').die().live('change', function(){that.onChange();});
		  this.doTemplate(this.templates.default_);
	      },
	      
	      isCorrect:function(){
		  var d = $(this.element).data();
		  if(d.selected_index === d.correct_index){
		      return true;
		  }

		  return false;
	      },

	      checkAnswers:function(){
		  if(this.isCorrect() === true){
		      $(this.element).data('correct', 1);
		      this.doTemplate(this.templates.correct);

		  }else{
		      $(this.element).data('correct', 0);
		      this.doTemplate(this.templates.incorrect);
		  }
	      },

	      restart:function(){
		  this.doTemplate('<%=html%>');
		  this.init();
		  this.requestRescore();
	      }

	  },




	  /**
	   * @property {object} multiple_choice This is a multiple choice exercise with drop down menus.
	   */

	  multiple_choice_radio:{

	      templates:{
		  //As mentioned above, we could store strings here, but we'll store template functions. There's a small initial
		  //performance hit, but it's much faster in the long run. FYI, 'default_' is a reserved word in JS, so ... 'default_'.
		  default_: _tmpl('<div>' + 
				      '<% var len = answers.length; for ( var i = 0; i < len; i+=1 ) { var answer = answers[i]; %>' +
				      '<div>' +
				          '<label class="option" for="<%=answer.id%>">' + 
				              '<input type="radio" name="<%=answer.group_id%>" <%=answer.value%> id="<%=answer.id%>" <%=answer.selected%> />' +
				                  '<%=answer.text%>' +
				          '</label>' +
				      '</div>' +
				      '<% } %>' +
				  '</div>'),
		  correct: _tmpl('<%=correct_icon_html %>' +
                                 '<div>' + 
				      '<% var len = answers.length; for ( var i = 0; i < len; i+=1 ) { var answer = answers[i]; %>' +
				      '<div>' +
				          '<label class="option" for="<%=answer.id%>">' + 
				              '<input type="radio" name="<%=answer.group_id%>" <%=answer.value%> id="<%=answer.id%>" <%=answer.selected%> />' +
				                  '<%=answer.text%>' +
				          '</label>' +
				      '</div>' +
				      '<% } %>' +
				  '</div>'),
		  incorrect: _tmpl('<%=incorrect_icon_html %>' +
                                 '<div>' + 
				      '<% var len = answers.length; for ( var i = 0; i < len; i+=1 ) { var answer = answers[i]; %>' +
				      '<div>' +
				          '<label class="option" for="<%=answer.id%>">' + 
				              '<input type="radio" name="<%=answer.group_id%>" <%=answer.value%> id="<%=answer.id%>" <%=answer.selected%> />' +
				                  '<%=answer.text%>' +
				          '</label>' +
				      '</div>' +
				      '<% } %>' +
				  '</div>')
	      },

	      getId:function(){
		  return 'radio-id-' + $.fn.wordQuestion._getLatestId();
	      },

	      init:function(){
		  //In a nutshell, we're going to loop through and grab all of the right/wrong answers
		  //to our question. These will be stored, along with some information for formatting
		  //and evaluation in the DOM element's 'data' (provided by jQuery).
		  var answers = [],
		  correct_text = '',
		  correct_id = -1,
		  selected_id = -1,
		  groupId = this.getId(),
		  getId = this.getId;
		  $(this.element).find('ins, del').each(function(index){
						 var $t = $(this);
						 var is_right_answer = $t.is('ins'); //'ins' holds the right answer
						 var my_id = getId();
						 if(is_right_answer){
						     correct_text = $t.html();
						     correct_id = my_id;
						 }
						 answers.push({'group_id': groupId, 'id': my_id, 'text': $t.text(), 'value' : is_right_answer? 'value="true"' : 'value="false"', 'selected' : ''});
					     }).end()
		      .data('answers', answers)
		      .data('correct', 0)
		      .data('correct_id', correct_id)
		      .data('selected_id', selected_id)
		      .data('correct_text', correct_text);
		  var that = this;
		  $(this.element).find('input').die().live('click', function(e){
							 //Avoid recursively calling
							 if($(this).attr('id') != $(that.element).data('selected_id')){
							     that.onChange(e);}
						     }
						    );
		  this.doTemplate(this.templates.default_);		 
	      },
	      

	      onChange:function(event){
		  var $e = $(this.element);
		  var answers = $e.data('answers');
		  var selected_id = event.target.id;
		  var index = 0;
		  
		  var answers_len = answers.length;
		  while(index < answers_len){
		      var a = answers[index];
		      a.selected = selected_id == a.id? "checked='true'" : '';
		      index += 1;
		  }

		  $e.data('answers', answers)
		      .data('selected_id', selected_id)
		      .data('correct', 0);
		  this.doTemplate(this.templates.default_);
		  this.requestRescore();
	      },

	      isCorrect:function(){
		  var d = $(this.element).data();
		  if(d.selected_id === d.correct_id){
		      return true;
		  }
		  return false;
	      },

	      checkAnswers:function(){
		  if(this.isCorrect() === true){
		      $(this.element).data('correct', 1);
		      this.doTemplate(this.templates.correct);

		  }else{
		      $(this.element).data('correct', 0);
		      this.doTemplate(this.templates.incorrect);
		  }
	      },

	      restart:function(){
		  this.doTemplate('<%=html%>');
		  this.init();
		  this.requestRescore();
	      }

	  }
	  
      };


  })(jQuery);


