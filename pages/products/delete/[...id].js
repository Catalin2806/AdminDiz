import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import { useState } from "react";


export default function EditProductPage(){
const router=useRouter();
const {id}=router.query;
const [productInfo,setProductInfo]=useState();

useEffect(()=>{
    if(!id){
        return;
    }
    axios.get('/api/products?id='+id).then(response=>{
        setProductInfo(response.data);
    })
},[id])

function goBack(){
    router.push('/products')
}

async function deleteProduct() {
    await axios.delete('/api/products?id='+id);
    goBack();
  }

return(
    <Layout>
        <h1 className="text-center text-blue-900 ">Do you really want to delete "{productInfo?.title}"? </h1>
        <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>Yes</button>
        <button className='btn-default' onClick={goBack}>No</button>
        </div>
    </Layout>
)

}