(function(){
    var Scene = window.Scene = function(){

        this.sceneNumber = 1;
        this.init(1);
        this.bindEvent();
        this.score = 0;
    };
    Scene.prototype.init = function(number){

        switch ( number){
            case 1:
                this.background = new Background();
                this.land = new Land();
                this.titleY = -48;
                this.buttonY = game.canvas.height + 70;
                this.birdY = 230;
                this.birdDirection = "xia";
            break;
            case 2:
                this.background = new Background();
                this.land = new Land();
                this.readyY = -62;
                this.tutorialOpacity = 1;
                this.tutorialOpacityChange = "low";
            break;
            case 3:
                this.background = new Background();
                this.land = new Land();
                this.bird = new Bird();
            break;
            case 4:
              this.boom = 0;
            break;
        }
    };
    Scene.prototype.render = function(){
        switch ( this.sceneNumber){
            case 1:
                this.background.update();
                this.background.render();
                this.land.update();
                this.land.render();
                game.ctx.drawImage(game.res["title"],(game.canvas.width-178)/2,this.titleY);
                this.titleY += 2;
                if( this.titleY > 120){
                    this.titleY = 120;
                };
                this.buttonY -= 5;
                if( this.buttonY < 333){
                    this.buttonY = 333;
                }
                game.ctx.drawImage(game.res["button_play"],(game.canvas.width-116)/2,this.buttonY);
                if(this.birdDirection =="xia"){
                    this.birdY++;
                    if( this.birdY > 270){
                        this.birdDirection = "shang";
                    }
                }else if( this.birdDirection =="shang"){
                    this.birdY--;
                    if( this.birdY < 230){
                        this.birdDirection = "xia";
                    }
                };
                game.ctx.drawImage(game.res["bird0_0"],(game.canvas.width-48)/2,this.birdY);
            break;
            case 2:
                this.background.update();
                this.background.render();
                this.land.update();
                this.land.render();
                this.readyY += 4;
                game.ctx.save();
                if(  this.readyY > 190){
                    this.readyY = 190;
                };
                if( this.tutorialOpacityChange == "low"){
                    this.tutorialOpacity -= 0.02;
                    if( this.tutorialOpacity <= 0.05){
                        this.tutorialOpacityChange = "high";
                    }
                }else if(this.tutorialOpacityChange == "high"){

                    this.tutorialOpacity += 0.02;
                    if( this.tutorialOpacity >= 1){
                        this.tutorialOpacityChange = "low";
                    }
                };
                game.ctx.globalAlpha = this.tutorialOpacity;
                game.ctx.drawImage(game.res["tutorial"],(game.canvas.width - 114)/2,250);
                game.ctx.restore();
                game.ctx.drawImage(game.res["text_ready"],(game.canvas.width - 196)/2,this.readyY);


            break;
            case 3:
              this.background.update();
              this.background.render();
              this.land.update();
              this.land.render();
              game.f % 100 == 0 && new Pipe();
              for (var i = 0; i < game.pipeArr.length; i++) {
                  game.pipeArr[i].render();
                  game.pipeArr[i].update();
              };
              this.bird.render();
              this.bird.update();
            break;
            case 4:
                this.background.render();
                this.land.render();
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].render();
                };
              this.bird.render();
              this.bird.y += 20;
              this.bird.deg += 0.5;
              if( this.bird.deg > 1.57){
                    this.bird.deg = 1.57
              };
            if( this.bird.y > game.canvas.height - 112){
                this.bird.y = game.canvas.height - 112;

                game.f % 3 == 0 && this.boom++;
                if( this.boom >= 11){
                    game.pipeArr = [];
                    this.score = 0;
                    this.sceneNumber = 1;
                    this.init(1);
                }
                game.ctx.drawImage(game.res["b"+this.boom],this.bird.x - 36,this.bird.y - 110);
            }
            break;
        }
    };
    Scene.prototype.bindEvent = function(){
        var self = this;
        game.canvas.onmousedown = function(event){
            switch ( self.sceneNumber){
                case 1:
                    var zuo = (game.canvas.width - 116)/2;
                    var you =  (game.canvas.width - 116)/2 + 116;
                    var shang = 333;
                    var xia = 403;
                    if(event.offsetX >= zuo && event.offsetX <= you && event.offsetY <= xia &&  event.offsetY >= shang){

                        self.sceneNumber = 2;
                        self.init(2);
                    }
                break;
                case 2:
                    var zuo = (game.canvas.width - 114)/2;
                    var you =  (game.canvas.width - 114)/2 + 114;
                    var shang = 250;
                    var xia = 348;
                    if(event.offsetX >= zuo && event.offsetX <= you && event.offsetY <= xia &&  event.offsetY >= shang){
                        self.sceneNumber = 3;
                        self.init(3);
                    }
                break;
                case 3:
                    self.bird.fly();
                break;
                case 4:

                break;
            }
        };

        game.canvas.addEventListener("keydown",function(event){
            switch ( self.sceneNumber){
                case 1:

                break;
                case 2:

                break;
                case 3:
                    if(event.keyCode == 32){
                        self.bird.fly();
                    }
                break;
                case 4:

                break;
            };

        },true);
        game.canvas.focus();

    };
})();