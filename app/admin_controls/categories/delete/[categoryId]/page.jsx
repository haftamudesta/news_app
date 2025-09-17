"use client"

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Fixed import
import { useState, useEffect } from "react"; // Fixed import
import ConfirmDeletion from '@/components/ConfirmDeletion';
import { deleteCategoryAction } from "../../../../../../actions/categoryActions";

const DeleteCategory = () => {
  const params = useParams();
  const { status, data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
   useEffect(() => {
    const doRedirect = async () => {
      if (status === "loading") return; // Wait for session to load
      
      if (!session?.user || session?.user?.role !== "superAdmin") {
        router.replace('/admin-controls');
      } else {
        setLoading(false);
      }
    }
    doRedirect();
  }, [session, router, status]); 

  if (loading || status === "loading") {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full bg-base-100 h-56 -mt-20 mx-6 rounded-lg flex flex-col items-center justify-evenly"> 
        <ConfirmDeletion 
          ModelType={'Category'} 
          deleteAction={() => deleteCategoryAction(params?.categoryId)}
        />
      </div> 
    </div>
  )
}

export default DeleteCategory;