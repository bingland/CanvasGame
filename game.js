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
            //console.log('let go of right!')
            rightPressed = false
            break
        case 37:
        case 65:
            //console.log('let go of left!')
            leftPressed = false
            break
        case 32:
            //console.log('let go of space!')
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
    x: Math.floor(cvs.width/2 - (99/2)),
    y: cvs.height - 110,
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

        // detect if ball touches cat
        if(ball.y + ball.h > this.y + 30 && ball.x + ball.w > this.x && ball.x < this.x + this.w && ball.y < this.y + 25) {
            //change direction based on where it hits
            let collPoint = (cat.x + cat.w) - (ball.x + ball.w/2)
            console.log(collPoint)

            //range from -10.5 to 109.5 || 30
            // TODO: clean this up
            if (collPoint < 20) {
                if(cat.dir == 'left') {
                    ball.dy = -2
                    if (ball.dx > 0) {
                        ball.dx = 4
                    } else {
                        ball.dx = -4
                    }
                }
                if(cat.dir == 'right') {
                    ball.dy = -2
                    if (ball.dx > 0) {
                        ball.dx = 4
                    } else {
                        ball.dx = -4
                    }
                }
                
            } 
            else if (collPoint >= 20 && collPoint <= 90) {
                ball.dy = -3
                if (ball.dx > 0) {
                    ball.dx = 3
                } else {
                    ball.dx = -3
                }
            }
            else if (collPoint > 90) {
                if (cat.dir == 'left') {
                    ball.dy = -2
                    if (ball.dx > 0) {
                        ball.dx = 4
                    } else {
                        ball.dx = -4
                    }
                }
                if (cat.dir == 'right') {
                    ball.dy = -2
                    if (ball.dx > 0) {
                        ball.dx = 4
                    } else {
                        ball.dx = -4
                    }
                }
            }
        }
    }
}

// * ball
const ball = {
    sX: 54,
    sY: 148,
    w: 27,
    h: 27, 
    x: cvs.width / 2,
    y: cvs.height / 2,
    dx: 3,
    dy: 3,
    frame: 0,

    draw: function () {
        c.drawImage(sprites, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    },
    
    update: function () {
        // check to see if ball makes contact with the edges of the screen
        if (this.y + this.h >= cvs.height) {
            // console.log('GAME OVER!')
            // off bottom
            
        }
        if (this.x + this.h >= cvs.width) {
            // off right
            this.dx = -this.dx
        }
        if (this.y <= 0) {
            // off top screen
            this.dy = -this.dy
        }
        if (this.x <= 0) {
            // off left screen
            this.dx = -this.dx
        }
        
        this.x += this.dx
        this.y += this.dy
    }
}

// * bricks
const bricks = {
    list: [],

    barrier: {
        sX: 99,
        sY: 0
    },
    block1: {
        sX: 99,
        sY: 41
    },
    block2: {
        sX: 99,
        sY: 82
    },
    w: 57,
    h: 41,

    draw: function () {
        for (let i = 0; i < this.list.length; i++) {
            
            let blockType = this.list[i].type

            // check the type of block
            switch (blockType) {
                case -1:
                    c.drawImage(sprites, this.barrier.sX, this.barrier.sY, this.w, this.h, this.list[i].x, this.list[i].y, this.w, this.h)
                    break
                case 1:
                    c.drawImage(sprites, this.block1.sX, this.block1.sY, this.w, this.h, this.list[i].x, this.list[i].y, this.w, this.h)
                    break
                case 2: 
                c.drawImage(sprites, this.block2.sX, this.block2.sY, this.w, this.h, this.list[i].x, this.list[i].y, this.w, this.h)
                    break
            }
        }
    },

    update: function () {
        // check to see if the ball makes contact with the brick
        if (ball.y < cvs.height / 2) {
            for (let i = 0; i < this.list.length; i++) {
                
                if((this.list[i].type > 0 || this.list[i].type == -1) && ball.x < this.list[i].x + this.w && ball.x + ball.w > this.list[i].x && ball.y < this.list[i].y + this.h && ball.y + ball.h > this.list[i].y) {
                    console.log('CONTACT')
                    if(ball.y <= this.list[i].y) {
                        if(this.list[i].type !== -1 && this.list[i].type !== 0){ this.list[i].type -= 1 }
                        ball.dy = -ball.dy
                    }
                    //Hit was from below the brick

                    if(ball.y >= this.list[i].y){
                        if(this.list[i].type !== -1 && this.list[i].type !== 0){ this.list[i].type -= 1 }
                        ball.dy = -ball.dy

                    }
                    //Hit was from above the brick

                    if(ball.x < this.list[i].x){
                        if(this.list[i].type !== -1 && this.list[i].type !== 0){ this.list[i].type -= 1 }
                        ball.dx = -ball.dx
                    }
                    //Hit was on left

                    if(ball.x > this.list[i].x){
                        if(this.list[i].type !== -1 && this.list[i].type !== 0){ this.list[i].type -= 1 }
                        ball.dx = -ball.dx
                    }

                    //Hit was on right

                    /*
                    // direction: up right
                    if (ball.dx > 0 && ball.dy < 0) {
                        this.list[i].type -= 1
                        ball.dx = -ball.dx
                    }
                    // direction: up left
                    else if (ball.dx < 0 && ball.dy < 0) {
                        this.list[i].type -= 1
                        ball.dy = -ball.dy
                    }
                    // direction: down right
                    else if (ball.dx > 0 && ball.dy > 0) {
                        this.list[i].type -= 1
                        ball.dy = -ball.dy
                    }
                    // direction: down left
                    else if (ball.dx < 0 && ball.dy > 0) {
                        this.list[i].type -= 1
                        ball.dy = -ball.dy
                    }
                    */
                }
                
            }
        }
    }
}


// * level data
const levelData = [
    // * 6 blocks per row
    // * [total, level1, level2, etc...]

    //level 1
    // TODO: take into mind certain patterns or pictures that you want to make. randomizing may not be what you want
    [
        [0, 1, 2, 1, 2, 1, 0],
        [0, 2, 2, 1, 1, 2, 0],
        [0, 1, 2, 2, 1, 1, 0],
        [0, 1, 1, -1, 1, -1, 0]
    ]
]

// * init level
const initLevel = () => {
    // variables for placement of bricks
    
    let totalBlocks = levelData[level-1].length * 7
    let columns = 7
    let rows = totalBlocks / columns
    let xGap = 3
    let yGap = xGap
    let xOffset = 0
    let yOffset = xOffset


    for (let i = 0; i < rows; i++) {
        // rows
        let yLoc = (i * (39 + yGap)) + yOffset

        for (let j = 0; j < columns; j++) {
            // columns
            // push new brick
            let xLoc = (j * (54 + xGap)) + xOffset

            // * decide the level of block according to something


            bricks.list.push({
                type: levelData[level-1][i][j],
                x: xLoc,
                y: yLoc
            })
        }
    }
}

// * UPDATE 
const update = () => {
    cat.update()
    bricks.update()
    ball.update()
}

// * DRAW
const draw = () => {
    c.clearRect(0, 0, cvs.width, cvs.height);
    //bg.draw()

    cat.draw()
    bricks.draw()
    ball.draw()
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
