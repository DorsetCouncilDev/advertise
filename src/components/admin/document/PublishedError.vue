<template>
<div  class="error-message" data-aos="flip-up"><h2 id="errorMessageText"><img src="../../../assets/images/cross.png" class="error-icon"> Asset was created but failed to publish</h2>
    <p id="errorParagraph">Attempt to publish again or try again later</p>
    <div class="d-flex justify-content-center">
    <button class="btn btn-success" @click="$emit('publish')">Publish asset</button>
</div>
    </div>
</template>

<script>
    import AOS from 'aos'
    export default {
        name: "PublishedError",
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
            text-align: center;
        }

        #errorMessageText {
            font-size: 22px;
            font-weight: bolder;
            margin-bottom: 0;
        }
        .error-icon {
            margin-bottom: 5px;
            margin-right: 15px;
            width: 25px;
        }
    }

</style>
