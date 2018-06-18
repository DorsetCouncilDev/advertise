<!-- Common header component  -->

<template>
<div>
   <header>
       <div id="dfyHolder"><img src="../assets/images/dfy.png" id="dfyLogo" alt="Go to Dorset for you homepage"></div>
       <div id="titleHolder">
            <div id="title"><a href="home.html">ADVERTISE DORSET</a>  <img id="brandImage" src="../assets/images/ad-brand-image.svg" alt=""> </div>
            
        </div>
       <div v-if="signedIn != ''"><a @click="logout">logout</a></div>
 
    </header>

</div>
</template>

<script>
    export default {
        name: 'AdHeader',
        computed:{
            signedIn(){
                if(this.$store.state.securityToken)
                    return true
                else
                    return false
            }
        },
        methods:{
            logout: function() {
                this.$store.commit('clearSecurityToken')
                this.$router.push('/admin')
            }
        }
            
    
    }

</script>

<style scoped lang="scss">
    header {

       
        
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 10px;
        border-bottom: solid 1px lightgrey;
   overflow: hidden;
        #dfyHolder {
            img {
                width: 100px;
            }
        }
        #titleHolder {

            flex-grow: 2;
            display: flex;
            flex-flow: wrap;
            justify-content: center;
            #title {
                position: relative;
                font-size: 1.1em;
                a {
                    color: black;
                    &:hover,
                    &:visited {
                        text-decoration: none;
                    }
                }
                #brandImage {
                    transform:scale(0.9);
                    transform: rotate(180deg) scale(0.9);
                    position: absolute;
                    top: -80px;
                    left: 52px;
                

                }
            }
            #tagline {
                font-style: italic;
                line-height: 1;
                font-size: 1rem;
            }

        }
    }


    @media only screen and (min-width: 600px) {
     header {

        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 10px;
        border-bottom: solid 1px lightgrey;
        height: 130px;
        #dfyHolder {
            img {
                width: 100px;
            }
        }
        #titleHolder {

            flex-grow: 2;
            display: flex;
            flex-flow: wrap;
            justify-content: center;
            #title {
                position: relative;
                font-size: 2em;
                a {
                    color: black;
                    &:hover,
                    &:visited {
                        text-decoration: none;
                    }
                }
                #brandImage {
        
                    transform: rotate(180deg);
                    position: absolute;
                    top: -200px;
                    left: 125px;
                    width:400px;

                }
            }
            #tagline {
                font-style: italic;
                line-height: 1;
                font-size: 1rem;
            }

        }
    }
    }

    @media only screen and (min-width: 550px) {
        header {
      
            #dfyHolder {
                img {
                    width: 150px;
                }
            }
        }
    }



    @media only screen and (min-width: 700px) {
        header {
            #titleHolder {
                #title {
                    font-size: 2em;
                }
         
            }
        }
    }

    @media only screen and (min-width: 800px) {
        header {
            #titleHolder {
                #title {
                    line-height: 2;
                    font-size: 2em;
                    margin-right: 20px;
                }
                #tagline {
                    line-height: 3.5;
                    font-size: 1.4rem;
                }
            }
        }
    }

    #signupBanner {
        width: 100%;
        height: 50px;
        border-bottom: solid 1px grey;
        background: #246FA1;
        color: white;
    }

</style>
