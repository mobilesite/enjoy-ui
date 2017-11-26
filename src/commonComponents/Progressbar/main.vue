<template>
    <div class="ej-progressbar" :class="className" ref="wrap">
        <div class="ej-progressbar__finished" ref="finished"></div>
        <div class="ej-progressbar__indicator" v-text="newPercent" ref="indicator"></div>
    </div>
</template>

<script>
    //使用：
    //<progressbar percent="100%" class-name="my-progressbar"></progressbar>
    export default {
        name: 'Progressbar',
        props: {
            className: {
                type: String,
                default: ''
            },
            percent: {
                type: String,
                default: '0%'
            }
        },
        computed: {
            newPercent(){
                //如果传入了小于0的值，自动过滤成0
                if(this.percent < 0) {
                    return 0;
                } else {
                    return this.percent;
                }
            }
        },
        mounted(){
            this.$nextTick(() => {
                const transform = this._prefix('transform');
                const $wrap = this.$refs.wrap;
                const $indicator = this.$refs.indicator;
                const $finished = this.$refs.finished;
                const wrapWidth = parseInt(window.getComputedStyle($wrap)['width'], 10);
                const indicatorWidth = $indicator.getBoundingClientRect().width;
                const trackWidth = wrapWidth - indicatorWidth;
                const percent = parseInt(this.newPercent.replace('%', ''), 10) / 100;
                const validPercent = Math.min(1, percent); //合法的percent应该不能超过100%，应该以此来计算下面的距离，而保留原始的percent是为了数字上的显示用
                const distance = trackWidth * validPercent;
                $indicator.style[transform] = `translate3d(${distance}px, -50%, 0)`;
                $finished.style['width'] = `${trackWidth * validPercent}px`;
            });
        },
        methods: {
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
