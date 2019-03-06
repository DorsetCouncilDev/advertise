<template>
<section id="menu"  v-bind:class="{'show-search-form': showSearchForm}">
    <div id="fadedBackgroundBlock" @click="closeMenu" ></div>
    <div id="searchOptionsContainer">
         <div id="closeBtnHolder" v-show="showSearchForm" >
            <button class="btn btn-light" id="closeBtn" @click="closeMenu">hide</button>
        </div>
    <h2 id="searchOptionsTitle">Search Options</h2>

    <form id="searchForm" >
        <div class="form-group dc-toggle">
          <span class="toggle-label">Show available only</span>
       <label class="switch" for="available">
  <input type="checkbox" id="available" v-model="available">
  <span class="slider round"></span>
</label>
</div>
        <label id="postcodeLabel"  for="postcode">Full postcode search</label>
        <div class="form-group">
            <div class="input-group">
            <input class="form-control" id="postcode" name="postcode" type="text" v-model="postcodeSearch"> 
              <div class="input-group-append">
    <button class="btn btn-success" type="button" @click.prevent="search" id="button-addon2">Search</button>
  </div>
  </div>
        </div>
    <div id="typesSelectionGroup">
        <legend class="form-legend">Types</legend>
        <div v-for="type in documentTypes"  class="mb-2" v-bind:key="type.reference">
        <div class="type-options" v-if="type.display">
            <div class="form-group">
                <div class="multiple-choice" :title="type.name">
                    <input type="checkbox" class="form-control" :id="type.reference" v-model="type.selected">
                    <label :for="type.reference"  class="mutliple-choice-label">{{type.name}} </label>
                </div>
            </div>
            <div class="type-icon">
                <img class="type-icon" :src="getIcon(type.reference)" alt="">
            </div>
            
        </div>
       
            </div>
            </div>
        <button class="btn btn-success mt-2" type="button" @click.prevent="search">Search</button>
    </form>
        </div>
</section>
</template>

<script>
    import _ from 'lodash'
    import Vue from 'vue'
    import Vuex from 'vuex'


    import DocumentTypeService from '../../../services/DocumentTypeService';
    import DocumentService from '../../../services/DocumentService';
    import GazetteerService from '../../../services/GazetteerService';

    export default {
        name: 'SearchOptions',
        props: {

            showSearchForm: {
                type: Boolean,
                required: true
            }

        },
        data() {
            return {
                postcodeSearch: "",

            }
        },
        methods: {
            closeMenu() {
                this.$emit("onChangeShowSearchForm");
            },
            getIcon(documentType) {
                return require("../../../assets/images/icons/" + documentType + ".svg");
            },
            async search() {
                if (this.postcodeSearch.length > 0) {
                    this.$store.commit("setPostcode", this.postcodeSearch)
                    await this.$store.dispatch("aSearch")
                } else {
                    this.$store.commit("setPostcodeSearchCriteria", null)
                    this.$store.commit("setPostcode", "")
                    this.$store.dispatch("aSearch");
                }
                this.$emit("onChangeShowSearchForm")
            }
        },
        watch: {
            documentTypes: {
                handler: function() {
                    console.log("types changes")
                    this.$store.dispatch("setTypesSearchChange", this.documentTypes)

                },
                deep: true
            },
            postcode: function() {
                this.postcodeSearch = this.postcode;
            }
        },
        computed: {

            postcode: {
                get: function() {
                    var p = this.$store.state.searchForm.postcode
                    p = p.toUpperCase()
                    return p
                }
            },
            documentTypes: {
                get: function() {
                    return this.$store.state.searchForm.documentTypes;
                }
            },
            available: {
                get: function() {
                    return this.$store.state.searchForm.available;
                },
                set: function(value) {
                    this.$store.dispatch("setAvailableSearch", value)
                }
            }
        },
        created() {
            this.postcodeSearch = this.postcode;
        }
    }

</script>


<style scoped lang="scss">
    
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
        justify-content: center;
        margin-bottom: 5px;
        #closeBtn {
            border: solid 1px grey;
            &:before {
                content: 'X ';
            }
        }
    }


    #searchOptionsTitle {
        font-size: 19px;
    }

    @media only screen and (min-width: 767px) {
        #searchOptionsContainer {
            margin-top: 25px;
        }

    }

    #searchForm {
        font-size: 16px;
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
        
    }

    @media only screen and (min-width: 900px) {
        #postcodeLabel{
     font-size:19px;   
    }
        #menu {

            display: flex;
            position: relative;
            left: 0;
            opacity: 1;
            top: 0;
            width: 275px;
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

        width: 50px;
        height: 50px;
    }

    #collapsePrice {
        margin-bottom: .5rem;
    }

    
        @media only screen and (min-width: 900px) {
        #menu {
            width:450px;
            }
    }
    
            @media only screen and (min-width: 1400px) {
        #menu {
            width:550px;
            }
    }

    .dc-toggle{
        display: flex;
        margin-top:30px;
        margin-bottom:30px;
        .toggle-label{
            display: block;
            margin-right:20px;
            font-size:22px;
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
      #postcodeLabel{
     font-size:22px;   
    }
</style>
