# commentable-gallery
A simple jQuery/PHP/SQL gallery with comments.

*** WHAT IS THIS ***

This gallery application was developed with archival purposes in mind; the original use was to identify people and places within vintage photographs within a library collection via crowdsourcing. That said, a commentable gallery of images is a handy feature in many applications. 

*** WHAT YOU NEED (OUT OF THE BOX) ***

1) jQuery v.1.11.x or higher.
2) PHP 5.x or higher.
3) Bootstrap 3.x or higher.
4) SQL/MySQL

*** WHAT YOU NEED TO KNOW (IF YOU WANT TO MODIFY IT) ***

1) HTML
2) Javascript
3) jQuery
4) Familiarity with JSON protocol

*** BASIC OUT OF THE BOX IMPLEMENTATION ***

1) Edit the "db_config.php" file in the PHP folder with your SQL information
2) Upload the files to your server.
3) Navigate to the "create_comments_table.php" file in your favorite web browser (which is Chrome, in case you were wondering).
4) If everything executes properly there, you'll see an appropriate message.
5) Open up the "gallery.html" file contained within.
6) Edit it as described within the comments.

*** OPTIONS ***

Options are passed as an object in the .IdGallery() call.

{
	selectedColor: **string indicating desired background color for a selected image***
	notSelected: **string indicating desired background color for a non-selected image***
	commentsSource: **string containing the address of the source of the comments***
	scrollDelay: **integer describing the length of the scroll animation in milliseconds***
}

Example:

$('#linkedGallery').IdGallery({selectedColor: "blue", notSelected: "cornsilk", commentsSource: "json/commentsfeed.php", scrollDelay: 634});

Hex values may work as well for the color modifications. I'm not invested enough to test, and I'm writing this thing.

*** TECHNICAL STUFF ***

The default setup makes a call to a PHP file in the form of comments.php?id=pictureName, which returns a simple JSON feed from the database with the following form:

[{"photoComment":"Things someone wrote"}]

If you have an in place system for database access, mimicking this functionality and specifying the location through options is probably the easiest choice. The original implementation of the software was based on CouchCMS, which I highly recommend as a lightweight and flexible content manager.

If you modify the comment source, you will have to make corresponding alterations within the gallery_script.js file.

