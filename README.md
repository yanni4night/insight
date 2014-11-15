#insight


Help you create web pages as the design sketch.It draws a half-opacity design sketch on the page,then you could see where is wrong.

It supports all pc browsers including IE6/IE7,but we have a problem on IE6:it does not support position:fixed,so the ctrl-panel won't be fixed on NE/NW/SW/SE position.

##Usage
#####HTML
	<script src="./js/insight.js"></script>
	<script >insight(imageURL,options);</script>

#####options:

1. **css**: css attributes
2.**bigStep**: step when you enter shift key and 'AWSD'
6. **ctrlPanelPosition**: 'NE', //Or NW or SW or SE
7. **hideonload**: true,
8. **hotkeysEnabled**: true,
9. **navButtonsEnabled**: true

##Example

	insight('/static/img/index.test.png',{bigStep:10,css:{width:"100%",height:"1800px",zIndex:10000}});

##Changelog
 - 2014-01-03[23:40:27]:support big step