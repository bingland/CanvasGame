// * select canvas
const cvs = document.getElementById('game')
const c = cvs.getContext('2d')

//canvas height and width
//cvs.width = innerWidth
//cvs.height = innerHeight 


// * global vars
let frames = 0


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

// * UPDATE 
const update = () => {
    cat.update()
}

// * DRAW
const draw = () => {
    c.fillStyle = "#936DE8"
    c.fillRect(0,0,cvs.width,cvs.height)

    c.beginPath()
    c.arc(95, 50, 40, 0, 2 * Math.PI)
    c.stroke()

    cat.draw()
}

// * MAIN LOOP
const loop = () => {
    update()
    draw()
    frames++
    requestAnimationFrame(loop)
}
loop()