<template>
    <div class="ej-range" :class="className">
        <input type="hidden" :name="inputName" v-model="validCurrent">
        <div class="ej-range__left" ref="wrap">
            <div class="ej-range__finished" ref="finished"></div>
            <div class="ej-range__indicator" ref="indicator" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend="touchEnd"></div>
        </div>
        <div class="ej-range__right" v-text="validCurrent" ref="value"></div>
    </div>
</template>

<script>
    //使用：
    //<range input-name="range1" :current="current" :total="total" class-name="my-range" @range-current-change="rangeCurrentChange"></range>
    //rangeCurrentChange(current){
    //     this.current = current;
    //}
    export default {
        name: 'range',
        props: {
            className: {
                type: String,
                default: ''
            },
            inputName: {
                type: String,
                required: true
            },
            current: {
                type: Number,
                default: 0
            },
            total: {
                type: Number,
                default: 100
            }
        },
        computed: {
            validCurrent(){
                if(this.current > this.total){
                    return this.total;
                } else {
                    if(this.current < 0){
                        return 0;
                    }
                    return Math.floor(this.current);
                }
            },
            percent(){
                return this.validCurrent / this.total;
            }
        },
        data(){
            return {
                touch: {
                    isTouching: false,
                    startX: null,
                    left: null,
                    deltaX: null
                }
            }
        },
        watch: {
            percent(newVal){
                console.log(newVal);
            }
        },
        mounted(){
            this.$nextTick(() => {
                const wrapWidth = this.$refs.wrap.clientWidth;
                const indicatorWidth = this.$refs.indicator.clientWidth;
                const trackWidth = wrapWidth - indicatorWidth;
                const indicatorLeft = trackWidth * this.percent;
                
                this._setWidthAndPosition(indicatorLeft);
            });
        },
        methods: {
            touchStart(e){
                this.touch.isTouching = true;
                this.touch.startX = e.touches[0].pageX; 
                this.touch.left = this.$refs.finished.clientWidth;
            },
            touchMove(e){
                if(!this.touch.isTouching){
                    return;
                }
                const deltaX = e.touches[0].pageX -  this.touch.startX;
                // const indicatorWidth = $indicator.getBoundingClientRect().width;
                const indicatorWidth = this.$refs.indicator.clientWidth;
                const trackWidth = this.$refs.wrap.clientWidth - indicatorWidth;
                const indicatorLeft = Math.min(trackWidth, Math.max(0, this.touch.left + deltaX));
                const current = Math.floor(this.total * indicatorLeft/trackWidth);

                this.$emit('range-current-change', current);
                this._setWidthAndPosition(indicatorLeft);
            },
            touchEnd(e){
                if(!this.touch.isTouching){
                    return;
                }

                this.touch.isTouching = false;
            },
            _setWidthAndPosition(indicatorLeft){
                const transform = this._prefix('transform');

                this.$refs.indicator.style[transform] = `translate3d(${indicatorLeft}px, -50%, 0)`;
                this.$refs.finished.style.width = `${indicatorLeft}px`;
            },
            _getPrefix(){
                const styles = document.createElement('div').style;

                const transformNames = {
                    webkit: 'webkitTransform',
                    Moz: 'MozTransform',
                    O: 'OTransform',
                    ms: 'msTransform',
                    standard: 'transform'
                };

                for(let i in transformNames){
                    if(styles[transformNames[i]] !== undefined) {
                        return i === 'standard' ? '' : i ;
                    }
                };

                return false;
            },
            _prefix(style){
                const currentPrefix = this._getPrefix();

                if(currentPrefix === false){
                    return false;
                }

                return currentPrefix === '' ? style : currentPrefix + style.charAt(0).toUpperCase() + style.substr(1);
            }
        }
    }
</script>
