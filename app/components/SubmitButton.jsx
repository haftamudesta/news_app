import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitButton = () => {
        const {pending}=useFormStatus();
  return (
    <button className='bg-slate-700 text-white text-md cursor-pointer px-4 rounded-lg' disabled={pending}>
      {pending?'Submitting':'Submit'}
    </button>
  )
}
export default SubmitButton
