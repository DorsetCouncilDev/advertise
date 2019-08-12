<template>
  <section id="imagesSection">
    <h3>Images</h3>
    <div id="imageContainer" >
    <img :src="images[0].sources[0].url" v-if="images.length == 1" id="singleImage">
    <div id="imageGallery" v-if="images.length > 1">
      <div class="arrow-left-button" @click="nextImage('l')"><div class="arrow-left"></div></div>
      <div class="arrow-right-button" @click="nextImage('r')"> <div class="arrow-right"></div></div>
      <div class="images">
        <div class="image-holder" v-for="image in images" v-bind:key="image.id">
          <img :src="image.sources[0].url" class="galleryImage" :class="{'currentGalleryImage':image.current}">
        </div>
      </div>
      <div id="imageThumbsContainer">

   <div class="thumbnail-holder" :class="{'selected-image': currentImage.id == image.id}" v-for="image in images" v-bind:key="image.id" v-on:click="selectImage(image)" :id="image.id">

          <img :src="image.sources[0].url" class="image-thumbnail">
          </div>


          </div>
    </div>

    </div>


  </section>
</template>

<script>
import imageService from './../.././../services/ImageService';
export default {
  name: 'ImageGallery',
data(){
  return{
    currentImage:{},
    imageA:{},
    isOverflowed: false
  }
},
  props: {
    images:{
      type:Array,
      required:true
    }
  },
  methods:{
    nextImage(direction){
      var nextImage = null;
       if(direction == 'l'){
          if(this.currentImage.id - 1 < 0)
            nextImage = this.images[this.images.length-1];
          else
            nextImage = this.images[this.currentImage.id - 1];
       }
        if(direction == 'r'){
          if(this.currentImage.id + 1 > (this.images.length-1))
            nextImage = this.images[0];
          else
            nextImage = this.images[this.currentImage.id + 1];
       }

       this.$nextTick(() => this.showCurrent(nextImage.id));

       this.selectImage(nextImage);
    },showCurrent(index) {
            document.getElementById(index).scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start' });
        },
    selectImage(image){
      this.images.forEach(img => {
          if(img.id == image.id)
              img.current = true;
          else
              img.current = false;
      });
      this.currentImage = image
    }
  },
  beforeMount(){
    this.selectImage(this.images[0]);
  }

}
</script>

<style scoped lang="scss">

  #imageContainer{
display:flex;
justify-content: center;
  }
  #singleImage{
    width:100%;
    max-width:500px;
  }

  #imageGallery{
    width:100%;
    max-width:319px;
    position:relative;
  }

    .image-holder{
      display: flex;
      justify-content: center;
    }
      .galleryImage{
        display:none;
        height: 150px;
        &.currentGalleryImage{
          display:block;
        }
      }

    .arrow-left-button{
      position:absolute;
      left:-10px;
      width:45px;
      height:45px;
      background:white;
      border:solid 5px hsl(203, 85%, 23%);
      top:20%;
      transition:opacity 0.8s;
      &:hover{
          border-color:orange;
      }
      .arrow-left{
        width:20px;
        height:20px;
        border-left:5px solid hsl(203, 85%, 23%);
        border-bottom:5px solid hsl(203, 85%, 23%);
        position: absolute;
        top:9px;
        left:12px;
        transform: rotate(45deg);
      }
    }
    .arrow-right-button{
      position:absolute;
      right:-10px;
      width:45px;
      height:45px;
      background:white;
      border:solid 5px hsl(203, 85%, 23%);
      top:20%;
      transition:opacity 0.5s;
      &:hover{
        border-color:orange;
      }
      .arrow-right{
        position:absolute;
        width:20px;
        height:20px;
        left:5px;
        top:8px;
        border-right:5px solid hsl(203, 85%, 23%);
        border-top:5px solid hsl(203, 85%, 23%);
        border-left:none;
        border-bottom:none;
        transform: rotate(45deg);
      }
    }


    #imageThumbsContainer{
      position: relative;
      margin-top:15px;
      height:100px;
      width:100%;
      border-top:solid 2px #f1f1f1;
      border-bottom:solid 2px #f1f1f1;
      padding:15px 0 5px 0;
      display:flex;
      overflow-x:scroll;


      .thumbnail-holder{
        .image-thumbnail{
          height: 60px;
          margin-right:10px;
          padding:5px;
          border: white 5px solid;
        }
        &.selected-image{
          .image-thumbnail{
            border: hsl(203, 85%, 23%) 5px solid;
          }
        }
      }
    }

    #singleImage{
      width:500px;
    }

 @media only screen and (min-width: 500px) {

   #imageGallery{
    width:100%;
    max-width:450px;
    position:relative;
  }
   .galleryImage{
        display:none;
        height: 200px;
 }
 }

  @media only screen and (min-width: 600px) {

   #imageGallery{
    width:100%;
    max-width:575px;
    position:relative;
  }
   .galleryImage{
        display:none;
        height: 300px;
 }
 .arrow-left-button{
      top:30%;
 }
  .arrow-right-button{
      top:30%;
 }
 }


 @media only screen and (min-width: 900px) {

   #imageGallery{
    width:100%;
    max-width:850px;
    position:relative;
  }
   .galleryImage{
        display:none;
        height: 400px;
 }
 .arrow-left-button{
      top:30%;
 }
  .arrow-right-button{
      top:30%;
 }


  #imageThumbsContainer{
    height:130px;
 .thumbnail-holder{
        .image-thumbnail{
          height:80px;
        }
 }
  }
 }
</style>
