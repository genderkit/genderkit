var background = "#f0f0fa" //"rgb(234, 233, 231)"
var fleshcolours = ["rgb(247,170,114)", "rgb(248,195,180)", "rgb(248,195,180)", "rgb(248,195,180)", "rgb(156,95,68)", "rgb(203,141,121)", "rgb(126,82,52)", "rgb(205,161,132)"]
var heights = []
var widths = []

// denim + marl
var noises = {
    "denim-light": [{ "h": 141, "s": 111, "l": 63 }, { "h": 141, "s": 91, "l": 172 }],
    "denim-dark": [{ "h": 141, "s": 33, "l": 90 }, { "h": 141, "s": 56, "l": 44 }],
    "denim-grey": [{ "h": 141, "s": 0, "l": 168 }, { "h": 141, "s": 0, "l": 66 }],
    "denim-black": [{ "h": 141, "s": 0, "l": 83 }, { "h": 141, "s": 0, "l": 40 }]
}

var hues = {
    neon: [21, 74, 180, 323, 353],
    earth: [27, 48, 196, 210, 328],
    stuff: [264, 160, 227, 310, 33],
    vivid: [46, 190, 10, 205],
    autumn: [130, 210, 0, 196],
    summer: [33, 346]
};

var palletes =
{
    neon: [],
    mono: [
        { "h": 0, "s": 0, "l": 20 }, // l: 20 C: 0
        { "h": 0, "s": 0, "l": 50 }, // l: 50 C: 0
        { "h": 0, "s": 0, "l": 90 }, // l: 90 c: 0
    ],
    vivid: [],
    blues: [

        {
            "h": 190, "s": 75, "l": 45
        },

        {
            "h": 237, "s": 50, "l": 50
        }],
    autumn: [],
    // warmpastel: l: 90 c:40
    warmpastel: [
        {
            "h": 15, "s": 100, "l": 80
        },

        {
            "h": 45, "s": 100, "l": 80
        },

        {
            "h": 160, "s": 80, "l": 85
        },
        {
            "h": 280, "s": 100, "l": 90
        },
    ],
    earth: [],
    summer: [],
    stuff: [],
}



hues["neon"].forEach((hue) => {
    // l: 90 c: 90
    palletes.neon.push({ "h": hue, "s": 100, "l": 60 })
})

hues["earth"].forEach((hue) => {
    // l: 45 c25, l:40 c10
    palletes.earth.push({ "h": hue, "s": 14, "l": 37 })
    palletes.earth.push({ "h": hue, "s": 35, "l": 40 })
    palletes.earth.push({ "h": hue, "s": 27, "l": 63 })
})

hues["stuff"].forEach((hue) => {
    // pale neutrals: l65 c15, l90 c10 
    palletes.stuff.push({ "h": hue, "s": 16, "l": 63 })
    palletes.stuff.push({ "h": hue, "s": 45, "l": 88 })
})

hues["vivid"].forEach((hue) => {
    //l: 60 c: 75
    palletes.vivid.push({ "h": hue, "s": 75, "l": 60 })
    palletes.vivid.push({ "h": hue, "s": 90, "l": 50 })
})

hues["autumn"].forEach((hue) => {
    // l: 65, 40            
    palletes.autumn.push({ "h": hue, "s": 60, "l": 25 })
    palletes.autumn.push({ "h": hue, "s": 50, "l": 50 })
    //palletes.autumn.push({"h": hue, "s": 60, "l": 75})
})

hues["summer"].forEach((hue) => {
    palletes.summer.push({ "h": hue, "s": 60, "l": 75 })
    palletes.summer.push({ "h": hue, "s": 55, "l": 55 })
})

function denim(lightness)
{
    var light = lightness + 15;
    var mid = Math.floor(lightness * .8);
    var dark = Math.floor(lightness * 0.5)

    return (draw) => draw.gradient('linear', function(add) {
        add.stop(0, new Color({l: light, c: 25, h: 300 - dark}))
        add.stop(1, new Color({l: mid, c: 35, h: 300 - dark}))
    }).from(0, 0).to(0, 1)
}

