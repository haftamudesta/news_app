const ConfirmDeletion = ({ModelType,deleteAction}) => {

  return (
    <div className="h-screen w-full flex items-center justify-center">
        <div className="w-full bg-base-100 h-56 -mt-20 mx-6 rounded-lg flex flex-col items-center justify-eveny">
                <h2 className="font-bold my-4 text-red-400">
                        Are you Sure you want to delete this {ModelType}
                </h2>
                <button onClick={()=>{
                        setLoading(true)
                        deleteAction()
                        router.replace('/admin-controls')
                }}
                className="border-2 px-4 py-2 font-bold rounded-md border-red-900 hover:bg-red-900"
                >
                        yes
                </button>
                {loading && (<h1>Loading...</h1>)}
        </div> 
    </div>
  )
}

export default ConfirmDeletion
