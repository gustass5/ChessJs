class Board{
    constructor(){
        this.whitePieces = [];
        this.blackPieces = [];
    }

    initializePieces(){
        this.whitePieces.push(new Rook(0, 7, true));
        this.whitePieces.push(new Knight(1, 7, true));
        this.whitePieces.push(new Bishop(2, 7, true));
        this.whitePieces.push(new Queen(3, 7, true));
        this.whitePieces.push(new King(4, 7, true));
        this.whitePieces.push(new Bishop(5, 7, true));
        this.whitePieces.push(new Knight(6, 7, true));
        this.whitePieces.push(new Rook(7, 7, true));

        for(let i = 0; i < 8; i++){
            this.whitePieces.push(new Pawn(i, 6, true));
        }

        this.blackPieces.push(new Rook(0, 0, false));
        this.blackPieces.push(new Knight(1, 0, false));
        this.blackPieces.push(new Bishop(2, 0, false));
        this.blackPieces.push(new Queen(3, 0, false));
        this.blackPieces.push(new King(4, 0, false));
        this.blackPieces.push(new Bishop(5, 0, false));
        this.blackPieces.push(new Knight(6, 0, false));
        this.blackPieces.push(new Rook(7, 0, false));

        for(let i = 0; i < 8; i++){
            this.blackPieces.push(new Pawn(i, 1, false));
        }
    }

    show(){
        for(let i = 0; i < this.whitePieces.length; i++){
            this.whitePieces[i].show();
        }

        for(let i = 0; i < this.blackPieces.length; i++){
            this.blackPieces[i].show();
        }
    }

    getPiece(x,y){
        var movingPiece = [...this.whitePieces, ...this.blackPieces].find((element) => {
            return element.position.x === x * tileSize && element.position.y === y * tileSize;
        })

        return movingPiece;
    }

    deselectAll(){
        this.whitePieces.forEach((piece) => {
            piece.deselect();
        });

        this.blackPieces.forEach((piece) => {
            piece.deselect();
        });
    }

    findPieces(){
        var piecesPos = [];

            this.whitePieces.forEach((piece) => {
                var pieces = {x: piece.x, y: piece.y, isWhite: piece.isWhite, name: piece.name}
                piecesPos.push(pieces);
            })

            this.blackPieces.forEach((piece) => {
                var pieces = {x: piece.x, y: piece.y, isWhite: piece.isWhite, name: piece.name}
                piecesPos.push(pieces);

            })

            return piecesPos;
        
    }
    deletePiece(x, y){
        let piece = this.getPiece(x, y);
        let copy;
        if(piece !== undefined){
            if(piece.isWhite){
                copy = this.whitePieces;
                this.whitePieces.forEach((piece, index) =>{
                    if(x === piece.x && y === piece.y){
                        copy.splice(index, 1);
                    }
                });
                this.whitePieces = copy;
            }else{
                copy = this.blackPieces;
                this.blackPieces.forEach((piece, index) =>{
                    if(x === piece.x && y === piece.y){
                        copy.splice(index, 1);
                    }
                });
                this.blackPieces = copy;
            }
        }
    }
}