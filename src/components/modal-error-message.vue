<template>
<div  v-if="error.show" class="error-message" data-aos="flip-up"><h2 id="errorMessageText"><img src="../assets/images/cross.png" class="error-icon"> {{error.message}}</h2><p class="errorParagraph" v-if="error.detail">{{error.detail}}</p></div>
</template>

<script>
    import AOS from 'aos'
    export default {
        props: {
            error: {
                required: true,
                type: Object
            }
        },
        mounted() {
            AOS.init({
                once: true,
                offset: 50,
                duration: 200
            });
        }
    }

</script>

<style scoped lang="scss">
    .error-message {
        width: 100%;
        padding: 15px;
        color: black;
        background: #FF7F7F;
        position: absolute;
        top: 100%;
        left: 0;

        #errorParagraph {
            font-size: 18px;
        }

        #errorMessageText {
            font-size: 18px;
            font-weight: normal;
            margin-bottom: 0;
        }
        .error-icon {
            margin-bottom: 5px;
            margin-right: 15px;
            width: 25px;
        }
    }

</style>
