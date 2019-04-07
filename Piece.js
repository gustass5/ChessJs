class Piece{
    constructor(x, y, isWhite){

        this.position = createVector(x * tileSize, y * tileSize);
        this.iconPosition = createVector(x * tileSize + 50, y * tileSize + 50);
        
        this.isWhite = isWhite;
        this.name;
        this.img;
        this.isSelected;
        
    }

    show(){
        textSize(30);
        if(this.isWhite){
            fill(255);
            stroke(0);
        }else{
            fill(0);
            stroke(255);
        }
        textAlign(CENTER, CENTER);

        //text(this.name, this.iconPosition.x, this.iconPosition.y);

    }

}

class King extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite);
        this.x = x;
        this.y = y;
        this.name = 'K';
        this.isSelected = false;
        this.piecesPos;
        this.availableMoves = [
            [1,0],
            [-1,0],
            [0,1],
            [0,-1],
            [1,1],
            [-1,-1],
            [-1,1],
            [1,-1]
        ];
    }

    show(){
        super.show();
        if(this.isSelected){
            this.showSelected();
        }
        if(this.isWhite){
            image(images[3], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }else{
            image(images[2], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }

    }

    getIsWhite(){
        return this.isWhite;
    }

    deselect(){
        this.isSelected = false;
    }

    setSelected(piecesPos){
        this.isSelected = true;
        this.piecesPos = piecesPos;
    }

    showSelected(){
        let canMove;
        let canAttack;
        for(let i = 0; i < this.availableMoves.length; i++){
            canMove = true;
            canAttack = false;
            this.piecesPos.forEach((pos) => {
                if(pos.x === this.x + this.availableMoves[i][0] && pos.y === this.y + this.availableMoves[i][1] && pos.isWhite === this.isWhite){
                    canMove = false;
                }else if(pos.x === this.x + this.availableMoves[i][0] && pos.y === this.y + this.availableMoves[i][1] && pos.isWhite !== this.isWhite){
                    canAttack = true;
                }
            })
                if(canMove){
                    if(canAttack){
                        fill(210, 0, 60);
                    }else{
                        fill(210, 0, 0);
                    }
                    let x = (this.x + this.availableMoves[i][0]) * tileSize + 50;
                    let y = (this.y + this.availableMoves[i][1]) * tileSize + 50;
                    ellipse(x, y, 15, 15);
                }
        }
    }

    move(x, y, board){
        let canMove = true;
        let canAttack = false;

        this.piecesPos.forEach((pos) => {
            if(x === pos.x && y === pos.y){
                if(pos.isWhite === this.isWhite){
                    canMove = false;
                }else if(pos.isWhite !== this.isWhite){
                    canAttack = true;
                }
            }
        });

        if(canMove || canAttack){
            canMove = false;
            for(let i = 0; i < this.availableMoves.length; i++){
                if(x === this.x + this.availableMoves[i][0] && y === this.y + this.availableMoves[i][1]){
                    canMove = true;
                    break;
                }
            }
        }

        if(canMove){
            if(x >= boardWidth || x < 0 || y >= boardHeight || y < 0){
                canMove = false;
            }
        }

        if(canAttack){
            board.deletePiece(x, y);
        }

        if(canMove){
            this.position = createVector(x * tileSize, y * tileSize);
            this.iconPosition = createVector(x * tileSize + 50, y * tileSize + 50);
            this.x = x;
            this.y = y;
            whiteTurn = !whiteTurn;

        }

    }

}

class Queen extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite);
        this.x = x;
        this.y = y;
        this.name = 'Q';
        this.isSelected = false;

        this.movement = [
            {x: 0, y:-1},        //moveN
            {x: 0, y: 1},       //moveS
            {x:-1, y: 0},      // moveW
            {x: 1, y: 0},     // moveE
            {x:-1, y:-1},    // moveNW
            {x:-1, y:1},    // moveNE
            {x:1, y:1},    // moveSE
            {x:1, y:-1}   // moveSW
        ]
    }

    show(){
        super.show();
        if(this.isSelected){
            this.showSelected();
        }

        if(this.isWhite){
            image(images[9], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }else{
            image(images[8], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }
    }

    getIsWhite(){
        return this.isWhite;
    }

    deselect(){
        this.isSelected = false;
    }
    
    setSelected(piecesPos){
        this.isSelected = true;
        this.piecesPos = piecesPos;
    }

    showSelected(){
        let canMove;
        let canAttack;
        let tempX, tempY;

        for(let i = 0; i < this.movement.length; i++){
            tempX = this.x;
            tempY = this.y;
            canAttack = false;
            for(let j = 0; j < 8; j++){
                canMove = true;
                this.piecesPos.forEach((pos) => {
                    if(pos.x === tempX + this.movement[i].x && pos.y === tempY + this.movement[i].y){
                        canMove = false;
                        if(pos.isWhite !== this.isWhite){
                            canAttack = true;
                        }
                    }
                });
    
                    if(canMove){
                        tempX = tempX + this.movement[i].x;
                        tempY = tempY + this.movement[i].y;
    
                        fill(210, 0, 0);
                        let x = tempX * tileSize + 50;
                        let y = tempY * tileSize + 50;
                        ellipse(x, y, 15, 15);
                    }else if(canAttack){
                        tempX = tempX + this.movement[i].x;
                        tempY = tempY + this.movement[i].y;

                        fill(210, 0, 60);
                        let x = tempX * tileSize + 50;
                        let y = tempY * tileSize + 50;
                        ellipse(x, y, 15, 15);
                        break;
                    }else{
                        break;
                    }
            }
        }

    }

    move(x, y, board){
        let canMove = true;
        let canGoForward;
        let tempX, tempY;

        for(let i = 0; i < this.movement.length; i++){
            //print("=== Main Loop===");
            tempX = this.x;
            tempY = this.y;
            canGoForward = true;
            for(let j = 0; j < 8; j++){
               // print("===secondLoop===")
                if(!canGoForward){
                    break;
                }
                tempX = tempX + this.movement[i].x;
                tempY = tempY + this.movement[i].y;

                //print(tempX, tempY);
                this.piecesPos.forEach((pos) => {
                   // print("==Checking pieces first Loop==")
                    if(tempX === pos.x && tempY === pos.y){
                       // print("Pressed on piece");
                        if(this.isWhite === pos.isWhite){
                            canGoForward = false;
                           // print("piece is the same color");
                        }else{
                            //print("piece is different color");
                            if(tempX === x && tempY === y){
                                canGoForward = true;
                              //  print("DIferrent color piece, attack");
                            }else{    
                                canGoForward = false;
                             //   print("different color piece, cant attack");
                            }
                        }
                        
                    }
                });
                //print("CanGoForward: ", canGoForward);
                
                if(x === tempX && y === tempY && canGoForward){
                    this.piecesPos.forEach((pos) => {
                        if(pos.x === x && pos.y === y){
                            if(pos.isWhite === this.isWhite){
                                canMove = false;
                            }
                        }
                    });
                    //print("CanMove: ", canMove);
                    if(canMove){
                            board.deletePiece(x, y);

                            this.position = createVector(x * tileSize, y * tileSize);
                            this.iconPosition = createVector(x * tileSize + 50, y * tileSize + 50);
                            this.x = x;
                            this.y = y;
                            whiteTurn = !whiteTurn;

                    }
                }else if(x === tempX && y === tempY && !canGoForward){
                  //  print("breaking second loop")
                    break;
                }

            }
        }



    }

}

class Knight extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite);
        this.x = x;
        this.y = y;
        this.name = 'Kn';
        this.isSelected = false;
        this.availableMoves = [
            [1, 2],
            [-1, 2],
            [2, 1],
            [-2, 1],
            [1, -2],
            [-1, -2],
            [2, -1],
            [-2, -1],
        ];
    }

    show(){
        super.show();
        if(this.isSelected){
            this.showSelected();
        }

        if(this.isWhite){
            image(images[5], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }else{
            image(images[4], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }
    }

    getIsWhite(){
        return this.isWhite;
    }

    deselect(){
        this.isSelected = false;
    }

    setSelected(piecesPos){
        this.isSelected = true;
        this.piecesPos = piecesPos;
    }

    showSelected(){
        let canMove;
        let canAttack;
        for(let i = 0; i < this.availableMoves.length; i++){
            canMove = true;
            canAttack = false;
            this.piecesPos.forEach((pos) => {
                if(pos.x === this.x + this.availableMoves[i][0] && pos.y === this.y + this.availableMoves[i][1]){
                    canMove = false;
                    if(pos.isWhite !== this.isWhite){
                        canAttack = true;
                    }
                }
            })
                if(canMove){
                    fill(210, 0, 0);
                    let x = (this.x + this.availableMoves[i][0]) * tileSize + 50;
                    let y = (this.y + this.availableMoves[i][1]) * tileSize + 50;
                    ellipse(x, y, 15, 15);
                }else if(canAttack){
                    fill(210, 0, 60);
                    let x = (this.x + this.availableMoves[i][0]) * tileSize + 50;
                    let y = (this.y + this.availableMoves[i][1]) * tileSize + 50;
                    ellipse(x, y, 15, 15);
                }
        }
    }

    move(x, y, board){
        let canMove = true;
        let canAttack = false;

        this.piecesPos.forEach((pos) => {
            if(x === pos.x && y === pos.y){
                canMove = false;

                if(this.isWhite !== pos.isWhite){
                    canAttack = true;
                }
            }
        });

        if(canMove || canAttack){
            canMove = false;
            for(let i = 0; i < this.availableMoves.length; i++){
                if(x === this.x + this.availableMoves[i][0] && y === this.y + this.availableMoves[i][1]){
                    canMove = true;
                    break;
                }
            }
        }

        if(canMove){
            if(x >= boardWidth || x < 0 || y >= boardHeight || y < 0){
                canMove = false;
            }
        }

        if(canMove && canAttack){
            board.deletePiece(x, y);
            this.position = createVector(x * tileSize, y * tileSize);
            this.iconPosition = createVector(x * tileSize + 50, y * tileSize + 50);
            this.x = x;
            this.y = y;
            whiteTurn = !whiteTurn;

        }else if(canMove){
            this.position = createVector(x * tileSize, y * tileSize);
            this.iconPosition = createVector(x * tileSize + 50, y * tileSize + 50);
            this.x = x;
            this.y = y;
            whiteTurn = !whiteTurn;

        }


    }

}

class Bishop extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite);
        this.name = 'B';
        this.x = x;
        this.y = y;
        this.isSelected = false;
        this.movement = [
            {x:-1, y:-1},     // moveNW
            {x:-1, y: 1},    // moveNE
            {x:1, y:-1},    // moveSE
            {x:1, y:1}     // moveSW
        ]
    }

    show(){
        super.show();
        if(this.isSelected){
            this.showSelected();
        }

        if(this.isWhite){
            image(images[1], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }else{
            image(images[0], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }
    }

    getIsWhite(){
        return this.isWhite;
    }

    deselect(){
        this.isSelected = false;
    }

    setSelected(piecesPos){
        this.isSelected = true;
        this.piecesPos = piecesPos;
    }

    showSelected(){
        let canMove;
        let canAttack;
        let tempX, tempY;

        for(let i = 0; i < this.movement.length; i++){
            tempX = this.x;
            tempY = this.y;
            canAttack = false;
            for(let j = 0; j < 8; j++){
                canMove = true;
                this.piecesPos.forEach((pos) => {
                    if(pos.x === tempX + this.movement[i].x && pos.y === tempY + this.movement[i].y){
                        canMove = false;
                        if(pos.isWhite !== this.isWhite){
                            canAttack = true;
                        }
                    }
                });
    
                    if(canMove){
                        tempX = tempX + this.movement[i].x;
                        tempY = tempY + this.movement[i].y;
    
                        fill(210, 0, 0);
                        let x = tempX * tileSize + 50;
                        let y = tempY * tileSize + 50;
                        ellipse(x, y, 15, 15);
                    }else if(canAttack){
                        tempX = tempX + this.movement[i].x;
                        tempY = tempY + this.movement[i].y;

                        fill(210, 0, 60);
                        let x = tempX * tileSize + 50;
                        let y = tempY * tileSize + 50;
                        ellipse(x, y, 15, 15);
                        break;
                    }else{
                        break;
                    }
            }
        }

    }

    move(x, y, board){
        let canMove = true;
        let canGoForward;
        let tempX, tempY;

        for(let i = 0; i < this.movement.length; i++){
            //print("=== Main Loop===");
            tempX = this.x;
            tempY = this.y;
            canGoForward = true;
            for(let j = 0; j < 8; j++){
               // print("===secondLoop===")
                if(!canGoForward){
                    break;
                }
                tempX = tempX + this.movement[i].x;
                tempY = tempY + this.movement[i].y;

                //print(tempX, tempY);
                this.piecesPos.forEach((pos) => {
                   // print("==Checking pieces first Loop==")
                    if(tempX === pos.x && tempY === pos.y){
                       // print("Pressed on piece");
                        if(this.isWhite === pos.isWhite){
                            canGoForward = false;
                           // print("piece is the same color");
                        }else{
                            //print("piece is different color");
                            if(tempX === x && tempY === y){
                                canGoForward = true;
                              //  print("DIferrent color piece, attack");
                            }else{    
                                canGoForward = false;
                             //   print("different color piece, cant attack");
                            }
                        }
                        
                    }
                });
                //print("CanGoForward: ", canGoForward);
                
                if(x === tempX && y === tempY && canGoForward){
                    this.piecesPos.forEach((pos) => {
                        if(pos.x === x && pos.y === y){
                            if(pos.isWhite === this.isWhite){
                                canMove = false;
                            }
                        }
                    });
                    //print("CanMove: ", canMove);
                    if(canMove){
                            board.deletePiece(x, y);

                            this.position = createVector(x * tileSize, y * tileSize);
                            this.iconPosition = createVector(x * tileSize + 50, y * tileSize + 50);
                            this.x = x;
                            this.y = y;
                            whiteTurn = !whiteTurn;

                    }
                }else if(x === tempX && y === tempY && !canGoForward){
                  //  print("breaking second loop")
                    break;
                }

            }
        }



    }

}

class Rook extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite);
        this.name = 'R';
        this.x = x;
        this.y = y;
        this.isSelected = false;
        this.movement = [
            {x: 0, y:-1},    //moveN
            {x: 0, y: 1},   //moveS
            {x:-1, y: 0},  // moveW
            {x: 1, y: 0}, // moveE
        ]
    }

    show(){
        super.show();
        if(this.isSelected){
            this.showSelected();
        }
        if(this.isWhite){
            image(images[11], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }else{
            image(images[10], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }
    }

    getIsWhite(){
        return this.isWhite;
    }

    deselect(){
        this.isSelected = false;
    }

    setSelected(piecesPos){
        this.isSelected = true;
        this.piecesPos = piecesPos;
    }

    showSelected(){
        let canMove;
        let canAttack;
        let tempX, tempY;

        for(let i = 0; i < this.movement.length; i++){
            tempX = this.x;
            tempY = this.y;
            canAttack = false;
            for(let j = 0; j < 8; j++){
                canMove = true;
                this.piecesPos.forEach((pos) => {
                    if(pos.x === tempX + this.movement[i].x && pos.y === tempY + this.movement[i].y){
                        canMove = false;
                        if(pos.isWhite !== this.isWhite){
                            canAttack = true;
                        }
                    }
                });
    
                    if(canMove){
                        tempX = tempX + this.movement[i].x;
                        tempY = tempY + this.movement[i].y;
    
                        fill(210, 0, 0);
                        let x = tempX * tileSize + 50;
                        let y = tempY * tileSize + 50;
                        ellipse(x, y, 15, 15);
                    }else if(canAttack){
                        tempX = tempX + this.movement[i].x;
                        tempY = tempY + this.movement[i].y;

                        fill(210, 0, 60);
                        let x = tempX * tileSize + 50;
                        let y = tempY * tileSize + 50;
                        ellipse(x, y, 15, 15);
                        break;
                    }else{
                        break;
                    }
            }
        }

    }

    move(x, y, board){
        let canMove = true;
        let canGoForward;
        let tempX, tempY;

        for(let i = 0; i < this.movement.length; i++){
            //print("=== Main Loop===");
            tempX = this.x;
            tempY = this.y;
            canGoForward = true;
            for(let j = 0; j < 8; j++){
               // print("===secondLoop===")
                if(!canGoForward){
                    break;
                }
                tempX = tempX + this.movement[i].x;
                tempY = tempY + this.movement[i].y;

                //print(tempX, tempY);
                this.piecesPos.forEach((pos) => {
                   // print("==Checking pieces first Loop==")
                    if(tempX === pos.x && tempY === pos.y){
                       // print("Pressed on piece");
                        if(this.isWhite === pos.isWhite){
                            canGoForward = false;
                           // print("piece is the same color");
                        }else{
                            //print("piece is different color");
                            if(tempX === x && tempY === y){
                                canGoForward = true;
                              //  print("DIferrent color piece, attack");
                            }else{    
                                canGoForward = false;
                             //   print("different color piece, cant attack");
                            }
                        }
                        
                    }
                });
                //print("CanGoForward: ", canGoForward);
                
                if(x === tempX && y === tempY && canGoForward){
                    this.piecesPos.forEach((pos) => {
                        if(pos.x === x && pos.y === y){
                            if(pos.isWhite === this.isWhite){
                                canMove = false;
                            }
                        }
                    });
                    //print("CanMove: ", canMove);
                    if(canMove){
                            board.deletePiece(x, y);

                            this.position = createVector(x * tileSize, y * tileSize);
                            this.iconPosition = createVector(x * tileSize + 50, y * tileSize + 50);
                            this.x = x;
                            this.y = y;
                            whiteTurn = !whiteTurn;

                    }
                }else if(x === tempX && y === tempY && !canGoForward){
                  //  print("breaking second loop")
                    break;
                }

            }
        }



    }

}

class Pawn extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite);
        this.name = 'P';
        this.x = x;
        this.y = y;
        this.isSelected = false;
        this.firstMove = true;
        this.availableMoves = [
            [0,1],
            [0,2],
            [0,-1],
            [0,-2],
        ];
        this.attackMoves = [
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1]
        ];
    }

    show(){
        super.show();
        if(this.isSelected){
            this.showSelected();
        }

        if(this.isWhite){
            image(images[7], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }else{
            image(images[6], this.iconPosition.x - 30, this.iconPosition.y - 30);
        }
    }

    getIsWhite(){
        return this.isWhite;
    }

    deselect(){
        this.isSelected = false;
    }

    setSelected(piecesPos){
        this.isSelected = true;
        this.piecesPos = piecesPos;
    }

    showSelected(){
        let canFirstMove = true;
        let canMove = true;
        let i;

        if(!this.isWhite){
            i = 0;
        }else{
            i = 2;
        }

        if(this.firstMove){
            this.piecesPos.forEach((pos) => {
                if(pos.x === this.x + this.availableMoves[i][0] && pos.y === this.y + this.availableMoves[i][1]){
                    canMove = false;
                    canFirstMove = false;
                }
            });

            if(canMove){
                this.piecesPos.forEach((pos) => {
                    if(pos.x === this.x + this.availableMoves[i+1][0] && pos.y === this.y + this.availableMoves[i+1][1]){
                        canFirstMove = false;
                    }
                });
            }

            if(canMove){
                fill(210, 0, 0);
                let x = (this.x + this.availableMoves[i][0]) * tileSize + 50;
                let y = (this.y + this.availableMoves[i][1]) * tileSize + 50;
                ellipse(x, y, 15, 15);
            }

            if(canFirstMove){
                fill(210, 0, 0);
                let x = (this.x + this.availableMoves[i+1][0]) * tileSize + 50;
                let y = (this.y + this.availableMoves[i+1][1]) * tileSize + 50;
                ellipse(x, y, 15, 15);
            }
        }else{
            this.piecesPos.forEach((pos) => {
                if(pos.x === this.x + this.availableMoves[i][0] && pos.y === this.y + this.availableMoves[i][1]){
                    canMove = false;
                }
            });

            if(canMove){
                fill(210, 0, 0);
                let x = (this.x + this.availableMoves[i][0]) * tileSize + 50;
                let y = (this.y + this.availableMoves[i][1]) * tileSize + 50;
                ellipse(x, y, 15, 15);
            }
        }

        if(this.isWhite){
            this.piecesPos.forEach((pos) => {
                if(pos.x === this.x - 1 && pos.y === this.y - 1 && !pos.isWhite){
                    fill(210, 0, 0);
                    let x = (this.x - 1) * tileSize + 50;
                    let y = (this.y - 1) * tileSize + 50;
                    ellipse(x, y, 15, 15);
                }else if(pos.x === this.x + 1 && pos.y === this.y - 1 && !pos.isWhite){
                    fill(210, 0, 0);
                    let x = (this.x + 1) * tileSize + 50;
                    let y = (this.y - 1) * tileSize + 50;
                    ellipse(x, y, 15, 15);
                }
            });
        }else{
            this.piecesPos.forEach((pos) => {
                if(pos.x === this.x - 1 && pos.y === this.y + 1 && pos.isWhite){
                    fill(210, 0, 0);
                    let x = (this.x - 1) * tileSize + 50;
                    let y = (this.y + 1 ) * tileSize + 50;
                    ellipse(x, y, 15, 15);
                }else if(pos.x === this.x + 1 && pos.y === this.y + 1 && pos.isWhite){
                    fill(210, 0, 0);
                    let x = (this.x + 1) * tileSize + 50;
                    let y = (this.y + 1) * tileSize + 50;
                    ellipse(x, y, 15, 15);
                }
            });
        }
        
    }

    move(x, y, board){
        let canMove = true;
        let i;

        this.piecesPos.forEach((pos) => {
            if(x === pos.x && y === pos.y){
                canMove = false;
            }
        });

        if(canMove){
            if(x >= boardWidth || x < 0 || y >= boardHeight || y < 0){
                canMove = false;
            }
        }

        if(canMove){

            if(!this.isWhite){
                i = 0;
            }else{
                i = 2;
            }

            if(this.firstMove){
                if(x === this.x + this.availableMoves[i+1][0] && y === this.y + this.availableMoves[i+1][1]){
                    this.x = this.x + this.availableMoves[i+1][0];
                    this.y = this.y + this.availableMoves[i+1][1];

                    this.position = createVector(this.x * tileSize, this.y * tileSize);
                    this.iconPosition = createVector(this.x * tileSize + 50, this.y * tileSize + 50);
                    this.firstMove = false;
                    whiteTurn = !whiteTurn;

                }else if(x === this.x + this.availableMoves[i][0] && y === this.y + this.availableMoves[i][1]){

                    this.x = this.x + this.availableMoves[i][0];
                    this.y = this.y + this.availableMoves[i][1];

                    this.position = createVector(this.x * tileSize, this.y * tileSize);
                    this.iconPosition = createVector(this.x * tileSize + 50, this.y * tileSize + 50);
                    this.firstMove = false;
                    whiteTurn = !whiteTurn;
                }
            }else{
                if(x === this.x + this.availableMoves[i][0] && y === this.y + this.availableMoves[i][1]){

                    this.x = this.x + this.availableMoves[i][0];
                    this.y = this.y + this.availableMoves[i][1];

                    this.position = createVector(this.x * tileSize, this.y * tileSize);
                    this.iconPosition = createVector(this.x * tileSize + 50, this.y * tileSize + 50);
                    this.firstMove = false;
                    whiteTurn = !whiteTurn;

                }
            }
        }

        if(!this.isWhite){
            i = 0;
        }else{
            i = 2;
        }

        this.piecesPos.forEach((pos) => {
           if(x === pos.x && y === pos.y && this.isWhite !== pos.isWhite){
                if(x === this.x + this.attackMoves[i][0] && y === this.y + this.attackMoves[i][1]){
                    board.deletePiece(x, y);

                    this.position = createVector(x * tileSize, y * tileSize);
                    this.iconPosition = createVector(x * tileSize + 50, y * tileSize + 50);
                    this.x = x;
                    this.y = y;
                    if(this.firstMove){
                        this.firstMove = false;
                    }
                    whiteTurn = !whiteTurn;

                }else if(x === this.x + this.attackMoves[i+1][0] && y === this.y + this.attackMoves[i+1][1]){
                    board.deletePiece(x, y);
                    
                    this.position = createVector(x * tileSize, y * tileSize);
                    this.iconPosition = createVector(x * tileSize + 50, y * tileSize + 50);
                    this.x = x;
                    this.y = y;
                    if(this.firstMove){
                        this.firstMove = false;
                    }
                    whiteTurn = !whiteTurn;

                }
            } 
        });

    }

}