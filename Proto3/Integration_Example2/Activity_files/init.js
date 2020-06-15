$(document).ready(function(){



		      //Tip setup-----------------------------------------------------------------------------------
		      //These are the little question marks that can appear in regular content.
		      //When moused over, they display a message.
		      $('#container span.tip').each(function(){
							   var $this = $(this);
							   var content = $this.html();
								   //$this.html('<img class=\"tip\" src=\"http://pointfirstwriting.com/images/icon_tooltip.png\" />').removeClass('ui-state-highlight');
									$this.html('&nbsp;');
									$this.css('background-image', 'url("http://pointfirstwriting.com/images/icon_tooltip.png")');
									//inserer l'url de l'image
									$this.removeClass('ui-state-highlight');
									$this.find('img.tip').attr('title', content).tooltip();
									$this.attr('title',content).tooltip();
						       });


		  });
		  
		  