<template>
    <div class="ej-tab" :class="className">
        <div class="ej-tab__menu" ref="listNavMenu">
            <nav class="ej-tab__menu-inner" :class="{ 'ej-tab__menu-inner--fixed': listNavMenuFixed }" >
                <slot name="ej-tab__menu-item"></slot>
            </nav>
        </div>
        <div class="ej-tab__pane">
            <slot name="ej-tab__pane-item"></slot>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        name: 'Tab',
        props: {
            className: {
                type: String,
                default: ''
            },
        },
        computed: {
            ...mapGetters([
                'tabSelected',
            ]),
        },
        data(){
            let me = this;
            return {
                listNavMenuFixed: false,
                scrollHandler: function() {
                    me.$emit('tabContScroll')
                }
            }
        },
        created(){
            window.addEventListener('scroll', this.scrollHandler.bind(this));
        },
        mounted(){

        },
        methods: {

        }
    }
</script>
