import { MdErrorOutline } from "react-icons/md";

const Input = ({
  labelAttr,
  typeAttr,
  nameAttr,
  classAttr,
  placeholderAttr,
  requiredattr,
  errorattr,
  ...props}) => {
  return (
    <label className="form-control">
      {labelAttr && (
        <div className="!px-0 label">
          <span className="label-text"><MdErrorOutline className="inline mr-2" />{labelAttr}</span>
        </div>
      )}
      <div className="relative">
        <input
        type={typeAttr}
        name={nameAttr}
        placeholder={placeholderAttr}
        required={requiredattr} 
        {...props}
        className="w-full focus:border-amber-300"
         />
      </div>
      { errorattr && (
        <div className="label !px-0">
          <span className="label-text text-red-500">{errorattr}</span>
        </div>
      )}
    </label>
  )
}

export default Input
