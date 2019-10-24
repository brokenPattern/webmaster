(function () {

    new Vue({
        el: "#vue-wrapper",
        data: {
            currActive: '#title-section',
            menuOpen: false,
            navlinks: [],
            scrollTargets: [],
            portfolioItems:{
                cabin: {
                    accent: '#BA4D63',
                    imgSrc: 'woods',
                    title: 'Cabin in the Woods',
                    description: 'Description for Cabin in the Woods. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae?',
                },
                cake: {
                    accent: '#1FA4B5',
                    imgSrc: 'cake',
                    title: 'Delicous Cake',
                    description: 'Description for Delicous Cake. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae?',
                },
                circus: {
                    accent: '#130F0E',
                    imgSrc: 'circus',
                    title: 'Red Circus',
                    description: 'Description for Red Circus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae?',
                },
                player: {
                    accent: '#1E84C1',
                    imgSrc: 'gamepad',
                    title: '2nd Player',
                    description: 'Description for 2nd player. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae?',
                },
                safe: {
                    accent: '#1037B6',
                    imgSrc: 'safe',
                    title: 'Safest Safe',
                    description: 'Description for Safest Safe. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae?',
                },
                submarine: {
                    accent: '#CBB2A3',
                    imgSrc: 'submarine',
                    title: 'Yellow Submarine',
                    description: 'Description for Yellow Submerine. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae?',
                }
            },
            modalItem: null,
            showModal: false
        },
        computed: {
            activeLinkSelector: function () {
                //see scrollSpy method
                const app = this
                return 'nav a[href="' + this.currActive + '"]'
            }
        },
        watch: {
            currActive: function (value) {
                //see scrollSpy method
                const app = this
                app.navlinks = document.querySelectorAll('nav a'),
                    app.navlinks.forEach((navlink) => {
                        navlink.classList.remove('active');
                    })
                document.querySelector(app.activeLinkSelector)
                    .classList.add('active');
            },
        },
        methods: {
            scrollSpy: function () {
                /*scrollSpy is divided into 3 elements for easier maintenence and performance. As This method is attached to the scroll event it's best if it did as little as nessessary. 
                
                This method is responsible for finding section that is currently visible on the screen.
                
                activeLinkSelector computed value is preparing a selector for links to add and remove 'active' class to.
                
                currActive watcher is adding and removing classes to links in nav.*/
                const app = this
                app.scrollTargets = document.querySelectorAll('section')
                app.scrollTargets.forEach((target) => {
                    let tgtTop = target.getBoundingClientRect().top
                    let tgtBottom = target.getBoundingClientRect().bottom
                    let tgtID = target.getAttribute('id')
                    if (tgtTop <= 120 && tgtBottom >= 0) {
                        app.currActive = '#' + tgtID
                    }
                })

            },
            scrollToTarget: function (event) {
                event.preventDefault();
                let animationTarget = event.target.getAttribute('href');
                document.querySelector(animationTarget).scrollIntoView({
                    behavior: 'smooth'
                })
                this.menuOpen = !this.menuOpen;
                // not perfect but less code and fallbacks nicely

            },
            changeLabelClass: function (event) {
                //changing behavior of form labels
                let label = event.target.nextElementSibling;
                [event.target.value.trim() ? label.classList.add('filled') : label.classList.remove('filled')];

            },
            openModal: function(key){
                this.modalItem = this.portfolioItems[key];
                this.showModal = true;
                
            },
            closeModal: function(){
                this.showModal = false;
            }

        },
        created: function () {
            window.addEventListener('scroll', this.scrollSpy);
        },
        destroyed: function () {
            window.removeEventListener('scroll', this.scrollSpy);
        }
    });

}());