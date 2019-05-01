<template>
<div class="row">
    <section class="col-md-7 col-lg-5" id="postcodeSearchBlock">      
        <form v-on:submit.prevent="postcodesearch">
            <div class="form-group" aria-labelledBy="search">
                <h2 class="home-action-label mb-2" id="search">Advertising location finder</h2>
                <label class="invisible" for="postcode" id="postcodeLabel">Postcode</label>
                <div class="input-group">
                    <input type="text" id="postcode" class="form-control  form-control-lg" placeholder="Enter full postcode" v-model="postcode">
                    <div class="input-group-append">
                        <button class="btn btn-success" type="button" id="searchGoBtn" @click="postcodesearch"> GO </button>
                    </div>
                </div>
            </div>
        </form>       
    </section>
    <section class="col-md-7 col-lg-5 offset-lg-1" id="browseLinkBlock">
        <h2 class="home-action-label mb-2">Choose your advertising space</h2>
        <router-link class="btn btn-primary btn-lg btn-block" title="browse opportunities" id="browseLink" :to="{path: '/advertise/search/'}">Start browsing</router-link>
    </section>
</div>
</template>

<script>
    import GazetteerService from '../../../services/GazetteerService'

    export default {
        name: 'HomeSearch',
        data() {
            return {
                indexRef: "advertise"
            }
        },
        methods: {
            postcodesearch: async function() {
                this.$store.dispatch("removeAllOtherSearchCriteria");
                await this.$store.dispatch("setPostcodeSearchCriteria")
                this.$router.push("/advertise/search")
            }
        },
        computed: {
            postcode: {
                get: function() {
                    var p = this.$store.state.searchForm.postcode
                    p = p.toUpperCase()
                    return p
                },
                set: function(newValue) {
                    this.$store.commit("setPostcode", newValue)
                }
            }
        }
    }
</script>


<style scoped lang="scss">
    
    $buttonBrowseDark: darken(#5975de,50%);
    $buttonBrowse: darken(#5975de,30%);
    
    $buttonBrowseHoverDark: darken(#5975de,40%);
    $buttonBrowseHover: darken(#5975de,20%);
    
    $buttonGoDark: darken(#60d844,50%);
    $buttonGo:darken(#60d844,30%);
    
     $buttonGoHoverDark: darken(#60d844,40%);
    $buttonGoHover:darken(#60d844,20%);

    
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
            margin-top: 30px;
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
