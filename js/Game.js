(function(){
    var Game = window.Game = function(){
            this.f = 0;
            this.init();
            this.pipeArr = [];
    }
    Game.prototype.init = function(){
        this.canvas = document.getElementById("canvas");
        this.ctx =this.canvas.getContext("2d");
        this.res = {
            "bg_day":"images/bg_day.png",
            "land":"images/land.png",
            "pipe_down":"images/pipe_down.png",
            "pipe_up":"images/pipe_up.png",
            "bird0_0":"images/bird0_0.png",
            "bird0_1":"images/bird0_1.png",
            "bird0_2":"images/bird0_2.png",
            "title":"images/title.png",
            "button_play":"images/button_play.png",
            "text_ready":"images/text_ready.png",
            "tutorial":"images/tutorial.png",
            "b0":"images/b0.png",
            "b1":"images/b1.png",
            "b2":"images/b2.png",
            "b3":"images/b3.png",
            "b4":"images/b4.png",
            "b5":"images/b5.png",
            "b6":"images/b6.png",
            "b7":"images/b7.png",
            "b8":"images/b8.png",
            "b9":"images/b9.png",
            "b10":"images/b10.png",
            "b11":"images/b11.png"
        };
        var length = Object.keys(this.res).length;
        var count = 0;
        var self = this;
        for(var i in this.res){
            var image = new Image();
            image.src = this.res[i];
            this.res[i] = image;
            image.onload = function(){
                count++;
                self.clear();
                self.ctx.save();
                self.ctx.font = "18px 微软雅黑";
                self.ctx.fillStyle = "blue";
                self.ctx.textAlign = "center";
                self.ctx.fillText(`加载中${count}/${length}`,self.canvas.width/2,80);
                self.ctx.restore();
                if(count == length){
                    self.start();
                }
            }
        }
    };
    Game.prototype.clear = function(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    };
    Game.prototype.start = function(){
        var self = this;
        this.scene = new Scene();
        this.timer = setInterval(function(){
            self.f++;
            self.clear();
            self.scene.render();
            self.ctx.font = "16px 微软雅黑";
            self.ctx.fillText(`总分：${self.scene.score}`,10,80);
        },20)
    }
})();