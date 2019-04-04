import Vue from "vue";

export default Vue.component("GSAP", {
    functional: true,
    render: (h, ctx) => {
        // let vm = ctx.parent;
        const data = {
            props: {
                name: "GSAP",
                css: false,
                appear: true,
                //mode:"out-in"
            },
            on: {
                beforeEnter: () => {},
                enter: (el, done) => {
                    TweenMax.fromTo(el, 0.55, { x: 300, alpha: 0 }, {
                        x: 0,
                        alpha: 1,
                        ease: Power3.easeOut,
                        onComplete: done
                    });
                },
                afterEnter: () => {},
                enterCancelled: () => {},
                beforeLeave: () => {},
                leave: (el, done) => {
                    TweenMax.to(el, 0.55, { x: -300, alpha: 0, ease: Power3.easeOut, onComplete: done });
                },
                afterLeave: () => {},
                leaveCancelled: () => {},
            }
        };
        return h("transition", data, ctx.children);
    }
});
