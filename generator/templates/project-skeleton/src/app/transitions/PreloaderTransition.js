import Vue from "vue";

export default Vue.component("PreloaderTransition", {
    functional: true,
    render (h, ctx) {
        const vm = ctx.parent;
        const data = {
            props: {
                name: "PreloaderTransition",
                css: false,
                appear: true,
            },
            on: {
                enter: (_, done) => {
                    TweenMax.fromTo(vm.$el, 0.45, { alpha: 0 }, { alpha: 1, ease: Sine.easeOut, onComplete: done });
                },
                leave: (el, done) => {
                    TweenMax.to(vm.$el, 0.45, { alpha: 0, ease: Sine.easeOut, onComplete: done });
                },
                afterLeave: () => {
                    vm.setDone();
                },
            }
        };
        return h("transition", data, ctx.children);
    }
});
