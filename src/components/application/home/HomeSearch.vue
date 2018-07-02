<template>
<div class="row">
    <section class="col-sm-6 col-md-5" id="postcodeSearchBlock">      
        <form v-on:submit.prevent="postcodesearch">
            <div class="form-group" aria-labelledBy="search" aria-describedby="postcode">
                <h2 class="home-action-label" id="search">Find opportunities near you</h2>
                <label class="invisible" for="postcode" aria-label="Postcode" id="postcodeLabel">Postcode</label>
                <div class="input-group">
                    <input type="text" id="postcode" class="form-control  form-control-lg" placeholder="Search postcode" v-model="postcode">
                    <div class="input-group-append">
                        <button class="btn btn-success" aria-label="search" type="button" @click="postcodesearch" role="button"> GO </button>
                    </div>
                </div>
            </div>
        </form>       
    </section>
    <section class="col-sm-6 col-md-5 offset-md-1" id="browseLinkBlock">
        <h2 class="home-action-label">Opportunities available now!</h2>
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
    .home-action-label {
        font-size: 26px;
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

    @media only screen and (min-width: 576px) {
        #postcodeSearchBlock {
            margin-top: 30px;
            margin-bottom: 30px;
        }
        #browseLinkBlock {
            margin-top: 30px;
            margin-bottom: 30px;
        }
    }
    #postcodeLabel{
        position:absolute;
    }

</style>
