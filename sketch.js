var boardWidth = 8;
var boardHeight = 8;
var tileSize = 100;
var board;
var moving = false;
var movingPiece;
var piecesPos;
var whiteTurn = true;
var images = [];

function setup(){
    createCanvas(tileSize * boardWidth, tileSize * boardHeight);
    board = new Board();
    board.initializePieces();

    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png`));
    images.push(loadImage(`https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png`));
}

function draw(){
    background(100);
    showGrid();
    board.show();
}

function showGrid(){
    for(let i = 0; i < boardHeight; i++){
        for(let j = 0; j < boardWidth; j++){
            if((i+j) % 2 == 0){
                fill(255, 255, 255);
            }else{
                fill(75,75,75);
            }

            rect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }

}

function mousePressed(){
    var x = floor(mouseX / tileSize);
    var y = floor(mouseY / tileSize);

    if(!moving){
        movingPiece = board.getPiece(x,y);
        if(movingPiece !== undefined){
            if(whiteTurn === movingPiece.isWhite){
                moving = true;
                board.deselectAll();
                piecesPos = board.findPieces();
                movingPiece.setSelected(piecesPos);
            }

        }
    }else{
        if(movingPiece.x !== x || movingPiece.y !== y){
            movingPiece.move(x,y, board);
            board.deselectAll();
            moving = false;
        }else{
            moving = false;
            board.deselectAll();
        }

    }
}