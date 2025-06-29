class main {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseFollower = document.querySelector('.mouse__follower');
        this.init();
    }

    init () {   
        this.bindEvent();
    }

    bindEvent () {
        document.addEventListener('mousemove' , (e) => {
            this.mouseX = e.clientX;
            this.mouseY= e.clientY;
            this.mouseFollower = this.updateMouseFollower();
        })
    }

    updateMouseFollower() {
        
    }
}