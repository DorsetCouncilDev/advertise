<template>
<section>

  <div class="row" id="searchSection">
<div class="col-sm-6 col-md-5" id="postcodeSearchBlock">
   
    <h2 class="">Find opportunities near you</h2>
    <form v-on:submit.prevent="postcodesearch">
    <div class="form-group">
<div class="input-group">
        <input type="text" id="search" class="form-control  form-control-lg" placeholder="Search postcode" aria-label="Search postcode" aria-describedby="basic-addon2" v-model="postcode">
    <div class="input-group-append">
    <button class="btn btn-success" type="button" @click="postcodesearch"> GO </button>
  </div>
    </div>
        </div>
       <!-- <button class="btn btn-success btn-lg  btn-govuk" @click="postcodesearch" type="button">Search</button>  -->
    

</form>
    </div>
    <div class="col-sm-6 col-md-5 offset-md-1" id="browseLinkBlock">
 <h2>Opportunities available now!</h2>
       <router-link class="btn btn-primary btn-lg btn-block" title="browse opportunities" id="browseLink" :to="{path: '/' + indexRef + '/search/'}">Start browsing</router-link>

 
    </div>
    
    </div>

 
    </section>

</template>



<script>
    import GazetteerService from '../../../services/GazetteerService' 

    export default {
        
        name: 'HomeSearch',
        props: ['indexRef'],
        methods:{
            postcodesearch: async function(){ 
                this.$store.dispatch("removeAllOtherSearchCriteria");
                await this.$store.dispatch("setPostcodeSearchCriteria")
                this.$router.push("/" + this.indexRef + "/search")
                
            } 
        },
        computed:{
            postcode:{
                get: function(){
                    var p = this.$store.state.searchForm.postcode
                    p = p.toUpperCase()
                    return p
                },
                set: function(newValue){
                   this.$store.commit("setPostcode",newValue)
                }
            }
        }
    }

</script>


<style scoped lang="scss">
    h2{
        font-size:26px;
    }
    input{
        border-color:black;
    }

    #browseLink{
      
   
     
        
    }
    
     #postcodeSearchBlock{
      margin-top:15px;
        margin-bottom:10px;
    }
    #browseLinkBlock{
        margin-bottom:20px;
    }
    @media only screen and (min-width: 576px) {
    #postcodeSearchBlock{
      margin-top:30px;
        margin-bottom:30px;
    }
    #browseLinkBlock{
         margin-top:30px;
        margin-bottom:30px;
    }
    }



</style>
