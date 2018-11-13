<template>
<div id="searchToolbar">
    <div id="menuIcon">
        <button v-on:click="toggleSearchForm" type="button" aria-label="Search" class="btn btn-light" aria-describedby="descriptionSearch"><img src="../../../assets/images/search-black.svg" alt="Open search menu"></button>
    </div> 
        <div class="stv-radio-tabs-wrapper">
                <label id="sortSelectLabel" for="sortSelect">Sort</label>
                <select class="stv-radio-tab form-control" id="sortSelect" v-model="sort" >
                    <option value="best-match" selected="selected">Best match</option>
                    <option value="price-high">Cost high</option>
                    <option value="price-low">Cost low</option>
                </select>
            
                <input  type="radio" class="stv-radio-tab" id="one" name="tickme" value="mapView" v-model="view">
                <label for="one" id="mapViewLabel">Map</label>
                      
                <input type="radio" class="stv-radio-tab" id="two" name="tickme" value="gridView" v-model="view">
                <label for="two" id="gridViewLabel">Grid</label>

                <input type="radio" class="stv-radio-tab" id="three" name="tickme" value="listView" v-model="view">
                <label for="three" id="listViewLabel">List</label>
        </div>
    <div id="descriptionSearch">Open the search options, when hidden on a small screen. Selecting again shall close the search options.</div>
    </div>
</template>

<script>
    export default {
        name: 'Toolbar',
        data() {
            return {
                map: null
            }
        },
        props: {
            showSearchForm: {
                type: Boolean,
                require: true
            }
        },
        methods: {
            toggleSearchForm: function() {
                this.$emit("onChangeShowSearchForm")
            }

        },

        computed: {
            sort: {
                get() {
                    return this.$store.state.sort
                },
                set(value) {
                    var sortValue = value;
                    if (sortValue == 'bestmatch')
                        this.$store.dispatch("sortResultsByBestMatch")
                    else {
                        var sortValueArray = value.split("-");
                        var sortProperty = sortValueArray[0];
                        var sortType = sortValueArray[1];
                        var sortObj = {
                            'sortProperty': sortProperty,
                            'sortType': sortType,
                            'sortValue': sortValue
                        }
                        this.$store.dispatch("sortResultsByProperty", sortObj);
                    }
                }
            },
            view: {
                get() {
                    return this.$store.state.view
                },
                set(value) {
                    this.$store.commit("setView", value);

                }
            }
        }
    }

</script>

<style scoped lang="scss">
    $viewChoiceWidth: 60px;
    $viewChoiceHeight: 43px;
    $sortSelectHeight:35px;
    $sortSelectWidth:100px;

    #descriptionSearch{
        position:absolute;
        left:-1000px;
        opacity:0;
    }
    #searchToolbar {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        background: none;

        #sortSelectLabel {
            float: left;
            height: 50px;
            line-height: 2.5;
            margin-right: 10px;
            font-weight: 400;
            position: absolute;
            left: -9000px;
        }

        .stv-radio-tabs-wrapper {
            clear: both;
            display: inline-block;
            padding: 0;
            position: relative;
        }

        input.stv-radio-tab {
            position: absolute;
            left: -99999em;
            top: -99999em;
            &:focus {
                &+label {
                    border: orange solid 1px;
                }
            }
            &+label {
                cursor: pointer;
                float: left;
                border: solid 1px #ced4da;
                background-color: #fff;
                margin-right: -1px;
                padding-left: 30px;
                padding-top: 10px;
                padding-right: 5px;
                padding-bottom: 10px;
                position: relative;
                &:before {
                    position: absolute;
                    left: -1px;
                    margin-left: 4px;
                }


                &#gridViewLabel {
                    display: none;
                    &:before {
                        content: url(../../../assets/images/grid.svg);
                    }
                    &:focus {
                        border: orange solid 1px;
                    }
                }
                &#listViewLabel {
                    &:before {
                        content: url(../../../assets/images/list.svg);
                    }
                    &:focus {
                        border: orange solid 1px;
                    }
                }
                &#mapViewLabel {
                    &:before {
                        content: url(../../../assets/images/map.svg);
                    }
                    &:focus {
                        border: orange solid 1px;
                    }
                }
                &:hover {
                    background-color: #eee;
                }
            }

            &:checked+label {
                background-color: #EDEDED;
                z-index: 1;
            }
        }
        select {
            margin-right: 5px;
            font-size: 14px;
            float: left;
            border: solid 1px #ced4da;
            width: 105px;
            padding-left: 0;
            color: rgb(33, 37, 41);
            &:focus {
                border: orange 1px solid;
            }
        }

    }

    @media only screen and (min-width: 800px) {
        #searchToolbar {
            font-size: 19px;
            justify-content: flex-end;
            #menuIcon {
                display: none;
            }
            input.stv-radio-tab {
                &+label {

                    &:before {
                        top: 13px;
                    }
                    &#gridViewLabel {
                        display: block;
                    }
                }
            }
            select {
                font-size: 19px;
                height: 50px;
                width: 120px;
            }
        }
    }

    @media only screen and (min-width: 1000px) {
        #searchToolbar {
            #sortSelectLabel {
                position: relative;
                left: 0;
            }
            #sortSelect {
                margin-right: 5px;
                float: left;
                width: 150px;
                padding-left: 0;
            }
        }
    }

</style>
