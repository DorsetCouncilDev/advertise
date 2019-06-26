<template>
<div>
<div class="row">
    <section class="col-md-7 col-lg-5">      
        <form v-on:submit.prevent="postcodesearch">
            <div class="form-group" aria-labelledBy="search">
                <h2 class="home-action-label mb-2" id="search">Advertising location finder</h2>
                <label class="invisible" for="postcode" id="postcodeLabel">Postcode</label>
               
                <div class="input-group" v-bind:class="{ 'postcode-input-group-error' : isPostcodeError }" id="postcode-input-group">
                    <input type="text" id="postcode" class="form-control  form-control-lg" placeholder="Enter full postcode" v-model="postcode">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button" id="searchGoBtn" @click="postcodesearch" aria-label="Search postcode"> GO </button>
                    </div>
                </div>
           <div class="postcode-error-message">{{postcodeErrorMessage}}</div>
            </div>
        </form>       
    </section>
    <section class="col-md-7 col-lg-5 offset-lg-1" id="browseLinkBlock">
        <h2 class="home-action-label mb-2">Choose your advertising space</h2>
        <router-link class="btn btn-primary btn-lg btn-block" title="browse opportunities" id="browseLink" :to="{path: '/advertise/search/'}">Start browsing</router-link>
    </section>
</div>

      
</div>
</template>

<script>

    export default {
        name: 'HomeSearch',
        data() {
            return {
                indexRef: "advertise",
                postcode:"",
                postcodeErrorMessage: ""
            }
        },
        methods: {
            postcodesearch: async function() {
                await this.$store.commit("SET_POSTCODE",this.postcode);
                await this.$store.dispatch("setLocationSearchParameter");
                if(!this.$store.state.noAddressesFound) 
                    this.$router.push("/advertise/search?postcode=true");
                else{
                    this.postcodeErrorMessage = "This postcode was not recognised"
                }
            }
        },
        computed:{
            isPostcodeError(){
                if(this.postcodeErrorMessage != "")
                    return true;
                return false;
            }
        }

    }
</script>


<style scoped lang="scss">

.postcode-input-group-error{
  border:darkred solid 2px;
}
    .postcode-error-message{
        color:darkred;
        transition: display .5s;
        font-weight: 600;
        font-size:22px;
    }
    .home-action-label {
        font-size:19px;
        text-align:left;
        font-weight:400;
    }

    input {
        border-color: black;
    }

    #postcodeSearchBlock {
        margin-top: 15px;
        margin-bottom: 10px;
    }

    #browseLinkBlock {
        margin-bottom: 20px;

        
    }
  @media only screen and (min-width: 400px) {
        .home-action-label {
            font-size:24px;
        }
  }
  
    @media only screen and (min-width: 576px) {
        #postcodeSearchBlock {
            margin-top: 30px;
            margin-bottom: 0;
        }
        #browseLinkBlock {

            margin-bottom: 30px;
        }
          .home-action-label {
            font-size:24px;
        }
 
    }
    #postcodeLabel{
        position:absolute;
    }

</style>
