<template>
    <div class="ej-modal" :class="className" v-show="show">
        <div class="ej-modal__inner">
            <div class="ej-modal__header">
                <slot name="ej-modal__header"></slot>
            </div>
            <div class="ej-modal__body">
                <slot name="ej-modal__body"></slot>
            </div>
            <div class="ej-modal__footer">
                <slot name="ej-modal__footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            className: {
                type: String,
                default: ''
            }
        }
    };
</script>
