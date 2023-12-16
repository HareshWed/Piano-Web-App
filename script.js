window.addEventListener("load", ()=>{

    const canvas = document.getElementById("canvas1");
    const canvasY = canvas.getBoundingClientRect().top;
    canvas.width = 1450;
    canvas.height = 120;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "red";
    ctx.shadowBlur = 65;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "#b65fcf";

    class Particle {
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
    }

    class Spark extends Particle {
        constructor(x, y){
            super(x, y);
            this.initX = x;
            this.initY = y;
            this.markedForDeletion = false;
            this.maxDisplacement = 40;
            this.vy = -1.5;
        }
    }

    function renderSparks(sparks){
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.shadowBlur = 10;
        console.log(sparks.length);
        sparks.forEach(sprk => {
            ctx.beginPath();
            ctx.arc(sprk.x, sprk.y, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            sprk.y += sprk.vy;
            if (sprk.initY - sprk.y > sprk.maxDisplacement){
                console.log(sprk.initY, sprk.y, sprk.maxDisplacement);
                sprk.markedForDeletion = true;
            }
        });
        ctx.restore();
        return sparks;
    }
    let sparks = [];


    const whiteKeys = document.querySelectorAll(".white-key");
    const blackKeys = document.querySelectorAll(".black-key");
    allKeys = [...whiteKeys,...blackKeys]
    allKeys.forEach(pianoKey => {
        const selectKey = pianoKey.querySelector("span").textContent;
        document.addEventListener("keypress", (e)=>{
            if (e.key == selectKey){
                audioPath = "Piano Key Sounds/" + pianoKey.classList[1] + " " + pianoKey.classList[2] + ".ogg";
                let audio = new Audio(audioPath);
                audio.play();
                pianoKey.classList.add("active");
                position = pianoKey.getBoundingClientRect();
                if ([...pianoKey.classList].indexOf("white-key") >= 0){
                    for (let i = 0; i < 15; i++){
                        sparks.push(new Spark(position.left - (pianoKey.getBoundingClientRect().width * 0.6) + pianoKey.getBoundingClientRect().width * 0.9 * Math.random(), position.top - canvasY + 20 - 15 * Math.random()));
                    }
                }
                else{
                    for (let i = 0; i < 15; i++){
                        sparks.push(new Spark(position.left - (pianoKey.getBoundingClientRect().width * 0.8) + pianoKey.getBoundingClientRect().width * 0.9 * Math.random(), position.top - canvasY + 20 - 15 * Math.random()));
                    }   
                }
            }
        });
        document.addEventListener("keyup", (e)=>{
            if(e.key == selectKey){
                pianoKey.classList.remove("active");
            }
        });
    });

    let lastTime = 0;
    function animate(timeStamp){
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparks = renderSparks(sparks);
        sparks = sparks.filter(obj => !obj.markedForDeletion);
        requestAnimationFrame(animate);
    }
    animate(0);
    
});