function monodenim(lightness)
{
    var light = lightness + 15;
    var mid = Math.floor(lightness * 1);
    var dark = Math.floor(lightness * 0.5)

    return (draw) => draw.gradient('linear', function(add) {
        add.stop(0, new Color({l: light, c: 0, h: 300 - dark}))
        add.stop(1, new Color({l: mid, c: 0, h: 300 - dark}))
    }).from(0, 0).to(0, 1)
}

function tiedie(hue)
{
    return (draw) => draw.gradient('radial', function(add) {
        add.stop(0, new Color({l: 98, c: 60, h: hue}))
        add.stop(.1, new Color({l: 70, c: 60, h: hue}))
        add.stop(0.2, new Color({l: 98, c: 60, h: hue}))
        add.stop(.3, new Color({l: 70, c: 60, h: hue}))
        add.stop(0.4, new Color({l: 98, c: 60, h: hue}))
        add.stop(.5, new Color({l: 70, c: 60, h: hue}))
        add.stop(0.6, new Color({l: 98, c: 60, h: hue}))
        add.stop(.7, new Color({l: 70, c: 60, h: hue}))
        add.stop(0.8, new Color({l: 98, c: 60, h: hue}))
        add.stop(.9, new Color({l: 70, c: 60, h: hue}))
        add.stop(0.8, new Color({l: 98, c: 60, h: hue}))
        add.stop(.9, new Color({l: 70, c: 60, h: hue}))      
    }).from(.5,-.25).to(.5,1).radius(1.4)
}

