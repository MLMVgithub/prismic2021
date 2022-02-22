import React from 'react'

const RadioBtn = ({ id, label, input, meta, onClick }) => {
  const { name } = input
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid

  return (
    <label key={id} htmlFor={id} className={`${hasValue ? 'touched' : ''}`}>
      {label}
      <input type="radio" id={id} name={name} value={label} onClick={onClick} />
    </label>
  )

  // Removed 'for' in the label and id in  the input as reccomended here...
  // answers.netlify.com/t/checkboxes-and-radio-buttons-in-forms/1486
  // Reason, so Netlify will post the 'legend' text as a label

  // return (
  //   <label key={id} className={`${hasValue ? 'touched' : ''}`}>
  //     {label}
  //     <input type="radio" name={name} value={label} onClick={onClick} />
  //   </label>
  // )
}

export default RadioBtn
