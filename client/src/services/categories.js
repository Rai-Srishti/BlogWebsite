import axios from "axios"

export async function getCategories(token) {
    const url = `http://localhost:4000/category/show`
    try{
        const response = await axios.get(url,{
            headers:{
                token
            }
        })
        
        return response.data
    }catch(e){
        console.log(e);
        
    }
}

export async function addCategory(title, description, token) {
    const url = `http://localhost:4000/category/add`
    const body = {
        title,
        description
    }
    try{
        const response = await axios.post(url, body, {
            headers: {
                token
            }
        })
        return response.data
    }
    catch(e){
        console.log(response.error);
        
    }
    
    
}