<template>       

<div>
    <h1>{{documentRef}}</h1>
    <h2>Manage images</h2>
    <div id="manageImagesPage">

        <div id="currentImageContainer">
        <div>
            				<uppload :settings="settings" >
						<button class="btn btn-primary">Upload</button>
					</uppload>
				</div>
        <div id="image">
          <img  :src="url">
          <input type="text" :model="fileName">
          </div>
        </div>
        
        <div id="imageListContainer">
        <h2>Images</h2>
        </div>
    </div>
    </div>                                                                                   
</template>


<script>
  /* 
 import DocumentService from '../../../services/DocumentService';
    const UpploadVue = window["uppload-vue"].default;
    
    export default {
        
        name: 'Images',
         props: {
            indexRef: {
                type: String,
                required: true
            },
            documentRef: {
                type: String,
                required: true
            }
        },
        components: {
            "uppload": UpploadVue
        },
        data() {
          return {
              document:null,
                   fileName: "",
                    fileSize: "",
                    message:"",
                    url:"",
            settings: {
		        minimumDelay: 2000,
				uploadFunction: file => {
                    return new Promise((resolve, reject) => {
                        this.url =  URL.createObjectURL(file);
                        console.log(file);
                        //resolve(file);
                    });
                }
            }
          }
        },

        methods: {
      async getDocument() {
                await DocumentService.getDocument(this.indexRef, this.documentRef).then((response) => {
                    this.document = response.data;
                 
                            
                    

                })
            }
        },
       created() {
            this.getDocument();
        }
    }

</script>

<style scoped lang="scss">
    #manageImagesPage{
        display: flex;
    }
    #currentImageContainer{
        border:dashed 1px blue;
flex-grow: 2
    }
    #imageListContainer{
         border:dashed 1px rgb(255, 38, 0);
    }

</style>
*/
