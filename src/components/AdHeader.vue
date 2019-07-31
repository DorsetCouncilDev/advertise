<!-- Common header component  -->

<template>

<header id="header">
    <a class="skip-link" href="#content">Skip to content</a>
    <div id="dfyHolder"><a href="https://www.dorsetcouncil.gov.uk" title="Dorset Council homepage">
         <img src="../assets/images/dorsetcouncil-logo.svg" id="dcLogo" alt="Dorset Council homepage"></a>
    </div>
    <div id="titleHolder">
        <div id="title">
            <router-link :to="{ path: '/advertise'}" id="titleLink" title="Advertise Dorset homepage">Advertise Dorset</router-link>
            <img id="brandImage" src="../assets/images/dc-advertise.png" alt="">
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



    $titleHover: darken(#5975de, 30%);
    #header {
        width: 100%;
        height: 80px;
        display: flex;
        margin-left: -15px;
        margin-right: -30px;
    }

    #dfyHolder {
        width: 35%;
        max-width: 150px;
        position: relative;
        padding-top:10px;
        padding-left:3px;
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
        margin-top:10px;
        display: flex;
        justify-content: center;
        margin-left: 5px;
        flex-grow: 1;
        position: relative;
        #title {
            position: relative;
            a {
                line-height: 2;
                font-size: 22px;
                color: black;
                &:hover,
                &:visited {
                    text-decoration: none;

                }
                &:hover {
                    color: $titleHover;
                }
            }
            #brandImage {
                position: absolute;
                top: -5px;
                right: -35px;
                width: 125px;
                z-index: -1;
            }
        }
    }

    @media only screen and (min-width: 365px) {
        #header {
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
                    top: 0px;
                    right: -35px;
                    width: 125px;
                }
            }
        }

    }

    @media only screen and (min-width: 600px) {
        #dfyHolder {
            position: absolute;
            padding-left:0;

        }
        #header {
            height: 80px;
            margin-left: 0;
            margin-right: 0;
        }
        #titleHolder {
       margin-left:150px;
            #title {
                a {
                    line-height:2;
                    font-size: 28px;
                }
                 #brandImage {
                    position: absolute;
                    top: 0;

                    width:150px;
                    left:100px;
                }
            }
        }
    }

    @media only screen and (min-width: 765px) {

        #header {
            height: 90px;

        }
        #titleHolder {
            margin-left:0;
            #title {
                a {
                    line-height: 2.5;
                    font-size: 28px;

                }
                #brandImage {
                    position: absolute;
                    top: 0;
                    left:80px;
                    width: 175px;
                }
            }
        }
    }

    @media only screen and (min-width: 1100px) {
        #header {
            height: 90px;
        }
        #titleHolder {
               left: -50px;
            #title {
                a {
                    line-height: 2;
                    font-size: 32px;

                }
                #brandImage {
                    position: absolute;
                    top: -5px;
                    left:105px;
                    width: 180px;
                }
            }
        }

    }

</style>
