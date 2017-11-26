<template>
    <div class="page">
        <switchbox :checked="gender" name="gender" @switchbox-change="onSwitchBoxChange"></switchbox>

        <range input-name="percent" :current="current" :total="total" class-name="my-range" @range-current-change="rangeCurrentChange"></range>

        <progressbar percent="50%" class-name="my-progressbar"></progressbar>

        <loading :show="showLoading"></loading>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

    export default {
        name: 'Page',
        components: {
        },
        computed: {
            
        },
        data() {
            return {
                gender: false,
                current: 70,
                total: 100,
                showLoading: true
            };
        },
        created(){

        },
        mounted() {
            
        },
        methods: {
            onSwitchBoxChange(){
                this.gender = !this.gender;
            },
            rangeCurrentChange(current){
                this.current = current;
            }
        }
    };
</script>

<style lang="less">
    @import '../../styles/lib.less';

    .page {
        font-family: @ej-font-default;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin-top: 0;
        color: @ej-color-text-dark;
    }

    .slide-left-enter-active {
        -webkit-animation: slide-left-in .5s cubic-bezier(0.23, 1, 0.32, 1);
        animation: slide-left-in .5s cubic-bezier(0.23, 1, 0.32, 1);
    }

    @-webkit-keyframes slide-left-in {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);;
        }
    }
    @keyframes slide-left-in {
        0% {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);;
        }
    }
</style>
