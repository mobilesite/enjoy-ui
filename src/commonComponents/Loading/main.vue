<template>
    <div class="ej-loading" v-show="show">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        props: {
            show: {
                type: Boolean
            }
        }
    };
</script>
