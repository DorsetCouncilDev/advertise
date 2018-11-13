<template>
    <div  v-if="info.show" class="info-message"  data-aos="flip-up"><h2 id="infoMessageHeader"><img src="../assets/images/tick.png" class="info-icon"> {{info.message}}</h2></div>
</template>

<script>
            import AOS from 'aos'
    export default {
          props: {
            info: {
                required: true,
                type: Object
            }
        },
        mounted() {
           AOS.init({once:true,
                      offset: 50,
                      duration: 200,
                     }); 
        }
    }
</script>

<style>
     .info-message{
        width:50%;
        padding:15px;
         color:black;
         background: #99C199;
 
  
        p{
            font-size: 18px;
        }
    }
    #infoMessageHeader{
        font-size: 18px;
        font-weight: normal;
        text-align: center;
        margin-bottom: 0;
    }
    .info-icon{
        margin-bottom:5px;
        margin-right:15px;
        width:25px;
    }
</style>