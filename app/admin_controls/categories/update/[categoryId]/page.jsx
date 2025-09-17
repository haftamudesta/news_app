"use client"

import { useParams, useRouter } from "next/navigation";
import TextArea from "@/components/TextArea";
import { useRef, useState,useEffect } from "react"
import Input from "@/components/Input";
import FileInput from "@/components/FileInput";
import SubmitButton from "@/components/SubmitButton";
import { updateCategoryAction,fetchCategoryAction } from "../../../../../../actions/categoryActions";

const UpdateCategory = () => {
  const formRef=useRef(null);
  const successRef=useRef(null);
  const failedRef=useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryData,setCategoryData]=useState({})
  const params=useParams();
  const router = useRouter();

  useEffect(()=>{
        const fetchData=async ()=>{
                try {
                       const fetchCategoryData=await fetchCategoryAction(params?.categoryId);
                       setCategoryData(fetchCategoryData);
                } catch (error) {
                       failedRef.current.textContent="Error Fetching Data" 
                }
        }
        if(params?.categoryId){
            fetchData()    
        }
  },[params?.categoryId])
  return (
    <div className="grid place-items-center  ">
      <form ref={formRef} action={async(formDta)=>{
        successRef.current.textContent="";
        failedRef.current.textContent="";
        formDta.append("categoryId",params.categoryId)
        const data=await updateCategoryAction(formDta)
        console.log("form data",data)
        if(data.success){
          formRef.current?.reset();
          setSelectedFile(null);
          successRef.current.textContent="Category updated  Successfully!"
          router.replace('/admin-controls')
        }else{
          failedRef.current.textContent=data?.error;
        }
      }} 
      className="w-[90%] sm:w-[580px] shadow-xl p-8 rounded-md flex flex-col gap-4 mt-4 bg-base-100">
        <h2 className="text-white font-bold text-2xl mb-4 text-center underline">
          update category
        </h2>
        <Input 
          typeAttr={"text"}
          nameAttr={"name"}
          placeholderAttr={"category Name"}
          requiredattr={true} 
          classAttr={"w-full"}
          value={categoryData?.name}
          onChange={(e)=>{
                setCategoryData({
                        ...categoryData,
                        name:e.target.value,
                })
          }}
          />
          <TextArea 
          nameAttr={"description"}
          placeholderAttr={"Description"}
          requiredattr={true} 
          classAttr={"w-full focus:border-amber-300 resize-none"}
          value={categoryData?.description}
          onChange={(e)=>{
                setCategoryData({
                        ...categoryData,
                        description:e.target.value,
                })
          }}
          />
          <FileInput 
          name={"thumbnailImage"}
          required={true}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
  />
        <div className="mt-4 self-center w-[40px]">
          <SubmitButton className="p-4"/>
        </div>
        <p ref={successRef} className="text-green-400 text-lg text-center font-bold"></p>
        <p ref={failedRef} className="text-red-400 text-lg text-center font-bold"></p>
      </form>
    </div>
  )
}

export default UpdateCategory
