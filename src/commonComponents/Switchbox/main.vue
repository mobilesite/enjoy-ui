<template>
    <input v-model="isChecked" :name="name" class="ej-switchbox" type="checkbox">
</template>

<script>
    //使用：
    //<switchbox checked="false" name="xxx" @switchbox-change="onSwitchBoxChange"></switchbox>
    export default {
        name: 'Switchbox',
        props: {
            checked: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                default: ''
            }
        },
        computed: {
            isChecked: {
                get(){
                    return this.checked;
                },
                //回传值name值和改变后的value，以便于外部进行处理
                set(value){
                    this.$emit('switchbox-change', {
                        name: this.name,
                        value
                    });
                }
            }
        }
    }
</script>
