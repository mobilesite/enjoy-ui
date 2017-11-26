<template>
  <div class="ej-footer-nav" :class="className">
    <div class="ej-footer-nav__pane">
        <slot name="ej-footer-nav__pane-item"></slot>
    </div>
    <nav class="ej-footer-nav__menu">
        <slot name="ej-footer-nav__menu-item"></slot>
    </nav>
  </div>
</template>

<script>
    export default {
        name: 'FooterNav',
        props: {
            className: {
                type: String,
                default: ''
            },
        },
        data(){
            return {
 
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>