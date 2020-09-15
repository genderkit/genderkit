var fs = require('fs');
var slug = require('slug');

// returns a window with a document and an svg root node
const { createSVGWindow } = require('svgdom')
const window = createSVGWindow()
const document = window.document
const { SVG, registerWindow, Color } = require('@svgdotjs/svg.js')

// register window and document
registerWindow(window, document)

// create canvas
const canvas = SVG(document.documentElement)

// TODO: fix this to be a proper module require
eval(fs.readFileSync('clothes-data.js')+'');

var outputpath = "/vagrant/git/genderkit/assets/images/clothes/svg/";

function draw() {

    console.log("--------------------------------------------------")

    categories.forEach((category, i) => {

        var draw = canvas;
        
        category.forEach((person, j) => {
            drawPerson(
                draw, 
                j * 90, 
                0, 
                typeof person.top === "function" ? person.top(draw) : person.top, 
                typeof person.bottom === "function" ? person.bottom(draw) : person.bottom,
                person.middle ? (typeof person.middle === "function" ? person.middle(draw) : person.middle) : null,
                person.seam
            )
        })

        
        console.log("Image: " + titles[i]);
        var target = outputpath + slug(titles[i]) + ".svg";
        console.log("Writing to: " + target)

        fs.writeFile(target, canvas.svg(), function (err) {
            if (err) throw err;
            console.log('Saved to ' + target);
        }); 
    });
}

draw()