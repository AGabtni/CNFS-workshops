//<!-- TODO: Added these scripts for quiz. Remove if unwanted. -->
//<script>
;;
var utils = {};


(function($){

    utils.randomId = function(length, prefix){
        var l = length || 50;
        var text = prefix || "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for( var i=0; i < l; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    utils.tmpl_cache = {};	  

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
    utils._tmpl = function(str, data){
	var fn = utils.tmpl_cache[str] = utils.tmpl_cache[str] ||
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
	return data ? fn( data ) : fn;
    };

})(jQuery);



/**
 * jQuery.feedback
 * MIT Licensed
 * 
 * @projectDescription Easy transformation of static HTML to interactive feedback
 * Works with jQuery +1.4.1 Tested on Firefox 3, IE 6/7/8, Safari 3, Chrome 5
 * 
 */
;;(function( $ ){

    var defaults = {
        feedback_selector:'span.feedback, div.feedback',
        feedback_button_selector:'button.quiz-feedback'
    };

    var Feedback = function(el, opts){
        var options = $.extend({}, opts, defaults),
        $btn,
        $el;

        function init(){
            $el = $(el);
            $btn = $el.find(options.feedback_button_selector);
            $btn.on('click', toggle);
            hide();
        }

        function hide() {
            var $feedback = $el.find(options.feedback_selector);
            $feedback.hide();
        }

        function toggle() {
            var $feedback = $(el).find(options.feedback_selector);
            $feedback.slideToggle();
        }

        function show() {
            var $feedback = $(el).find(options.feedback_selector);
            $feedback.slideDown();
        }

        init();

        var api = {
            show:show,
            hide:hide,
            toggle:toggle
        };

        return api;
    };

    $.fn.feedback = function(options){
        return this.each(function(){
            var feedback = new Feedback(this, options);
            this.feedback = feedback;
        });
    };

})(jQuery);


/**
 * jQuery.points
 * MIT Licensed
 * 
 * @projectDescription Calculate number of points earned on a quiz.
 * Works with jQuery +1.4.1 Tested on Firefox 3, IE 6/7/8, Safari 3, Chrome 5
 * 
 */
;;(function( $ ){

    var defaults = {
        question_selector:'span.question, div.question, li.question',
        points_earned_selector:'span.scoreboard-correct',
        points_total_selector:'span.scoreboard-total',
        default_points_per_question:1,
        default_points_per_question_attribute:'data-points-per-question',
        points_question_attribute:'data-points'
    };

    var Points = function(el, questions, opts){
        var options = $.extend({}, opts, defaults),
        questions = questions,
        points_earned = 0,
        points_total = 0,
        points_per_question = [],
        $el;

        function init(){
            $el = $(el);
            var $html_questions = $el.find(options.question_selector);
            var default_points_per_question = getDefaultPointsPerQuestion();
            $html_questions.each(function(){
                var points = parseInt($(this).attr(options.points_question_attribute));
                if (isNaN(points) || !points) {
                    points = default_points_per_question;
                }
                points_per_question.push(points);
            });
            update(0);
        }

        function getPointsTotal() {
            return points_total;
        }

        function getPointsEarned() {
            return points_earned;
        }
        
        function getDefaultPointsPerQuestion() {
            var default_points_per_question = 
                parseInt($el.attr(options.default_points_per_question_attribute)) || 
                options.default_points_per_question;
            return default_points_per_question;
        }

        function getPointsForQuestion(index) {
            return points_per_question[index];
        }

        function update(force_points_earned) {
            points_total = 0;
            points_earned = 0;
            for (var i=0; i < questions.length; i++) {
                var question = questions[i];
                var points_for_this_question = getPointsForQuestion(i);
                if (question.isRight()) {
                    points_earned += points_for_this_question;
                }
                points_total += points_for_this_question;
            }
            if (typeof force_points_earned == "number"){
                points_earned = force_points_earned;
            }
            updateDisplay();
        }

        function reset() {
            update(0);
        }

        function updateDisplay() {
            $el.find(options.points_earned_selector).text(getPointsEarned());
            $el.find(options.points_total_selector).text(getPointsTotal());
        }

        init();

        var api = {
            update:update,
            updateDisplay:updateDisplay,
            reset:reset,
            getPointsEarned:getPointsEarned,
            getPointsTotal:getPointsTotal
        };

        return api;
    };

    $.fn.points = function(questions, options){
        // Sorry, this breaks jQuery chaining.
        return new Points(this, questions, options);
    };

})(jQuery);



/**
 * jQuery.showableAnswers
 * MIT Licensed
 * 
 * @projectDescription Easy transformation of static HTML to showable answers on
 * button click.
 * Works with jQuery +1.4.1 Tested on Firefox 3, IE 6/7/8, Safari 3, Chrome 5
 * 
 */
;;(function( $ ){

    var defaults = {
        show_answers_button_selector:'button.quiz-show-answers',
        btn_hide_text:'Hide answers',
        btn_show_text:'Show answers'
    };

    var ShowableAnswers = function(el, questions, opts){
        var options = $.extend({}, opts, defaults),
        $btn,
        $el,
        btn_hide_text,
        btn_show_text,
        showing;

        function init(){
            $el = $(el);
            $btn = $el.find(options.show_answers_button_selector);
            if ($btn.length == 0) return;
            $btn.on('click', toggle);
            initButtonText();
            setButtonText(btn_show_text);
            showing = false;
        }

        function initButtonText() {
            var txt = $btn.text().split('/');
            if (txt.length > 1) {
                btn_hide_text = txt[1];
            } else {
                btn_hide_text = options.btn_hide_text;
            }
            if (txt.length > 0) {
                btn_show_text = txt[0];
            } else {
                btn_show_text = options.btn_show_text;
            }
        }
        
        function setButtonText(txt) {
            $btn.text(txt);
        }
        
        function toggle() {
            if (showing) {
                hide();
            } else {
                show();
            }
        }

        function show() {
            for (var i=0; i < questions.length; i++) {
                questions[i].showAnswer();
            }
            $btn.text(btn_hide_text);
            showing = true;
        }

        function hide() {
            for (var i=0; i < questions.length; i++) {
                questions[i].hideAnswer();
            }
            $btn.text(btn_show_text);
            showing = false;
        }

        init();

        var api = {
            show:show,
            hide:hide
        };

        return api;
    };

    $.fn.showableAnswers = function(questions, options){
        return this.each(function(){
            var showable_answers = new ShowableAnswers(this, questions, options);
            this.showable_answers = showable_answers;
        });
    };

})(jQuery);


/**
 * jQuery.dropdownQuiz
 * MIT Licensed
 * 
 * @projectDescription Easy transformation of static HTML to interactive quiz
 * Works with jQuery +1.4.1 Tested on Firefox 3, IE 6/7/8, Safari 3, Chrome 5
 * 
 */
;;(function( $ ){

    var defaults = {
        submit_button_selector:'button.btn-submit, button.quiz-check-answers',
        reset_button_selector:'button.btn-reset, button.quiz-restart',
        question_selector:'span.question',
        start_response:'Séléctionnez',
        unchecked_template_str : '<div class="btn-group">'
            + '<button class="btn dropdown-toggle" data-toggle="dropdown" data-selected="'
            + '<%=selected %>'
            + '">'
            + '<span class="lbl"><%=selected %></span> <span class="fa fa-caret-down"></span>'
            + '</button>'
            + '<ul class="dropdown-menu">'
            + "<% for (var i = 0; i < options.length; i++){ %>"
            + "<li><a tabindex=\"0\" href=\"javascript:void(0)\" class=\"option\"><%=options[i]%></a></li>"
            + "<% } %>"
            + '<!-- dropdown menu links -->'
            + '</ul>'
            + '</div>',
        response_label_text:'Réponse&nbsp;: '
    };

    var DropdownQuiz = function(el, opts){
        options = options || {};
        var options = $.extend({}, opts, defaults);
        var $el, $questions;

        // We'll use this in the place of 
        // a pub/sub pattern
        var events = {
            reset      : $.Callbacks(),
            correct    : $.Callbacks(),
            makeplain  : $.Callbacks()
        };

        var DropDown = function(el){
            var correct_answer;
            var $btn;
            var dropdown_options = [];
            var $t = $(el);
            var $answer;
            
            function init(){
                $t.find('del, ins').each(
                    function(){dropdown_options.push($(this).text());}
                );
                correct_answer = $t.find('ins').eq(0).text();
                $answer = $('<span class="response"></span>').insertAfter($t);
                reset();
                setUpEvents();
            }

            function setUpEvents() {
                $t.find('ul a').on('click', function(e){
                    setLabel($(e.target).text());
                    resetAppearance();
                });
            }

            function isRight() {
                return $btn.attr('data-selected') === correct_answer;
            }
            
            function setLabel(t){
                $btn.attr('data-selected', t);
                $btn.find('span.lbl').text(t);
            }

            function displayCorrect(){
                $btn.removeClass('btn-danger').addClass('btn-success');
                $btn.find('span.fa').attr('class', 'fa fa-check');
            }

            function displayIncorrect(){
                $btn.removeClass('btn-success').addClass('btn-danger');
                $btn.find('span.fa').attr('class', 'fa fa-times');
            }

            function reset(){
                var obj = {'options':dropdown_options, 'correct_answer':correct_answer, 'selected':options.start_response};
                var tmp = utils._tmpl(options.unchecked_template_str);
                $t.html(tmp(obj));
                $btn = $t.find('button');
                setUpEvents();
            }

            function showAnswer(){
                $answer.html(options.response_label_text + correct_answer);
            }

            function hideAnswer(){
                $answer.html('');
            }

            function resetAppearance(){
                $btn.removeClass('btn-success').removeClass('btn-danger');
                $btn.find('span.fa').attr('class', 'fa fa-caret-down');
            }

            function correct(){
                if (isRight()) {
                    displayCorrect();
                }else{
                    displayIncorrect();
                }
            }
            
            var api = {
                reset : reset,
                correct : correct,
                isRight : isRight,
                showAnswer : showAnswer,
                hideAnswer : hideAnswer
            }

            init();

            return api;  
        };

        var QuestionManager = function(){
            var $questions,
            questions = [];

            function initQuestions(){
                $questions.each(function(){
                    questions.push(new DropDown(this));
                });
                resetQuestions();
            }

            function getQuestions(){
                return questions;
            }

            function getUserAnswer(question){
                return $(question).find('a.btn:first').attr("data-selected");
            }

            function correctQuestions(){
                for(var i = 0; i < questions.length; i++){
                    questions[i].correct();
                }
            }

            function resetQuestions(){
                for(var i = 0; i < questions.length; i++){
                    questions[i].reset();
                }
            }
            
            function init(){
                $questions = $el.find(options.question_selector);
                initQuestions();
                events.correct.add(correctQuestions);
                events.reset.add(resetQuestions);
            }

            init();

            this.getQuestions = getQuestions;
            return this;
        };

        var ButtonManager = function(){
            function init(){
                var $submit_button = $el.find(options.submit_button_selector);
                var $reset_button = $el.find(options.reset_button_selector);
                $submit_button.click(function(){events.correct.fire();});
                $reset_button.click(events.reset.fire);
            }
            init();
            return this;
        };

        var FeedbackManager = function(){
            $el.feedback();
            events.reset.add(el.feedback.hide);
            return this;
        };

        var PointsManager = function(questions, options){
            points = $el.points(questions, options);
            events.correct.add(points.update);
            events.reset.add(points.update);
            return this;
        };

        var ShowableAnswersManager = function(questions, options){
            var sa = $el.showableAnswers(questions, options);
            events.reset.add(el.showable_answers.hide);
            return this;
        };

        function init(el){
            $el = $(el);
            this.QuestionManager = new QuestionManager();
            this.ButtonManager = new ButtonManager();
            this.FeedbackManager = new FeedbackManager();
            this.PointsManager = new PointsManager(this.QuestionManager.getQuestions(), {});
            this.ShowableAnswersManager = new ShowableAnswersManager(this.QuestionManager.getQuestions());
        }

        init(el);

    };

    $.fn.dropdownQuiz = function(options){
        return this.each(function(){new DropdownQuiz(this, options);});
    };

})(jQuery);


;;

(function( $ ){
    var defaults = {
        submit_button_selector:'button.btn-submit, button.quiz-check-answers',
        reset_button_selector:'button.btn-reset, button.quiz-restart',
        question_selector:'span.question',
        unchecked_icon_html:'<span class="fa fa-circle icon icon-unchecked"></span>',
        right_icon_html:'<span class="fa fa-check icon icon-right"></span>',
        wrong_icon_html:'<span class="fa fa-times icon icon-wrong"></span>',
        spacer_icon_html:'<span class="fa fa-circle icon icon-unchecked" style="visibility:hidden"></span>',
        icon_selector:'span.fa',
        unchecked_template_str : ''
            + '<fieldset class="radio-group">'
            + '<div class="radio-button-container">'
            + '<% for (var i = 0; i < options.length; i++){ %>'
            + '<div class="radio-group-item">'
            + '<%=prefs.spacer_icon_html%>'
            + '<input type="radio" class="radio" name="<%=group_id %>" value="<%=i %>" id="<%=group_id %><%=i %>" />'
            + '<label for="<%=group_id %><%=i%>"> <%=options[i] %></label>'
            + '</div>'
            + '<% } %>'
            + '</div>'
            + '</fieldset>',
        response_label_text:'Réponse&nbsp;: '
    };
    var prefs = defaults;

    var RadioQuiz = function(el, user_prefs){
        prefs = $.extend({}, user_prefs, prefs);
        var $el, $questions;
        
        // We'll use this in the place of 
        // a pub/sub pattern
        var events = {
            reset      : $.Callbacks(),
            correct    : $.Callbacks(),
            makePlain  : $.Callbacks()
        };

        var RadioGroup = function(el){
            var right_answer,
            $answer;            
            
            function init(){
                var $t = $(el);
                var options = [];
                $t.find('del, ins').each(
                    function(){
                        options.push($(this).text());
                    }
                );
                right_answer = $t.find('ins').eq(0).text();
                var obj = {'prefs':prefs, 'options':options, 'group_id':utils.randomId()};
                var tmp = utils._tmpl(prefs.unchecked_template_str);
                $t.html(tmp(obj));
                $answer = $('<p class="response"></p>').insertAfter($t);
            }
            
            function getIconFor(radio_button) {
                return $(radio_button).prev();
            }

            function getSelectedRadioButton() {
                return $(el).find('input:checked');
            }

            function displayRight(){
                resetDisplay();
                var $checked_radio_button = getSelectedRadioButton();
                getIconFor($checked_radio_button).remove();
                $checked_radio_button.before(prefs.right_icon_html);
            }
            
            function displayWrong(){
                resetDisplay();
                var $checked_radio_button = getSelectedRadioButton();
                getIconFor($checked_radio_button).remove();
                $checked_radio_button.before(prefs.wrong_icon_html);
            }

            function resetDisplay(){
                $(el).find(prefs.icon_selector).before(prefs.spacer_icon_html).remove();
            }

            function isRight(){
                var $checked_radio_button = getSelectedRadioButton();
                var checked_radio_button_id = $checked_radio_button.attr('id');
                var $checked_label = $(el).find('label[for="'+checked_radio_button_id+'"]');
                if ($.trim($checked_label.text()) == $.trim(right_answer)) {return true;}
                return false;
            }

            function correct(){
                if (isRight()) {
                    displayRight();
                } else {
                    displayWrong();
                }
            }
            
            function reset(){
                $(el).find('input').prop('checked', false);
                resetDisplay();
            }

            function showAnswer(){
                $answer.html(prefs.response_label_text + right_answer);
            }

            function hideAnswer(){
                $answer.html('');
            }

            var api = {
                reset : reset,
                correct : correct,
                isRight : isRight,
                showAnswer : showAnswer,
                hideAnswer : hideAnswer
            }
            
            init();

            return api;
        };

        var QuestionManager = function(){
            var $questions,
            questions = [];

            function getQuestions(){
                return questions;
            }

            function initQuestions(){
                $questions.each(function(){
                    questions.push(new RadioGroup(this));
                });
                resetQuestions();
            }

            function getUserAnswer(question){
                return $(question).find('a.btn:first').attr("data-selected");
            }

            function correctQuestions(){
                for(var i = 0; i < questions.length; i++){
                    questions[i].correct();
                }
            }

            function resetQuestions(){
                for(var i = 0; i < questions.length; i++){
                    questions[i].reset();
                }
            }
            
            function init(){
                $questions = $el.find(prefs.question_selector);
                initQuestions();
                events.correct.add(correctQuestions);
                events.reset.add(resetQuestions);
            }
            init();

            this.getQuestions = getQuestions;
            return this;
        };

        var ButtonManager = function(){
            function init(){
                var $submit_button = $el.find(prefs.submit_button_selector);
                var $reset_button = $el.find(prefs.reset_button_selector);
                $submit_button.click(function(){events.correct.fire();});
                $reset_button.click(events.reset.fire);
            }
            init();
            return this;
        };

        var FeedbackManager = function(){
            $el.feedback();
            events.reset.add(el.feedback.hide);
            return this;
        };

        var PointsManager = function(questions, options){
            points = $el.points(questions, options);
            events.correct.add(points.update);
            events.reset.add(points.update);
            return this;
        };

        var ShowableAnswersManager = function(questions, options){
            var sa = $el.showableAnswers(questions, options);
            events.reset.add(el.showable_answers.hide);
            return this;
        };

        function init(el){
            $el = $(el);
            this.QuestionManager = new QuestionManager();
            this.ButtonManager = new ButtonManager();
            this.FeedbackManager = new FeedbackManager();
            this.PointsManager = new PointsManager(this.QuestionManager.getQuestions(), {});
            this.ShowableAnswersManager = new ShowableAnswersManager(this.QuestionManager.getQuestions());
        }

        init(el);

    };

    $.fn.radioQuiz = function(prefs){
        return this.each(function(){new RadioQuiz(this, prefs);});
    };    

})(jQuery);



// TODO: Added this script to init quizzes. Remove if unwanted. -->
//<script>
$('div.dropdown-quiz').each(function(){
    $(this).dropdownQuiz();
});

$('div.radio-quiz').each(function() {
    $(this).radioQuiz();
});