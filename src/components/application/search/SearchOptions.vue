<template>
<section id="menu"  v-bind:class="{'show-search-form': showSearchForm}">
    <div id="fadedBackgroundBlock" @click="closeMenu" ></div>
    <div  v-bind:class="{'disabled-form': isSearching}"></div>
    <div id="searchOptionsContainer">
         <div id="closeBtnHolder" v-show="showSearchForm" >
             <div>Search options</div>
            <button class="btn btn-dark" id="closeBtn" @click="closeMenu">close</button>
        </div>


        <form id="searchForm">
            <div class="form-group dc-toggle">
                <span class="toggle-label search-option-title">Show available only</span>
                <label class="switch" for="available">
                    <input type="checkbox" id="available" v-model="available">
                    <span class="slider round"></span>
                    <span class="sr-only sr-only-focusable">Show available only</span>
                </label>
            </div>
            <label id="postcodeLabel" class="search-option-title"  for="postcode">Full postcode search</label>
            <div class="form-group">
                <div class="input-group" :class="{'error-postcode' : isInvalidPostcode || isNoAddressFound}">
                    <input class="form-control" id="postcode" name="postcode" type="text" v-model="postcode">
                    <div class="input-group-append">
                        <button class="btn btn-success" type="button" id="button-addon2" @click.prevent="search">Search</button>
                    </div>
                </div>
            </div>
            <div id="typesSelectionGroup">
                <legend class="form-legend search-option-title">Types of opportunities</legend>
                      <div class="type-options" >
                        <div class="form-group" style="margin-bottom:0">
                            <div class="multiple-choice">
                                <input type="checkbox" class="form-control" id="allTypes" @change="toggleAllDocumentTypes" v-model="allDocumentTypes">
                                <label for="allTypes"  class="mutliple-choice-label multiple-choice-small">All</label>
                            </div>
                        </div>
                        <div class="type-icon"></div>
                    </div>
                <div v-for="type in documentTypes" v-bind:key="type.reference">
                    <div class="type-options" >
                        <div class="form-group" style="margin-bottom:0">
                            <div class="multiple-choice" :title="type.name">
                                <input type="checkbox" class="form-control" :id="type.reference" @change="checkIfAllDocuemntTypes" v-model="type.selected">
                                <label :for="type.reference"  class="mutliple-choice-label multiple-choice-small">{{type.name}} </label>
                            </div>
                        </div>
                        <div class="type-icon"><img class="type-icon" :src="getIcon(type.reference)" alt=""></div>
                    </div>
                </div>
            </div>
            <button class="btn btn-success mt-2" type="button" @click.prevent="search">Search</button>
        </form>
    </div>
</section>
</template>

<script>
    import _ from 'lodash';
    import Vue from 'vue';
    import Vuex from 'vuex';
    import DocumentTypeService from '../../../services/DocumentTypeService';
    import DocumentService from '../../../services/DocumentService';
     import indexService from '../../../services/IndexService';
     import advertiseService from '../../../services/AdvertiseService';
    import gazetteerService from '../../../services/GazetteerService';

   export default {
        name: 'SearchOptions',
        data(){
          return {
            documentTypes: [],
            postcode:"",
            available:"",
            allDocumentTypes:true
          }
        },
        props: {
            showSearchForm: {
                type: Boolean,
                required: true
            },
            isSearching:{
              type:Boolean,
              required:true
            }
        },
        methods: {
            closeMenu() {
                this.$emit("onChangeShowSearchForm");
            },
            getIcon(documentType) {
                return require("../../../assets/images/icons/" + documentType + ".svg");
            },
            async search(){
              this.postcodeError = false;
              this.noAddressFound = false;
              var params = {};
              params.documentTypes = this.documentTypes.filter(type => type.selected == true)
                                                       .map(t => t.reference);

              if(this.available){
                params.properties = {};
                params.properties.Available = "true";
              }

              if(this.postcode.trim().length > 0){
                params.location = await gazetteerService.getLocationSearchParameter(this.postcode);

                this.$store.commit("SET_NO_ADDRESS_FOUND",params.location.noAddressFound);
                this.$store.commit("SET_NO_INVALID_POSTCODE", params.location.invalidPostscode);

              }

              this.$emit("onSearch",params)

            },

            checkIfAllDocuemntTypes(){
                var allSelected = true;
                this.documentTypes.forEach((type)=>{
                    console.log("type: " + type.reference + " - " + type.selected)
                  if(!type.selected)
                    allSelected = false;
                })
                this.allDocumentTypes = allSelected;
            },
              toggleAllDocumentTypes(){
                this.documentTypes.forEach((type=>{
                    type.selected = this.allDocumentTypes;
                }))

            }
        },
        watch:{
            available(){
               this.search();
            }

        },

        computed: {
            isInvalidPostcode(){
              return this.$store.state.postcodeSearchErrors.invalidPostscode;
            },
            isNoAddressFound(){
              return this.$store.state.postcodeSearchErrors.noAddressFound;
            }
/*
            available: {
                get: function() {
                     if(this.$store.state.searchAvailable)
                        return true;
                    return false;
                },
                set: async function(value) {
                    this.$store.commit("SET_AVAILABLE",value);

                }
            },
             postcode: {
                get: function(){
                    return this.$store.state.searchPostcode;
                },
                set: function(value){

                    this.$store.commit("SET_POSTCODE",value);
                }
            },
            isPostcodeError() {
              return this.$store.state.noAddressesFound;
            },
            isSearching(){
                return this.$store.state.isSearching;
            }
            */
        },
        async beforeMount(){
           await this.$store.dispatch("setIndex");
           this.documentTypes = _.cloneDeep(this.$store.state.documentTypes);

           if(this.$route.query.backtoresults){

               if(this.$store.state.searchParams.location && this.$store.state.searchParams.location.postcode)
                  this.postcode = this.$store.state.searchParams.location.postcode

                   if(this.$store.state.searchParams.properties && this.$store.state.searchParams.properties.Available)
                      this.available = this.$store.state.searchParams.properties.Available;

               this.documentTypes.forEach((type=>{
                 console.log("current type- " + type.reference)
                 console.log("params- " + this.$store.state.searchParams.documentTypes.size)
                 if(!this.$store.state.searchParams.documentTypes.includes(type.reference)){
                    type.selected = false;
                 }
               }))

           }
           else if(this.$route.query.documentType){
              var typeReference = this.$route.query.documentType;
              this.documentTypes.forEach((type)=>{
                 type.selected = false;
                 if(type.reference == typeReference)
                    type.selected = true;
              })
              this.allDocumentTypes = false;
           }
           else if(this.$route.query.postcode){
             this.postcode = this.$route.query.postcode;
             this.$store.commit("SET_SORT","nearest")
           }

            this.search();



        }
    }

