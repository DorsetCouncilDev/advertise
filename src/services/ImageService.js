import axios from 'axios'

export default{

    async getImage(image){

      axios.get(image.sources[0].url).then((response)=>{

        return response.data;

      })

    }

}
