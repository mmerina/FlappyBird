(function(){
    var Bird = window.Bird = function(){

            this.image = [game.res["bird0_0"],game.res["bird0_1"],game.res["bird0_2"]];
            this.y  =100;
            this.x = 100;
            this.dy = 0.2;
            this.deg = 0;
            this.wing = 0;

    }
    Bird.prototype.render = function(){

        game.ctx.save();
        game.ctx.translate(this.x,this.y);
        game.ctx.rotate(this.deg);
        game.ctx.drawImage(this.image[this.wing],-24,-24);
        game.ctx.restore();

    };
    Bird.prototype.update = function(){

        this.dy += 0.88;
        this.deg += 0.06;
        this.y += this.dy;

        game.f % 2 == 0&& this.wing++;
        if(this.wing > 2){

            this.wing = 0;
        }
        this.x1 = parseInt(this.x - 18.5);
        this.x2 = parseInt(this.x + 18.5);
        this.y1 = parseInt(this.y - 13.5);
        this.y2 = parseInt(this.y + 13.5);
    };
    Bird.prototype.fly = function(){
        this.dy = -10;
        this.deg = -1.28;
        document.getElementById("fly").play();
    }
})();