"use client"

import TextArea from "@/components/TextArea";
import { useRef, useState } from "react"
import Input from "@/components/Input";
import FileInput from "@/components/FileInput";
import SubmitButton from "@/components/SubmitButton";
import { createCategoryAction } from "../../../../../actions/categoryActions";
import TipTap from "@/components/TipTap";

const CreateCategory = () => {
  const formRef=useRef(null);
  const successRef=useRef(null);
  const failedRef=useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="grid place-items-center  ">
      <form ref={formRef} action={async(formData)=>{
        successRef.current.textContent="";
        failedRef.current.textContent="";
        const data=await createCategoryAction(formData)
        console.log("form data",data)
        if(data.success){
          formRef.current?.reset();
          setSelectedFile(null);
          successRef.current.textContent="Category Created successfully!"
        }else{
          failedRef.current.textContent=data?.error;
        }
      }} 
      className="w-[90%] sm:w-[580px] shadow-xl p-8 rounded-md flex flex-col gap-4 mt-4 bg-base-100">
        <h2 className="text-white font-bold text-2xl mb-4 text-center underline">
          Create category
        </h2>
        <Input 
          typeAttr={"text"}
          nameAttr={"name"}
          placeholderAttr={"category Name"}
          requiredattr={true} 
          classAttr={"w-full"}
          />
          <TextArea 
          nameAttr={"description"}
          placeholderAttr={"Description"}
          requiredattr={true} 
          classAttr={"w-full focus:border-amber-300 resize-none"}
          />
          <FileInput 
          name={"thumbnailImage"}
          required={true}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
  />
        {/* <TipTap content={content} onChange={(newContent)=>setContent(newContent)} /> */}
        <div className="mt-4 self-center w-[40px]">
          <SubmitButton className="p-4"/>
        </div>
        <p ref={successRef} className="text-green-400 text-lg text-center font-bold"></p>
        <p ref={failedRef} className="text-red-400 text-lg text-center font-bold"></p>
      </form>
    </div>
  )
}

export default CreateCategory
