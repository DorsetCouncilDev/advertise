<template>
    <li class="document-type-square">
        <router-link :to="{ path: '/advertise/search/?documentType=' + documentTypeRef}" class="type-search-link">
            <span class="document-type-icon"><img class="type-icon"  :src="getIcon()" alt=""></span>
            <span class="document-type-name">
                <span class="type-name">{{documentTypeName}}</span>
            </span>
            <span class="type-text">{{text}}</span>
        </router-link>
    </li>
</template>

<script>

    export default {
        name: 'DocumentTypeDiscovery',
        props: [ 'documentTypeName','documentTypeRef','text'],
        data() {
            return {
                document: {},
                indexRef: "advertise"
            }
        },
        methods:{
            getIcon() {
                return require("../../../assets/images/icons/" + this.documentTypeRef + ".svg");
            }
        }
    }
</script>

<style scoped lang="scss">

    .document-type-square{
        width:46%;
        margin-right:5px;
        margin-bottom:25px;
        .type-search-link{
            display: block;
            width:100%;
            height:100%;
            background-color:  #f7f7f7;
            padding:5px;
            border:1px solid  grey;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0  hsl(203, 90%, 92%);
            transition: background-color 1s;
            &:hover{
                background-color: hsl(203, 97%, 97%);
                border-color:black;
            }
            &:focus{
                outline:orange 1px solid;
                background-color: hsl(203, 97%, 97%);
            }
        }
    }
    .type-icon{
        width:75px;
        height: 100px;
        margin-top:-10px;
    }
    .type-name{
        font-size: 16px;
        text-align: center;
        font-weight:500;
        display: block;
    }
    .document-type-icon{
        display: flex;
        justify-content: center;
    }
    .type-text{
        font-size:14px;
        font-style: italic;
        text-align:center;
        color: black;
        display: block;
    }

    @media only screen and (min-width: 555px) {
        .type-name{
            font-size: 19px;
        }

        .type-text{
            font-size:19px;
            font-style: italic;
            text-align:center;
        }
    }

    @media only screen and (min-width: 676px) {
        .document-type-square{
            background: #f7f7f7;
            .type-search-link{
                padding:15px;
            }
        }
        .type-icon{
            width:125px;
            height:auto;
            margin-top:0;
        }
        .type-name{
            font-size: 19px;
        }
        .document-type-icon{
            display: flex;
            justify-content: center;
        }
        .type-text{
            font-size:19px;
            font-style: italic;
            text-align:center;
        }
    }
    @media only screen and (min-width: 800px) {
        .document-type-square{
            width:45%;
        }
    }

      @media only screen and (min-width: 1000px) {
        .document-type-square{
            width:30%;
        }
    }

</style>
