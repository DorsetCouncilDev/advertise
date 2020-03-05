<template>
<section id="navRow">
    <div id="navLinks">
      <a href="#skipQuickLinksLink" class="skip-link">Skip breadcrumbs</a>
      <nav aria-label="breadcrumbs" >
        <ol class="ad-breadcrumb" v-if="!isHomePage()">
            <li><router-link :to="{path: '/advertise'}">home</router-link></li>
            <li aria-current="location" v-if="isHomePage()">home</li>
            <li aria-current="location" v-if="isSearchPage()">search</li>
            <li v-if="isAssetPage() ">

              <router-link v-if="backToSearchResults"  :to="{ path: 'search?backtoresults=true'}">search results</router-link>
                <router-link v-else :to="{ path: 'search'}">search</router-link>
            </li>
            <li aria-current="location" v-if="isAssetPage()">{{assetRef}}</li>
            <li aria-current="location" v-if="isContactPage()">contact</li>
            <li aria-current="location" v-if="isMediapackPage()">mediapack</li>
            <li aria-current="location" v-if="isFAQPage()">frequently asked questions</li>
        </ol>
      </nav>
    </div>

    <nav role="navigation" id="menuLinks" aria-label="Quick links">
        <a href="#content" class="skip-link" id="skipQuickLinksLink">Skip quick links</a>
        <ul id="menuList">
            <li id="searchMenuItem"><router-link to="/advertise/search?new=true" :class="{selected:isSearchPage()}">Advertising opportunities</router-link></li>
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
               data(){
                 return{
                  pathToSearch: "advertise/search"
                 }
               },
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
          },
          computed:{
            backToSearchResults(){
                if(this.$route.query.fromsearch)
                  return true;
                  return false;
            }
          },
          beforeMount(){
            if(this.$route.query.fromsearch)
                this.pathToSearch = "search?backtoresults=true"

          }
    }

</script>

<style scoped lang="scss">



</style>
