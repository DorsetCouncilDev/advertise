<template>
<section id="navRow">
    <div id="navLinks" >
        <ol class="ad-breadcrumb" v-if="!isHomePage()">
            <li><router-link :to="{path: '/advertise'}">home</router-link></li>
            <li aria-current="page" v-if="isHomePage()">home</li>
            <li aria-current="page" v-if="isSearchPage()">search</li>
            <li v-if="isAssetPage()"><router-link :to="{ path: '/advertise/search'}">search</router-link></li>
            <li aria-current="page" v-if="isAssetPage()">{{assetRef}}</li>
            <li aria-current="page" v-if="isContactPage()">contact</li>
            <li aria-current="page" v-if="isMediapackPage()">mediapack</li>
            <li aria-current="page" v-if="isFAQPage()">frequently asked questions</li>
        </ol>
    </div>
    <nav role="navigation" id="menuLinks">
        <ul id="menuList">
            <li id="searchMenuItem"><router-link to="/advertise/search" :class="{selected:isSearchPage()}"><span id="searchDesktopLabel">Advertising </span>opportunities</router-link></li>
            <li><router-link to="/advertise/contact" :class="{selected:isContactPage()}">Contact us</router-link></li>
            <li><router-link to="/advertise/mediapack" :class="{selected:isMediapackPage()}">Media pack</router-link></li>
            <li><router-link to="/advertise/faq" :class="{selected:isFAQPage()}">FAQs</router-link></li>
        </ul>
    </nav>
</section>
</template>

<script>

    export default {
               name:"SiteTopNav",
          props: ["currentPage","assetRef"],
          methods:{
            isContactPage(){
                return this.currentPage == "contactPage";
            },
            isMediapackPage(){
                return this.currentPage == "mediapackPage";
            },
            isFAQPage(){
                return this.currentPage == "faqPage";
            },
            isHomePage(){
                return this.currentPage == "homePage";
            },
            isSearchPage(){
                return this.currentPage == "searchPage";
            },
            isAssetPage(){
                return this.currentPage == "assetPage";
            }
          }
    }

</script>

<style scoped lang="scss">



</style>
