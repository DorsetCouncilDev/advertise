<template>
    <section class="questions-category-section">    
        <h3 class="section-heading">{{title}}</h3>
        <div class="open-section-area">
        <div class="open-section" v-bind:class="{ 'open': sectionAnswersOpen }" @click="toggleSection"></div>  
        </div>
        <Question v-for="q in questions" v-bind:key="q.id" :question="q" v-on:toggleAnswer="toggleQuestionAnswer"></Question>

    </section>

</template>


<script>
 import Question from './Question';
 export default {
   name: 'QuestionSection',
   data() {
     return {
       sectionAnswersOpen: false
     }
   },
   props: {
     title: String,
     questions: Array
   },
   components: {
     Question
   },
   methods: {
     toggleQuestionAnswer: function (id) {
       this.questions.forEach((q) => {
         if (q.id == id)
           q.open = !q.open;
       })
       this. updateAllOpen();
     },
     toggleSection: function () {
       this.sectionAnswersOpen = !this.sectionAnswersOpen;
       this.questions.forEach((q) => {
         q.open = this.sectionAnswersOpen;
       })
     },
     updateAllOpen(){
       var allOpen = true;
         this.questions.forEach((q) => {
         if(!q.open)
          allOpen = false;
       })
        this.sectionAnswersOpen = allOpen;
     }
   }
 }
</script>

<style scoped lang="scss">
.questions-category-section{
      position:relative;
    margin-bottom:30px;
    border-left: solid 2px hsl(177,100%,21%);
    padding-left:10px;
    margin-top:20px;
    .section-heading{
        color:hsl(177,100%,21%);
        font-size:19px;
    }
}
@media only screen and (min-width: 600px) {


.questions-category-section{
  
    padding-left:30px;
    margin-top:60px;
    border-left: solid 5px hsl(177,100%,21%);
     .section-heading{
        color:hsl(177,100%,21%);
        font-size:28px;
    }
}
.open-section-area{
.open-section{
    position: absolute;
    right: 0;
    top:0;
    color:hsl(203, 85%, 23%);
        font-weight: 500;
        font-size:19px;
        &:hover{
            cursor:pointer;
        }
    &:before{
           content:url(../../../assets/images/baseline-add-24px.svg);
            left:-30px;
            top:3px;
            position: absolute;
    }
    &:after{
        content:'open all'
    }
    &.open{
        &:before{
            content: url(../../../assets/images/baseline-remove-24px.svg);
        }
         &:after{
        content:'close all'
    }
    }
}}
}
.open-section-area{
    display: flex;
    flex-direction: row-reverse;
    width:100%; 
    
}
.open-section{

    position: relative;

    color:hsl(203, 85%, 23%);
    font-weight: 500;
    font-size:16px;
   
        &:hover{
            cursor:pointer;
        }
    &:before{
        content:url(../../../assets/images/baseline-add-24px.svg);
            left:-25px;
            position:absolute;
            
      
    }
    &:after{
        content:'open all'
    }
    &.open{
        &:before{
            content: url(../../../assets/images/baseline-remove-24px.svg);
        }
         &:after{
            content:'close all'
        }
    }
}

</style>