var patterns = {
    zigzag: (col1, col2) => {
        return (draw) => {
            return draw.pattern(18, 20, function (add) {
                add.rect(20, 20).fill(col1)
                add.line(-10, -5, 10, 5).stroke({ width: 4, color: col2 })
                add.line(8, 5, 28, -5).stroke({ width: 4, color: col2 })
                add.line(-10, 5, 10, 15).stroke({ width: 4, color: col2 })
                add.line(8, 15, 28, 5).stroke({ width: 4, color: col2 })
                add.line(-10, 15, 10, 25).stroke({ width: 4, color: col2 })
                add.line(8, 25, 28, 15).stroke({ width: 4, color: col2 })
            }
            )
        }
    },
    checkerboard: (col1, col2) => {
        return (draw) => {
            return draw.pattern(10, 10, function (add) {
                add.rect(10, 10).fill(col1)
                add.rect(5, 5).fill(col2)
                add.rect(5, 5).move(5, 5).fill(col2)
            }
            )
        }
    },
    polka: (col1, col2) => {
        return (draw) => {
            return draw.pattern(12, 12, function (add) {
                add.rect(20, 20).fill(col1)
                add.circle(3).x(0).y(0).fill(col2)
                add.circle(3).x(6).y(6).fill(col2)
                add.circle(3).x(12).y(12).fill(col2)
            }
            )
        }
    },
    abstract2: (col1, col2) => {
        return (draw) => {
            return draw.pattern(80, 80, function (add) {
                add.rect(80, 80).fill(col1)
                add.circle(10).x(40).y(40).stroke(col2).fill("none")
                add.circle(20).x(35).y(35).stroke(col2).fill("none")
                add.circle(30).x(30).y(30).stroke(col2).fill("none")
                add.circle(40).x(25).y(25).stroke(col2).fill("none")
                add.circle(50).x(20).y(20).stroke(col2).fill("none")
                add.circle(60).x(15).y(15).stroke(col2).fill("none")
                add.circle(70).x(10).y(10).stroke(col2).fill("none")
            }
            )
        }
    },
    abstract: (col1, col2) => {
        return (draw) => {
            return draw.pattern(80, 80, function (add) {
                add.rect(80, 80).fill(col1)
                add.rect(30, 2).move(40, 40).fill(col2)
                add.rect(30, 2).move(39, 44).fill(col2)
                add.rect(30, 2).move(38, 48).fill(col2)
            }
            )
        }
    },
    stripes: (col1, col2) => {
        return (draw) => {
            return draw.pattern(10, 10, function (add) {
                add.rect(40, 40).fill(col1)
                add.rect(60, 2).move(-10, 0).fill(col2)
                add.rect(60, 2).move(-10, 5).fill(col2)
                add.rect(60, 2).move(-10, 10).fill(col2)
            }
            )
        }
    },
    thickstripes: (col1, col2) => {
        return (draw) => {
            return draw.pattern(10, 20, function (add) {
                add.rect(40, 40).fill(col1)
                add.rect(60, 4).move(-10, 0).fill(col2)
                add.rect(60, 4).move(-10, 10).fill(col2)
                add.rect(60, 4).move(-10, 20).fill(col2)
            }
            )
        }
    },
    verticalstripes: (col1, col2) => {
        return (draw) => {
            return draw.pattern(32, 32, function (add) {
                add.rect(40, 40).fill(col1)
                add.line(4, -10, -16, 70).stroke({ width: 2, color: col2 })
                add.line(12, -10, -8, 70).stroke({ width: 2, color: col2 })
                add.line(20, -10, 0, 70).stroke({ width: 2, color: col2 })
                add.line(28, -10, 8, 70).stroke({ width: 2, color: col2 })
                add.line(36, -10, 16, 70).stroke({ width: 2, color: col2 })
                add.line(44, -10, 24, 70).stroke({ width: 2, color: col2 })
                add.line(52, -10, 32, 70).stroke({ width: 2, color: col2 })
            }   
            )
        }
    },
    gingham: (col1, col2) => {
        return (draw) => {
            return draw.pattern(32, 64, function (add) {
                add.rect(40, 64).fill(col1)
                add.line(4, -10, -16, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(12, -10, -8, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(20, -10, 0, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(28, -10, 8, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(36, -10, 16, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(44, -10, 24, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(52, -10, 32, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(60, -10, 40, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(68, -10, 48, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(76, -10, 56, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(84, -10, 64, 70).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(92, -10, 72, 70).stroke({ width: 4, color: col2, opacity:  0.4})

                add.line(-10, 0, 70, 0).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 8, 70, 8).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 16, 70, 16).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 24, 70, 24).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 32, 70, 32).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 40, 70, 40).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 48, 70, 48).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 56, 70, 56).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 64, 70, 64).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 72, 70, 72).stroke({ width: 4, color: col2, opacity:  0.4})
                add.line(-10, 80, 70, 80).stroke({ width: 4, color: col2, opacity:  0.4})
            }   
            )
/*             return draw.pattern(20, 20, function (add) {
                add.rect(20, 20).fill(col1)
                add.rect(5, 20).fill(col2)
                add.rect(20, 5).fill(col2)
                add.rect(2, 20).move(12, 0).fill(col2)
                add.rect(20, 2).move(0, 12).fill(col2)
            }
            ) */
        }
    },
    plaid: (col1, col2) => {
        return (draw) => {
            return draw.pattern(32, 64, function (add) {
                add.rect(40, 64).fill(col1)
                add.line(4, -10, -16, 70).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(12, -10, -8, 70).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(20, -10, 0, 70).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(28, -10, 8, 70).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(36, -10, 16, 70).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(44, -10, 24, 70).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(52, -10, 32, 70).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(60, -10, 40, 70).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(68, -10, 48, 70).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(76, -10, 56, 70).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(84, -10, 64, 70).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(92, -10, 72, 70).stroke({ width: 1, color: col2, opacity: 0.5 })

                add.line(-10, 0, 70, 0).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(-10, 8, 70, 8).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(-10, 16, 70, 16).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(-10, 24, 70, 24).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(-10, 32, 70, 32).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(-10, 40, 70, 40).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(-10, 48, 70, 48).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(-10, 56, 70, 56).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(-10, 64, 70, 64).stroke({ width: 4, color: col2, opacity: 0.5 })
                add.line(-10, 72, 70, 72).stroke({ width: 1, color: col2, opacity: 0.5 })
                add.line(-10, 80, 70, 80).stroke({ width: 4, color: col2, opacity: 0.5 })
            }   
            )
/*             return draw.pattern(20, 20, function (add) {
                add.rect(20, 20).fill(col1)
                add.rect(5, 20).fill(col2)
                add.rect(20, 5).fill(col2)
                add.rect(2, 20).move(12, 0).fill(col2)
                add.rect(20, 2).move(0, 12).fill(col2)
            }
            ) */
        }
    },
    rainbow: (col1, col2) => {
        return (draw) => {
            return draw.pattern(40, 21, function (add) {
                add.rect(40, 3).fill("rgb(200,40,40)")
                add.rect(40, 3).move(0, 3).fill(new Color({l: 80, c: 100, h: 30}).toHex())
                add.rect(40, 3).move(0, 6).fill(new Color({l: 85, c: 90, h: 80}).toHex())
                add.rect(40, 3).move(0, 9).fill(new Color({l: 85, c: 90, h: 120}).toHex())
                add.rect(40, 3).move(0, 12).fill(new Color({l: 75, c: 90, h: 200}).toHex())
                add.rect(40, 3).move(0, 15).fill(new Color({l: 50, c: 100, h: 250}).toHex())
                add.rect(40, 3).move(0, 18).fill(new Color({l: 40, c: 100, h: 310}).toHex())
            }
            )
        }
    },
    patches: (col1, col2) => {
        return (draw) => {
            return draw.pattern(60, 60, function (add) {
                add.rect(60, 60).fill(col1)

                add.rect(10, 15).move(0, 0).fill("rgb(50,100,255)").opacity(0.6)
                add.rect(20, 20).move(10, 15).fill("rgb(255,0,0)").opacity(0.3)
                add.rect(9, 9).move(20, 0).fill("rgb(0,255,0)").opacity(0.4)
                add.rect(16, 12).move(43, 45).fill("rgb(255,0,0)").opacity(0.3)

                add.rect(15, 20).move(40, 30).fill("rgb(200,255,0)").opacity(0.3)
                add.rect(15, 5).move(10, 10).fill("rgb(255,255,0)").opacity(0.4)
                add.rect(13, 15).move(30, 35).fill("rgb(0,0,255)").opacity(0.4)
                add.rect(15, 5).move(20, 35).fill("rgb(255,240,210)").opacity(0.4)
                add.rect(5, 8).move(15, 45).fill("rgb(255,0,255)").opacity(0.4)
                add.rect(8, 15).move(25, 50).fill("rgb(200,255,128)").opacity(0.4)
                add.rect(10, 15).move(5, 50).fill("rgb(0,255,0)").opacity(0.4)
                add.rect(15, 10).move(0, 35).fill("rgb(0,0,255)").opacity(0.4)
                add.rect(15, 10).move(-5, 20).fill("rgb(128,255,0)").opacity(0.4)
                add.rect(15, 10).move(55, 20).fill("rgb(128,255,0)").opacity(0.4)
            }
            )
        }
    },
    patchesmono: (col1, col2) => {
        return (draw) => {
            return draw.pattern(60, 60, function (add) {
                add.rect(60, 60).fill(col1)

                add.rect(10, 15).move(0, 0).fill("rgb(0,0,0)").opacity(0.6)
                add.rect(20, 20).move(10, 15).fill("rgb(255,255,220)").opacity(0.3)
                add.rect(9, 9).move(20, 0).fill("rgb(255,255,255)").opacity(0.4)
                add.rect(16, 12).move(43, 45).fill("rgb(255,220,255)").opacity(0.3)

                add.rect(15, 20).move(40, 30).fill("rgb(220,255,225)").opacity(0.3)
                add.rect(15, 5).move(10, 10).fill("rgb(0,0,0)").opacity(0.4)
                add.rect(13, 15).move(30, 35).fill("rgb(0,0,0)").opacity(0.4)
                add.rect(15, 5).move(20, 35).fill("rgb(255,240,240)").opacity(0.4)
                add.rect(5, 8).move(15, 45).fill("rgb(255,240,255)").opacity(0.4)
                add.rect(8, 15).move(25, 50).fill("rgb(20,0,0)").opacity(0.4)
                add.rect(10, 15).move(5, 50).fill("rgb(0,20,0)").opacity(0.4)
                add.rect(15, 10).move(0, 35).fill("rgb(0,0,20)").opacity(0.4)
                add.rect(15, 10).move(-5, 20).fill("rgb(255,255,0)").opacity(0.4)
                add.rect(15, 10).move(55, 20).fill("rgb(255,255,220)").opacity(0.4)
            }
            )
        }
    },
    dots: (col1, col2) => {
        return (draw) => {
            return draw.pattern(60, 60, function (add) {
                add.rect(60, 60).fill(col1)

                add.circle(10).move(0, 0).fill("rgb(50,100,255)").opacity(0.6)
                add.circle(20).move(10, 15).fill("rgb(255,192,0)").opacity(0.3)
                add.circle(9).move(20, 0).fill("rgb(0,255,0)").opacity(0.4)
                add.circle(16).move(43, 45).fill("rgb(255,192,0)").opacity(0.3)

                add.circle(15).move(40, 30).fill("rgb(200,255,0)").opacity(0.3)
                add.circle(15).move(10, 10).fill("rgb(255,255,0)").opacity(0.4)
                add.circle(13).move(30, 35).fill("rgb(0,0,255)").opacity(0.4)
                add.circle(15).move(20, 35).fill("rgb(255,240,210)").opacity(0.4)
                add.circle(10).move(15, 45).fill("rgb(255,0,255)").opacity(0.4)
                add.circle(8).move(25, 50).fill("rgb(200,255,128)").opacity(0.4)
                add.circle(10).move(5, 50).fill("rgb(0,255,0)").opacity(0.4)
                add.circle(15).move(0, 35).fill("rgb(0,0,255)").opacity(0.4)
                add.circle(15).move(-5, 20).fill("rgb(128,255,0)").opacity(0.4)
                add.circle(15).move(55, 20).fill("rgb(128,255,0)").opacity(0.4)
            }
            )
        }
    }
}

var titles = [
    "Black and white",
    "Black and an accent colour",
    "Neon colours",
    "Natural shades",
    "Contrasting colours",
    "Vivid primary colours",
    "Pale pastels",
    "Bright light colours",
    "Matching hues",
    "Reds and oranges",
    "Greens and teals",
    "Blues",
    "Purples and pinks",
    "Clashing colours",
    "Multicoloured"
]

var categories = [

    [
        { "top": "black", "bottom": monodenim(60) },
        { "top": patterns.stripes("white", "black"), "bottom": "black" },
        { "top": "black", "bottom": "rgb(30,30,30)" },
        { "top": "white", "bottom": denim(15) }
    ],
    [
        { "top": patterns.stripes("black", "hsl(345, 70%, 30%)"), "bottom": "black" },
        { "top": patterns.abstract('black', 'rgb(100,20,255)'), "bottom": monodenim(15), "seam": 'rgb(100,20,255)'},
        { "top": "black", "bottom": patterns.plaid(new Color(palletes.autumn[5]).toHex(), "rgb(30, 30, 30)") },
        { "top": monodenim(10), "bottom": new Color(palletes.earth[13]).toHex() },
        
    ],
    [
        { "top": patterns.abstract(new Color(palletes.neon[1]).toHex(), "black"), "bottom": "black", "seam": new Color(palletes.neon[1]).toHex()},
        { "top": patterns.patchesmono("rgb(128,0,255)", ""), "bottom": monodenim(20) },
        { "top": new Color(palletes.neon[3]).toHex(), "bottom": "white" },
        { "top": new Color(palletes.neon[2]).toHex() , "bottom": patterns.abstract2('black', 'rgb(0,255,255)') }
    ],



    [
        { "top": patterns.stripes(new Color(palletes.earth[14]).toHex(), {color: 'rgb(255,255,255)', "opacity": 0.2}) , "bottom": "rgb(60,60,60)" },
        { "top": new Color(palletes.earth[5]).toHex(), "bottom":  new Color(palletes.earth[6]).toHex()},
        { "top": "rgb(255,250,240)", "bottom": new Color(palletes.earth[4]).toHex() },
        { "top": patterns.plaid(new Color(palletes.earth[8]).toHex(), 'rgb(255,255,255)'), "bottom": denim(30), "seam": "rgb(190, 130, 0)" }
    ],
    [
        
        { "top": new Color(palletes.autumn[7]).toHex(), "bottom": new Color(palletes.autumn[4]).toHex()},
        { "top": new Color(palletes.autumn[5]).toHex(), "bottom": new Color(palletes.autumn[3]).toHex(), "middle": "white"},
        { "top": patterns.stripes("white", new Color(palletes.autumn[1]).toHex()), "bottom": "rgb(50,50,120)"},
        { "top": new Color(palletes.autumn[6]).toHex(), "bottom": monodenim(80)},
    ],
    [
        { "top": new Color(palletes.vivid[1]).toHex(), "bottom": patterns.verticalstripes("rgb(40,40,140)", "white") },
        { "top": new Color(palletes.vivid[5]).toHex(), "bottom": "rgb(255,250,240)" },
        { "top": new Color(palletes.vivid[2]).toHex(), "bottom": denim(25), "seam": "rgb(0, 130, 190)", "middle": patterns.stripes("white", new Color(palletes.vivid[2]).toHex()) },
        { "top": new Color(palletes.vivid[4]).toHex(), "bottom": new Color(palletes.vivid[6]).toHex() }
    ],


    [
        { "top": new Color(palletes.stuff[3]).toHex(), "bottom": "darkgrey" },
        { "top": patterns.thickstripes(new Color(palletes.stuff[9]).toHex(), 'rgb(240,233,230)'), "bottom": denim(70), "seam": "rgb(240, 212, 0)" },
        { "top": new Color(palletes.stuff[7]).toHex(), "bottom": new Color(palletes.stuff[4]).toHex() },
        { "top": new Color(palletes.stuff[5]).toHex(), "bottom": patterns.zigzag("white", {"color": "rgb(255,235,0)", "opacity": 0.3}) }
    ],
    [
        { "top": new Color(palletes.warmpastel[1]).toHex(), "bottom": monodenim(60), "middle": "white"},
        { "top": patterns.gingham(new Color(palletes.warmpastel[2]).toHex(),'rgb(128,192,255)'), "bottom": denim(60), "seam": {"color": "rgb(255, 255, 255)", "opacity": 0.5} },
        { "top": new Color(palletes.warmpastel[3]).toHex(), "bottom": "white" },
        { "top": patterns.stripes(new Color(palletes.warmpastel[0]).toHex(), "white"), "bottom": "rgb(40, 40, 100)" }
    ],
    [
        { "top": new Color({l: 60, c: 60, h: 200}).toHex(), "bottom": new Color({l: 40, c: 15, h: 200}).toHex() },
        { "bottom": patterns.patchesmono(new Color({l: 40, c: 20, h: 100}).toHex()), "top": new Color({l: 80, c: 15, h: 100}).toHex(), "middle": new Color({l: 95, c: 15, h: 100}).toHex() },
        { "top": patterns.thickstripes(new Color({l: 85, c: 15, h: 300}).toHex(), new Color({l: 98, c: 15, h: 300}).toHex()), "bottom": new Color({l: 30, c: 50, h: 300}).toHex()},
        { "top": new Color({l: 80, c: 40, h: 265}).toHex(), "bottom": denim(50), "seam": {"color": "rgb(255,255,255)", "opacity": 0.5} },
    ],



    [
        
        { "top": new Color(palletes.vivid[4]).toHex(), "bottom": patterns.zigzag(new Color(palletes.earth[12]).toHex(), "rgb(90,40,70)")},
        { "top": patterns.plaid("rgb(40, 40, 40)", "rgb(255, 100, 100)"), "bottom": new Color(palletes.earth[0]).toHex()},
        { "top": new Color(palletes.neon[4]).toHex(), "bottom": denim(25), "seam": "rgb(0, 130, 190)",},
        { "top": "black" , "bottom": patterns.polka(new Color(palletes.vivid[5]).toHex(),"white")},
    ],
    [
        { "top": "rgb(55,100,25)", "bottom": "rgb(229,220,200)"},
        { "top": new Color(palletes.autumn[1]).toHex(), "bottom": monodenim(10), "middle": patterns.stripes(new Color(palletes.vivid[0]).toHex(),new Color(palletes.autumn[1]).toHex()), "seam": {color: "rgb(255,255,255)", "opacity": 0.8}},
        { "top": patterns.abstract(new Color(palletes.autumn[0]).toHex(), "white"), "bottom": denim(45)},
        { "bottom": patterns.patchesmono(new Color(palletes.earth[3]).toHex(), ""), "top": new Color(palletes.earth[6]).toHex() },
    ],

    [
        { "top": new Color(palletes.autumn[7]).toHex(), "bottom": denim(35), "seam": "white" },
        { "top": patterns.stripes(new Color(palletes.earth[7]).toHex(), {color: "rgb(255,255,255)", "opacity": 0.4}), "bottom": new Color(palletes.earth[3]).toHex() },
        { "top": new Color(palletes.earth[11]).toHex(), "bottom": new Color(palletes.earth[9]).toHex() },
        { "top": "rgb(60,90,150)" , "bottom": "black", "middle": "rgb(120,150,200)" }
    ],

    [
        { "top": patterns.gingham(new Color(palletes.earth[13]).toHex(), 'rgb(255,255,255)'), "bottom": denim(30), "seam": "rgb(190, 130, 0)" },
        { "top": "rgb(120,40,250)", "bottom": denim(20), "middle": patterns.rainbow("","")},
        { "top": new Color(palletes.stuff[6]).toHex(), "middle": {"color": "rgb(255,255,255)", "opacity": 0.5}, "bottom": denim(70), "seam": "rgb(220, 80, 255)"},
        { "top": tiedie(300), "bottom": monodenim(25)},
        
    ],
    [
        
        { "top": patterns.thickstripes(new Color(palletes.autumn[0]).toHex(),"rgb(100,50,0)"), "bottom": denim(20)},
        { "bottom": patterns.verticalstripes(new Color(palletes.earth[14]).toHex(), {color: "rgb(60, 150, 120)", "opacity": 0.8}) ,"top": "rgb(235,220,180)" },
        { "top": patterns.stripes(new Color(palletes.vivid[1]).toHex(), new Color(palletes.vivid[5]).toHex()) , "bottom": denim(50)},
        { "top": patterns.polka("rgb(100,100,200)", "rgb(200,100,180)") ,"bottom": "rgb(255, 200, 0)" },
    ],
    [
        { "top": patterns.rainbow("white", "white") , "bottom": new Color(palletes.autumn[2]).toHex() },
        { "top": patterns.dots("white", ""), "bottom": "rgb(230,230,220)"},
        { "top": patterns.abstract2("black",{"color": "rgb(255,255,255)", "opacity": 0.2}), "bottom": patterns.dots("rgb(60,60,60)", "")},
        { "top": new Color(palletes.autumn[3]).toHex(), "bottom":  patterns.patches("rgb(125, 40, 90)", "")},
    ],

];



function randomChoice(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

function drawPerson(draw, x, y, top, bottom, middle, seam) {
    draw.rect(80, 120).x(x).y(y).attr({ "fill": background })
    draw.circle(20).x(x + 35).y(y + 10).attr({ "fill": randomChoice(fleshcolours) })
    draw.polygon([[x + 25, y + 30], [x + 65, y + 30], [x + 55, y + 70], [x + 15, y + 70]]).attr({ "fill": top })
    draw.polygon([[x + 25, y + 70], [x + 65, y + 70], [x + 55, y + 110], [x + 15, y + 110]]).attr({ "fill": bottom })
    if (middle)
    {
        draw.polygon([[x + 33, y + 40], [x + 55, y + 40], [x + 52, y + 50], [x + 30, y + 50]]).fill(middle)
    }
    if (seam)
    {
        console.log(seam)
        //draw.rect(x+40, y+40).fill(seam)
        draw.line(x + 20, y + 105, x + 55, y + 105).stroke({ width: 1, color: seam, "dasharray": "2,2" })
    }
}