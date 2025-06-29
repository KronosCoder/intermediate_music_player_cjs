class Main {
    constructor() {
        this.layers = [
           {element: document.getElementById('layer1') , speed: 0.2 , starCount: 100 , type: 'small'  },
           {element: document.getElementById('layer2') , speed: 0.5 , starCount: 75 , type: 'medium'  },
           {element: document.getElementById('layer3') , speed: 0.8 , starCount: 50 , type: 'large'  },
           {element: document.getElementById('layer4') , speed: 1.2 , starCount: 25 , type: 'bright'  },
        ];
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseFollower = document.querySelector('.mouse__follower');
        this.init();
    }

    init() {   
        this.bindEvent();
        this.createStars();
        this.initNavigation();
    }

    bindEvent() {
        document.addEventListener('mousemove' , (e) => {
            this.mouseX = e.clientX;
            this.mouseY= e.clientY;
            this.updateMouseFollower();
        });

        window.addEventListener('resize' , () => {
            this.handleResize();
        })
    }

    initNavigation() {
        const navItems = document.querySelectorAll('.nav__item');
        const isCurrent = document.querySelector('.current');
        const indicator = document.querySelector('.nav__indicator');

        this.setIndicatorToCurrentPosition(indicator);

        navItems.forEach((item , index) => {
            item.addEventListener('click' , (mouseEvent) => {
                this.setIndicatorPosition(indicator , item);
            });
            item.addEventListener('mouseenter' , (mouseEvent) => {
                this.navigationHovering(indicator , item , mouseEvent);
            });
            item.parentElement.addEventListener('mouseleave' , (mouseEvent) => {
                this.navigationHovering(indicator , item , mouseEvent , isCurrent);
            });
        });
    }
    
    setIndicatorPosition(indicator , item) {
        document.querySelectorAll('.nav__item').forEach(nav => nav.classList.remove('current'));
        item.classList.add('current');  
        this.updateIndicatorPosition(indicator , item);
    }

    updateIndicatorPosition(indicator , item) { 
        const rect = item.getBoundingClientRect();
        const navRect = item.parentElement.getBoundingClientRect();
        indicator.style.width = rect.width + 'px';
        indicator.style.left = (rect.left - navRect.left) + 'px';
    }

    setIndicatorToCurrentPosition(indicator) {
        const current = document.querySelector('.current');
        const rect = current.getBoundingClientRect();
        const navRect = current.parentElement.getBoundingClientRect();
        indicator.style.width = rect.width + 'px';
        indicator.style.left = (rect.left - navRect.left) + 'px';
    }

    navigationHovering(indicator , item , mouseEvent , isCurrent) {
        if (mouseEvent.type === 'mouseenter') {
            return this.updateIndicatorPosition(indicator , item);
        } else if (mouseEvent.type === 'mouseleave') {
            this.setIndicatorToCurrentPosition(indicator);
        }
    }

    updateMouseFollower() {
        this.mouseFollower.style.transform = `translate(${this.mouseX - 100}px , ${this.mouseY - 100}px)`;
    }

    createStars() {
        this.layers.forEach(layer => {
            for (let i = 0; i < layer.starCount; i++) {
                const star = document.createElement('div');
                star.className = `star ${layer.type}`;

                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;

                star.style.left = x + 'px';
                star.style.top = y + 'px';
                star.dataset.baseX = x;
                star.dataset.baseY = y;
                star.style.animationDelay = Math.random() * 2 + 's';

                layer.element.appendChild(star);
            }
        })
    }

    handleResize() {
        this.layers.forEach(layer => {
            layer.element.innerHTML = '';
        });
        this.createStars();
    }
}

window.addEventListener('load' , () => new Main());