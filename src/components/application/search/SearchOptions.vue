<template>
<div id="menu"  v-bind:class="{'show-search-form': showSearchForm}">
    <h2>Search Options</h2>
    <hr>
    <form>
        <label class="invisible" for="postcode">Postcode search</label>
        <legend>Postcode</legend>
        <div class="form-group">
            <input class="form-control" id="postcode" name="postcode" type="text" v-model="postcodeSearch"> 
        </div>
            
        <legend>Types</legend>
        <div v-for="type in documentTypes" v-if="type.display" class="mb-2">
        <div class="type-options" >
            <div class="form-group">
                <div class="multiple-choice">
                    <input type="checkbox" class="form-control" :id="type.reference" v-model="type.selected">
                    <label :for="type.reference" id="longLabel">{{type.name}} </label>
                </div>
            </div>
            <div class="type-icon">
                <img :src="getIcon(type.reference)">
            </div>
            
        </div>
       
            </div>
        <button class="btn btn-success mt-4" @click.prevent="search">Search</button>
    </form>
</div>
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
                postcodeSearch: ""
            }
        },
        methods: {
            getIcon(documentType) {
                return require("../../../assets/images/icons/" + documentType + ".svg");
            },
            async search() {
                if (this.postcodeSearch.length > 0) {
                    this.$store.commit("setPostcode", this.postcodeSearch)
                    await this.$store.dispatch("setPostcodeSearchCriteria")
                } else
                    this.$store.dispatch("aSearch");
                this.$emit("onChangeShowSearchForm")
            }
        },
        watch: {
            documentTypes: {
                handler: function() {
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
            documentTypes:{
                get: function() {
                 return this.$store.state.searchForm.documentTypes;
                }
            }
        },
        created() {
            this.postcodeSearch = this.postcode;
      
        }
    }

</script>


<style scoped lang="scss">
    .multiple-choice label {
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
            width:20%;
            position: relative;
            display: flex;
         
            img {
position: absolute;
                top:-2px;
        width: 42px;
        height: 42px;
    }
        }
    }

    img {

        width: 50px;
        height: 50px;
    }

    #collapsePrice {
        margin-bottom: .5rem;
    }

    #typesButton,
    #placesButton,
    #priceButton {
        font-size: 19px;
        padding-left: 30px;
        color: black;
        &:hover {
            text-decoration: none;
        }
        &:before {
            content: '-';
            position: absolute;
            left: 10px;
            margin-top: 3px;
            transition: transform .1s;

        }

        &.collapsed {
            &:before {
                content: '+';
                position: absolute;
                left: 10px;
                margin-top: 3px;
                transition: transform .1s;



            }
        }
    }

    h2 {
        font-size: 22px;
    }

    #menu {

        #longLabel {
            font-size: 16px;
            padding-left: 2px;
        }
        &.show-search-form {
            left: 0;
        }
        position: absolute;
        width: 97vw;
        top: 120px;
        left: -200vw;
        height:100%;
        transition: left .5s;
        background: white;
        padding: 10px;
        z-index: 2;
        margin-bottom: 20px;
        border-bottom: 20px solid white;
        &.open {
            left: 0px;
        }
        form {
            label {
                padding-bottom: 0;
                line-height: 1.3;
            }
            #placesToggle,
            #typesToggle {
                margin-bottom: 5px;
                display: block;
                &:focus {
                    text-decoration: none;
                }
                &:hover {
                    text-decoration: none;
                }
                &:visited {
                    text-decoration: none;
                }
                &:before {
                    content: '+';
                    top: 5px;
                    position: relative;
                }
                &[aria-expanded=true] {
                    &:before {
                        content: '-';
                        top: 5px;
                        position: relative;
                    }
                }
            }
        }
    }

    #menuOpen {

        &.open {

            &:before {
                content: url(../../../assets/images/close.svg);
            }
        }
        &:before {
            content: url(../../../assets/images/settings-sm.svg);
            margin-right: 1px;
        }
        &:after {
            content: 'Search';
        }
        &.open:after {
            content: 'Close';
        }
    }

    #searchMenuHolder {
        width: 100%;
        height: 80px;
        position: relative;
    }

    @media only screen and (min-width: 545px) {

        #menu {
            top: 300px;
        }
    }

    @media only screen and (min-width: 800px) {

        #menu {
            position: relative;
            width: 40%;
            left: 0;
            top: 0;
            background: white;
            border-right: solid 1px grey;
            padding-right: 30px;
        }
        #menuOpen {
            display: none;
        }
    }

    .invisible {
        font-size: 3px;
        position: absolute;
    }
    
    #searchHeading{
        width:100%;
        display: flex;
        justify-content: space-between;
    }
    
    

</style>
