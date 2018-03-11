(function(){
    var Pipe = window.Pipe = function(){
            this.pipe_down = game.res["pipe_down"];
            this.pipe_up = game.res["pipe_up"];
            this.x = game.canvas.width;
            this.pipeDownHeight = _.random(50,300);
            this.jianxi = 120;
            this.pipeUpHeight = game.canvas.height - 112 - this.pipeDownHeight - this.jianxi;
            game.pipeArr.push(this);
            this.isScore = false;
    }
    Pipe.prototype.render = function(){
        game.ctx.drawImage(this.pipe_down,0,400-this.pipeDownHeight,52,this.pipeDownHeight,this.x,0,52,this.pipeDownHeight);
        game.ctx.drawImage(this.pipe_up,0,0,52,this.pipeUpHeight,this.x,this.pipeDownHeight + this.jianxi,52,this.pipeUpHeight);

    };
    Pipe.prototype.update = function(){
        this.x -= 2;
        if( this.x < -300){
            this.goDie();
        };

        this.x1 = parseInt(this.x);
        this.x2 = parseInt(this.x + 52);
        this.y1 = parseInt(this.pipeDownHeight);
        this.y2 = parseInt(this.pipeDownHeight + this.jianxi);

        if(game.scene.bird.x2 > this.x1 && (game.scene.bird.y1 < this.y1 || game.scene.bird.y2 > this.y2) && game.scene.bird.x1 < this.x2 || game.scene.bird.y2 > game.canvas.height - 112){
            game.scene.sceneNumber = 4;
            game.scene.init(4);
            document.getElementById("die").play();
            setTimeout(function(){
                document.getElementById("down").play();
            },200);
        }else if( !this.score && game.scene.bird.x1 > this.x2){
            this.score = true;
            game.scene.score++;
            document.getElementById("score").play();
        }

    };
    Pipe.prototype.goDie = function(){
        game.pipeArr = _.without(game.pipeArr,this);
    }
})();