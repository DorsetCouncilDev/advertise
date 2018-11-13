<!-- Common header component  -->

<template>
<header id="header">
    <div id="dfyHolder"><a href="https://www.dorsetforyou.gov.uk" title="DorsetForYou homepage">
         <img src="../assets/images/dfy.png" id="dfyLogo" alt="Go to Dorset for you homepage"></a>
    </div>
    <div id="titleHolder">
        <div id="title">
            <a href="/advertise" title="Advertise Dorset homepage">ADVERTISE DORSET</a>  
            <img id="brandImage" src="../assets/images/advertiseLogo.png" alt=""> 
        </div>    
    </div>
    <div v-if="signedIn != ''"><a @click="logout">logout</a></div>
</header>

</template>

<script>
    export default {
        name: 'AdHeader',
        computed: {
            signedIn() {
                if (this.$store.state.securityToken)
                    return true
                else
                    return false
            }
        },
        methods: {
            logout: function() {
                this.$store.commit('clearSecurityToken')
                this.$router.push('/advertise/admin')
            }
        }
    }

</script>

<style scoped lang="scss">
    #header {
        width: 100%;
        height: 60px;
        display: flex;
        margin-left: -15px;
        margin-right: -30px;
    }

    #dfyHolder {
        width: 35%;
        max-width: 150px;
        position: relative;
        a {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
        }
        img {
            position: absolute;
            width: 100%;
        }
    }


    #titleHolder {
        display: flex;
        justify-content: center;
        margin-left: 5px;
        flex-grow: 1;
        position: relative;
        #title {
            position: relative;
            a {
                line-height: 2;
                font-size: 19px;
                color: black;
                &:hover,
                &:visited {
                    text-decoration: none;
                }
            }
            #brandImage {
                position: absolute;
                top: -50px;
                right: -35px;
                width: 125px;
                z-index:-1;
            }
        }
    }

    @media only screen and (min-width: 365px) {
        #header{
            height: 80px;
        }
        #titleHolder {
       
        #title {
            a {
                line-height: 2.5;
                font-size: 22px;
              
            }
            #brandImage {
                position: absolute;
                top: -45px;
                right: -35px;
                width: 125px;
            }
        }
    }
        
    }
    
      @media only screen and (min-width: 765px) {
          
          #header{
              height:100px;
          }
           #titleHolder {
       
        #title {
            a {
                line-height: 2.5;
                font-size: 28px;
              
            }
            #brandImage {
                position: absolute;
                top: -80px;
                right: -55px;
                width: 200px;
            }
        }
    }
    }
     @media only screen and (min-width: 1100px) {
          #header{
              height:130px;
          }
           #titleHolder {
          #title {
            a {
                line-height: 2.5;
                font-size: 36px;
              
            }
            #brandImage {
                position: absolute;
                top: -135px;
                right: -90px;
                width: 300px;
            }
        }
         }
       
    }
    

</style>
