let screen = document.createElement('Screen')
let ctx = screen.getContext('2d')

let main = {
    grid:16,
    count:0,
    snake1:{x:160,y:160,dx:main.grid,dy:0,com:[],comMax:4},
    snake2:{x:160,y:160,dx:main.grid,dy:0,com:[],comMax:4},
    apple:{x:320,y:320}
}