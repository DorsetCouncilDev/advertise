<template>
    <div class="question-block" v-bind:class="{ 'hide': !question.open }">
        <a class="question" :id="question.id" tabindex="0" @click="toggleAnswer()">{{question.question}}</a>
        <div class="answer" :aria-labelledby="question.id" v-show="question.open">
        <div v-html="question.answer"></div>
        </div>
    </div>

</template>


<script>
export default {
        name: 'Question',
        props: {
            question:Object
        },
      methods:{
          toggleAnswer:function(){
              this.$emit("toggleAnswer",this.question.id)
          }
        }
 }
</script>

<style scoped lang="scss">
.question-block{
      border-bottom: solid 1px  hsl(177,100%,21%);
      position:relative;
    .question{
        font-size: 16px;
        font-weight:500;
        color:#151515;
        padding:5px;
        padding-left:30px;
        display:block;
        margin-top:5px;
        margin-bottom:5px;
        transition:color .6s;
        &:focus{
            outline:1px solid orange;
        }

        &:before{
            content:url(../../../assets/images/baseline-remove-24px.svg);
            margin-top:10px;position:absolute;
            left:0px;
            top:-2px;
        }
        &:hover{
            cursor:pointer;
        }
    }
    .answer{
        padding: 15px 10px;
        background:#f5f5f5;
        height:auto;
        overflow:visible;    
        transition: opacity .5s;
        opacity:1;
        margin-bottom:15px;
        font-size:16px;
        ul{
            padding-left:20px;
        }
    }

    &.hide{
        .question{
            &:before{
                 content:url(../../../assets/images/baseline-add-24px.svg);
            }
        }
        .answer{
            height:0;
            overflow:hidden;    
            margin-top:0;
            padding:0;
            opacity:0;
            margin-bottom:0;
        }
    }
 }
#toggleAll{
    margin-top:30px;
   color: hsl(203, 85%, 23%);
   text-decoration: underline;
   cursor: pointer;
   font-weight: 500;
   &:hover{
       color: hsl(203, 85%, 33%);
   }
}

@media only screen and (min-width: 600px) {
     #faqHeading{
    font-size:32px;
    margin-top:30px;
}
.questions-category-section{
    padding-left:30px;
    margin-top:60px;
    border-left: solid 5px hsl(177,100%,21%);
   

    .question-block{
    .question{
      font-size:19px;
    }
      .answer{

        padding: 15px 30px;
        background:#f5f5f5;
        height:auto;
        overflow:visible;    
        transition: opacity .5s;
        opacity:1;
        margin-bottom:15px;
        font-size:19px;

           ul{
            padding-left:30px;
        }
    }
      &.hide{
        .question{
            &:before{
                 content:url(./../../../assets/images/baseline-add-24px.svg);
            }
        }
        .answer{
            height:0;
            overflow:hidden;    
            margin-top:0;
            padding:0;
            opacity:0;
            margin-bottom:0;
        }
    }
    
    }
}
 }

</style>