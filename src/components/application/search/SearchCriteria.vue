<template>
<div id="searchCriteria" >
    <div v-for="documentType in searchForm.documentTypes" class="label label-primary tag-label" v-if="documentType.selected">
        <span class="tag-item">{{documentType.reference}}</span>
        <span class="delete show" @click="removeDocumentType(documentType)" tabindex="0" title="Remove search criteria">X</span>     
    </div>
<!--
    <div v-for="property in searchForm.parameters" class="label label-primary tag-label">
        <span class="tag-item">
            <span v-if="property.reference=='price'">Max </span>{{property.reference}}: <span v-if="property.reference=='price'">&pound;</span>{{property.value}}
           </span>
            <span class="delete show" @click="removeProperty(property.reference)" tabindex="0" title="Remove search criteria">X</span>
        </div>  
-->
    <div v-if="searchForm.parameters.available" class="label label-primary tag-label">
           <span class="tag-item">Available</span>
           <span class="delete show" @click="removePostcodeSearch" tabindex="0" title="Remove search criteria">X</span>
    </div>  
       <div v-if="postcode != ''" class="label label-primary tag-label">
           <span class="tag-item">Postcode: {{postcode}}</span>
           <span class="delete show" @click="removePostcodeSearch" tabindex="0" title="Remove search criteria">X</span>
    </div>  
</div>
</template>

<script>
    import Vuex from 'vuex'
    import Toolbar from './Toolbar'
    export default {
        name: 'SearchCriteria',
        props: [
            "parameters",
            "documnetTypes",
            "location"

        ],
        watch: {
            searchForm: {
                handler: function() {
                    this.$store.dispatch("aSearch")
                },
                deep: true
            }
        },
        methods: {
            removeProperty: function(propertyToRemove) {
                // remove hyphens
                propertyToRemove = propertyToRemove.replace(/-/g, "")
                this.$store.dispatch("removeSearchCriteriaProperty", propertyToRemove)
            },
            removeDocumentType: function(type) {
                this.$store.dispatch("removeSearchDocumentType", type)
            },
            removePostcodeSearch: function() {
                this.postcode = ""
                this.$store.dispatch("aSearch")
            },
            toggleSearchForm() {
                this.$emit("onChangeShowSearchFom", !this.showSearchForm)
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
                    this.$store.commit("setPostcode", newValue);
                    this.$store.dispatch("setPostcodeSearchCriteria");
                }
            },
            searchForm() {

                return this.$store.state.searchForm;

            }

        }
    }

</script>

<style scoped lang="scss">
    #searchCriteria {
        display: none;
        margin-bottom: 15px;
        flex-wrap: wrap;


        .label {
            font-size: 14px;
            float: left;
            position: relative;
            display: inline-block;
            margin-left: 20px;
            font-weight: normal;
            padding: 1px;
            padding-right: 25px;
            border-radius: 0;
            transition: all 1s;
            border-bottom: solid 1px lightgrey;
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 40px;
            .tag-item {
                padding-right: 5px;
                &:focus {
                    outline: orange 1px solid;
                    +.delete {
                        &:hover{
                            color:darkred;
                            cursor: pointer;
                        }
                        background-color: darken(#337ab7, 10%);
                        color: white;
                    }
                }
            }

            .delete {
                position: absolute;
                top: 0;
                right: 0;
                display: inline-block;
                margin-left: 0;
                padding: 5px;
                font-size: 14px;

                &:hover,
                &:focus {
                    cursor: pointer;
                    color: darkred;

                }
                transition: all 0.5s;
            }
        }
    }

    .parameter {
        font-size: 14px;
        margin-right: 25px;
        color: darkgreen;
        &.unmatched {
            text-decoration: line-through;
            color: darkred;
        }
    }

    @media only screen and (min-width: 767px) {

        #searchCriteria {
            margin-left: 25px;
            display: flex;
            justify-content: center;
            margin-top:10px;
        }
    }

    @media only screen and (min-width: 550px) {
        #searchCriteria {



            .label {
                width: auto;
                overflow: hidden;
                text-overflow: inherit;
                height: auto;
            }
        }
    }

</style>
