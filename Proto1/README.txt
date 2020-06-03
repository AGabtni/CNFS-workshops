Files hierarchy :

assets/thumbnail.png -> image that will be desplayed in the preview container
css/modal.css -> contains css classes for the modal and the preview container (all those are only relalated to the activity)
js/videoActivity.js -> contains logic for the modal popup and related interactions
activity.html -> placeholder document that contains the HTML code for the activity (the section that needs to be copied is specified in between the comments)


1. Get the thumbnail for the video . This image will act as a preview for the video activity . 
	IMPORTANT : if you happen to not follow the same file hierachy when you are copying this activity 
	change the thumbnail url accordingly in modal.css in the ".preview-background" class : 
	Change the "background-image" attribute to the location of your thumbnail image (the url is relative to the modal.css 
	file location)

2. Copy the section in between comments from activity.html and place it in your target html page (also replace the src tag in the iframe to match video
	you wish to display)
	
3. Dont forget to add the script and link tags in your target html page to load modal.css and videoActivity.js and a fontawesome kit (Tags are in between comments in activity.html)
	->fontawesome is used for the play button in the preview container