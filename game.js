// * select canvas
const cvs = document.getElementById('game')
const c = cvs.getContext('2d')

//canvas height and width
//cvs.width = innerWidth
//cvs.height = innerHeight 


// * global vars
let frames = 0
let level = 1


// * sprite sheet
const sprites = new Image()
sprites.src = './assets/sprites.png'

// * controls
let rightPressed = false
let leftPressed = false
let spacePressed = false
let spaceLetGo = true // * why?

document.addEventListener('keydown', function(e){
    //console.log(e.keyCode)
    switch (e.keyCode) {
        case 39: 
        case 68:
            console.log('going right!')
            rightPressed = true
            break
        case 37:
        case 65:
            console.log('going left!')
            leftPressed = true
            break
        case 32:
            console.log('pushing space!')
            spacePressed = true
            break
    }
})
document.addEventListener('keyup', function(e){
    //console.log(e.keyCode)
    switch (e.keyCode) {
        case 39: 
        case 68:
            console.log('let go of right!')
            rightPressed = false
            break
        case 37:
        case 65:
            console.log('let go of left!')
            leftPressed = false
            break
        case 32:
            console.log('let go of space!')
            spacePressed = false
            break
    }
})

// * background 
const bg = {
    sX: 99, 
    sY: 0,
    w: 400,
    h: 650,
    x: 0,
    y: 0,

    draw: function () {
        c.drawImage(sprites, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }
}

// * cat
const cat = {
    leftMovement: [{sX: 0, sY: 0}],
    rightMovement: [{sX: 0, sY: 74}],
    dir: 'right',
    w: 99,
    h: 74,
    x: cvs.width/2 - (99/2),
    y: cvs.height - 100,
    dx: 2,
    frame: 0,

    // TODO: move control values inside of cat ? maybe

    draw: function () {
        let catFrame;
        // choose right or left direction sprites
        if (this.dir == 'right') {
            catFrame = this.rightMovement[this.frame]
        }
        if (this.dir == 'left') {
            catFrame = this.leftMovement[this.frame]
        }
        c.drawImage(sprites, catFrame.sX, catFrame.sY, this.w, this.h, this.x, this.y, this.w, this.h)

    },
    update: function () {
        // update cat based on keys
        let origDir = this.dir
        if(rightPressed) {
            this.x += this.dx
            this.dir = 'right'
        }
        if(leftPressed) {
            this.x -= this.dx
            this.dir = 'left'
        }
        //prevents weird cat turning around thing when both buttons are pressed
        if(rightPressed && leftPressed) {
            this.dir = origDir
        }
    }
}

// * bricks
const bricks = {
    map: [],

    block1: {
        sX: 0,
        sY: 148
    },
    block2: {
        sX: 0,
        sY: 187
    },
    w: 54,
    h: 39,

    draw: function () {
        for (let i = 0; i < this.map.length; i++) {
            
            let blockType = this.map[i].type

            // check the type of block
            switch (blockType) {
                case 1:
                    c.drawImage(sprites, this.block1.sX, this.block1.sY, this.w, this.h, this.map[i].x, this.map[i].y, this.w, this.h)
                    break
                case 2: 
                c.drawImage(sprites, this.block2.sX, this.block2.sY, this.w, this.h, this.map[i].x, this.map[i].y, this.w, this.h)
                    break
            }
        }
    },

    update: function () {

    }
}


// * level data
const levelData = [
    // * 6 blocks per row
    // * [total, level1, level2, etc...]

    //level 1
    [18, 6, 6] // TODO: take into mind certain patterns or pictures that you want to make. randomizing may not be what you want
]

// * init level
const initLevel = () => {
    // variables for placement of bricks
    let totalBlocks = levelData[level - 1][0]
    let columns = 7
    let rows = totalBlocks / columns
    let xGap = 3
    let yGap = xGap
    let xOffset = 2
    let yOffset = xOffset


    for (let i = 0; i < rows; i++) {
        // rows
        let yLoc = (i * (39 + yGap)) + yOffset

        for (let j = 0; j < columns; j++) {
            // columns
            // push new brick
            let xLoc = (j * (54 + xGap)) + xOffset

            // * decide the level of block according to something


            bricks.map.push({
                type: 1,
                x: xLoc,
                y: yLoc
            })
        }
    }
}

// * UPDATE 
const update = () => {
    cat.update()
}

// * DRAW
const draw = () => {
    c.clearRect(0, 0, cvs.width, cvs.height);
    bg.draw()

    cat.draw()
    bricks.draw()
}

// * MAIN LOOP
const loop = () => {
    update()
    draw()
    frames++
    requestAnimationFrame(loop)
}
initLevel()
loop()
