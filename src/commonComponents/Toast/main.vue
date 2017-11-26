
<template>
    <div class="ej-toast" >
        <div class="ej-toast__inner" :class="{'ej-toast__inner--show': show}">
            <span v-text="msg"></span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: '',
                show: false
            }
        },
        computed: {
            className(){
                return this.show ? 'ej-toast__inner--show' : ''
            }
        }
    }
</script>


