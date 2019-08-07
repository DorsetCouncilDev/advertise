<template>
<div id="searchToolbar">
    <div id="menuIcon">
        <button v-on:click="toggleSearchForm" type="button" aria-label="Search" class="btn btn-light" aria-describedby="descriptionSearch" id="searchOptionsBtn"><img src="../../../assets/images/search-black.svg" alt="Open search menu" id="searchButtonIcon"></button>
    </div>
    <div class="stv-radio-tabs-wrapper">
        <label id="sortSelectLabel" for="sortSelect">Sort</label>
        <select class="form-control" id="sortSelect" v-model="advertiseSort" >
            <option value="price-high">Cost highest</option>
            <option value="price-low">Cost lowest</option>
             <option value="name-az">Name A-Z</option>
            <option value="name-za">Name Z-A</option>
            <option v-show="isLocationSearch" value="nearest">Nearest</option>
            <option v-show="isLocationSearch" value="furthest">Furthest</option>
        </select>

         <fieldset>
            <legend id="viewLegend">View documents options</legend>
            <input  type="radio" class="stv-radio-tab" id="one" name="tickme" value="map" v-model="view">
            <label for="one" id="mapViewLabel">Map</label>
            <input type="radio" class="stv-radio-tab" id="two" name="tickme" value="grid" v-model="view">
            <label for="two" id="gridViewLabel">Grid</label>
            <input type="radio" class="stv-radio-tab" id="three" name="tickme" value="list" v-model="view">
            <label for="three" id="listViewLabel">List</label>
        </fieldset>
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
            advertiseSort: {
                get() {
                    return this.$store.state.sort
                },
                set(value) {
                    this.$store.dispatch("sortSearchResults",value);
                }
            },
            view: {
                get() {
                    return this.$store.state.view
                },
                set(value) {
                    this.$store.commit("SET_VIEW", value);

                }
            },
            isLocationSearch() {
                if(this.$store.state.searchParams.location && this.$store.state.searchParams.location.latitude)
                  return true;
                return false;
            }

        }
    }
</script>

<style scoped lang="scss">
    $viewChoiceWidth: 60px;
    $viewChoiceHeight: 43px;
    $sortSelectHeight:35px;
    $sortSelectWidth:100px;

    #viewLegend{
        opacity:0;
        position:absolute;
    }

    #descriptionSearch {
        position: absolute;
        left: -1000px;
        opacity: 0;
    }

    #searchToolbar {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        background: none;
        margin-bottom:15px;

        #sortSelectLabel {
            float: left;
            height: 40px;
            line-height: 2.5;
            margin-right: 10px;
            font-weight: 400;
            position: absolute;
            left: -9000px;
        }
        #sortSelect{
          height:40px;
        }

        .stv-radio-tabs-wrapper {
            clear: both;
            display: inline-block;
            padding: 0;
            position: relative;
        }

        input.stv-radio-tab {
            position: absolute;
            cursor: pointer;
            left: 0;
            top: 0;
            width: 38px;
            height: 38px;
            z-index: 1;
            margin: 0;
            opacity: 0;
            &:focus {
                &+label {
                    border: orange solid 1px;

                }
            }
            &+label {
                cursor: pointer;
                float: left;
                border: solid 1px black;
                background-color: #fff;
                margin-right: -1px;
                padding-left: 30px;
                padding-top: 10px;
                padding-right: 7px;
                padding-bottom: 10px;
                position: relative;
                height: 40px;
                &:before {
                    position: absolute;
                    left: -1px;
                    margin-left: 4px;
                }


                &#gridViewLabel {
                    display: none;
                    &:before {
                        content: url(../../../assets/images/grid.svg);
                        border-color:black;

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
                background-color: hsl(203, 85%, 23%);
                color:white;
                z-index: 1;
                &#gridViewLabel:before{
                    content: url(../../../assets/images/grid-white.svg);
                }
                 &#listViewLabel:before{
                    content: url(../../../assets/images/list-white.svg);
                }
                 &#mapViewLabel:before{
                    content: url(../../../assets/images/map-white.svg);
                }
            }
        }
        select {
            margin-right: 5px;
            font-size: 14px;
            float: left;
            border: solid 1px black;
            width: 105px;
            padding-left: 0;
            color: rgb(33, 37, 41);
            &:focus {
                border: orange 1px solid;
            }
        }

    }

     @media only screen and (min-width: 445px) {
         #searchOptionsBtn{
             &:after{
                 content:' Search options'
             }
         }
 #searchToolbar {
          #sortSelect{
          height:50px;
          }
           input.stv-radio-tab {
                &+label {
                    height:50px;
                }
        }
 }

    }

    @media only screen and (min-width: 767px) {
        #searchToolbar {
            font-size: 19px;
            justify-content: center;

            input.stv-radio-tab {
                &+label {
                    &#gridViewLabel {
                        display: block;
                    }
                }
            }
        }

    }


    @media only screen and (min-width: 900px) {
        #searchToolbar {
            font-size: 19px;
            justify-content: center;




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
