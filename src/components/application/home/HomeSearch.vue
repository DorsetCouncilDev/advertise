<template>
<div>
<div class="row">
    <section class="col-sm-6 col-lg-5" id="homeLocationSearch">
        <form v-on:submit.prevent="postcodesearch">
            <div class="form-group" id="postcodeSearchFormGroup" aria-labelledBy="search">
                <label class="home-action-label mb-1" id="search" for="postcode">Advertising location finder</label>


                <div class="input-group" v-bind:class="{ 'postcode-input-group-error' : postcodeError }" id="postcode-input-group">
                    <input type="text" id="postcode" class="form-control  form-control-lg" placeholder="Enter full postcode" v-model="postcode">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button" id="searchGoBtn" @click="postcodesearch" aria-label="Search postcode"> GO </button>
                    </div>
                </div>
           <div class="postcode-error-message">{{postcodeErrorMessage}}</div>
            </div>
        </form>
    </section>
    <section class="col-sm-6 col-lg-5 offset-lg-1" id="browseLinkBlock">
        <h2 class="home-action-label mb-3">Choose your advertising space</h2>
        <router-link class="btn btn-primary btn-lg btn-block" title="browse opportunities" id="browseLink" :to="{path: '/advertise/search?new=true'}">Start browsing</router-link>
    </section>
</div>


</div>
</template>

<script>
import GazetteerService from './../../../services/GazetteerService'
    export default {
        name: 'HomeSearch',
        data() {
            return {
                indexRef: "advertise",
                postcode:"",
                postcodeErrorMessage: "",
                postcodeError: false
            }
        },
        methods: {
            postcodesearch: async function() {

                if(this.postcode.trim().length < 5){
                    this.postcodeErrorMessage = "Invalid postcode";
                    this.postcodeError = true;
                }
                else
                    this.$router.push("/advertise/search?postcode=" + this.postcode);

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


 @media only screen and (min-width: 576px) {
    #homeLocationSearch{
      margin-bottom:0;
  }
 }



</style>
