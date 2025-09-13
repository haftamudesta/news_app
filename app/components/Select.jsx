import { MdErrorOutline } from "react-icons/md";

const Select = ({
  labelAttr,
  typeattr,
  nameAttr,
  classAttr,
  placeholderAttr,
  requiredattr,
  errorattr,
  optionsAttr,
  ...props}) => {
  return (
    <label className="form-control">
      {labelAttr && (
        <div className="!px-0 label">
          <span className="label-text"><MdErrorOutline className="inline mr-2" />{labelAttr}</span>
        </div>
      )}
      <div className="relative">
        <select
        name={nameAttr}
        required={requiredattr} 
        {...props}
        className={`h-full block w-full bg-slate-700 outline-none rounded-md ${errorattr?'border border-red-500':''}`}
         >
                {placeholderAttr  && <option value={''}>{placeholderAttr}</option>}
                {optionsAttr && optionsAttr.map((item,index)=>(
                        <option value={item} key={index}>{item}</option>
                ))}
        </select>
      </div>
      { errorattr && (
        <div className="label !px-0">
          <span className="label-text text-red-500">{errorattr}</span>
        </div>
      )}
    </label>
  )
}

export default Select