</script>


<style scoped lang="scss">

.disabled-form{
  width:100%;
  height:100%;
  background:#f5f5f5;
  opacity:.6;
  position:absolute;
  left: 0;
  top:0;
  z-index: 4;
}

.error-postcode{
  border:solid 2px darkred;
}
   #postcodeLabel{
     font-size:19px;

    }

    .search-option-title
    {
        font-weight:600;
        font-size:19px;
    }
    .fullPostcodeMessage{
        display: block;
        color:#545454;

    }
    #menu {

        margin-top: 10px;
        left: 0;
        top: 110px;
        position: absolute;
        display: flex;
        left: -1000px;
        justify-content: center;
        width: 100%;
        z-index: 2;
        background: none;
        transition: opacity .5s;
        opacity: 0;
        &.show-search-form {
            left: 0;
            opacity: 1;
        }
    }

    #searchOptionsContainer {
        box-shadow: 3px 3px 5px #2A2A2A;
        background:#fafafa;
        z-index: 2;
        padding: 15px;
        max-width: 318px;
        margin-top: 25px;
        width: 95%;
        max-width: 400px;
    }

    #fadedBackgroundBlock {
        position: absolute;
        width: 100%;
        height: 150vh;
        background: #090909;
        opacity: .2;
    }

    #closeBtnHolder {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        #closeBtn {
            border: solid 1px grey;
            font-size:16px;
            &:before {
                content: 'X ';
            }
        }
    }


    #searchOptionsTitle {
        font-size: 19px;
    }



    #searchForm {
        font-size: 19px;
    }

    .form-group {
        margin-bottom: 5px;
    }


    @media only screen and (min-width: 360px) {
        #menu {
            top: 120px;
        }
    }

    @media only screen and (min-width: 430px) {
        #menu {
            top: 130px;
        }
    }

    @media only screen and (min-width: 760px) {
        #menu {
            top: 150px;
        }
    }

    @media only screen and (min-width: 795px) {
        #menu {
            top: 175px;
        }
         .dc-toggle{

        .toggle-label{

            font-size:22px;
        }
           #postcodeLabel{
     font-size:22px;
    }

    }
    }



    .multiple-choice .mutliple-choice-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .type-options {
        display: flex;
        .form-group {
            width: 80%;
            .multiple-choice label.label {
                line-height: 1.3;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .type-icon {
            width: 20%;
            position: relative;
            display: flex;

            .type-icon {
                position: absolute;
                top: -2px;
                width: 42px;
                height: 42px;
            }
        }
    }

    .type-icon {

        width: 45px;
        height: 45px;
    }

    #collapsePrice {
        margin-bottom: .5rem;
    }




    .dc-toggle{
        display: flex;
        margin-top:30px;
        margin-bottom:30px;
        .toggle-label{
            display: block;
            margin-right:20px;
            font-size:19px;
        }
        .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: hsl(203, 85%, 23%);
}

input:focus + .slider {
  box-shadow: 0 0 1px hsl(203, 85%, 23%);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
    }

    #typesSelectionGroup{
        margin-top:30px;
        margin-bottom:30px;
    }


     @media only screen and (min-width: 767px) {
        #searchOptionsContainer {
            margin-top: 25px;
        }
    }

    @media only screen and (min-width: 900px) {
        #menu {
            width:450px;
        }
    }



    @media only screen and (min-width: 900px) {
        #postcodeLabel{
            font-size:19px;
        }

        #postcode{
            border-color:black;
        }

        #menu {
            display: flex;
            position: relative;
            left: 0;
            opacity: 1;
            top: 0;
            width: 40%;
            #searchOptionsContainer {
                display: block;
                box-shadow: none;
                margin-top: 0;

            }
        }
        #fadedBackgroundBlock {
            display: none;
        }

        #closeBtnHolder {
            display: none;
        }
    }


</style>
