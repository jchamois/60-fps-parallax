#Pmd-parallax.

##About

A jQuery plugin for parallax effect.
The script allows to parallax backgrounds and absolute positioned blocks.


## Installation

Run __bower install__ in the project folder to download the script dependencies (needed to run the demo).

### Classic method
Simply link the script pmd-parallax and pmd-isonscreen dependency in your page.

### Bower method
You can also add it via bower : add the following line in your bower.json file : git@bitbucket.org:prismamediadigital/pmd-parallax.git


## Usage

Add the following attributes in your HTML markup :

 - **required** data-parallax="absolute" or data-parallax="background" to add a parallax effect on an absolute positioned block or a background image
 - **required** data-speed="<num>" to set the parallax scrolling speed

Instantiate the plugin in your javascript file : $('[data-parallax]').parallax()

Note that :
 - If data-parallax is on bloc an absolute block, the parent container must be in asolution position
 - When the parent container reach the top of the viewport the _top_ value of the absolute positioned block with a parallax effect will be the value set in your CSS.

