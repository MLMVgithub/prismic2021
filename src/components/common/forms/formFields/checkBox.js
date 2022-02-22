import React from 'react'

const CheckBox = ({ id, label, meta, onClick }) => {
  const { dirty, error, touched, invalid } = meta
  const hasError = invalid && !!touched
  const hasValue = !!dirty && !invalid
  const required = invalid

  // return (
  //   <>
  //     <label key={id} htmlFor={id} className={`label ${hasValue ? 'touched' : ''}`}>
  //       {label}
  //       {required && !hasValue && <span className="required">Required</span>}
  //       {hasError && <span className="error">{error}</span>}

  //       <input type="checkbox" id={id} name={label} value="True" onClick={onClick} />
  //     </label>
  //   </>
  // )

  // Removed 'for' in the label and 'id' in the input as reccomended here...
  // answers.netlify.com/t/checkboxes-and-radio-buttons-in-forms/1486
  // Reason, so Netlify will post the 'legend' text as a label in the submission email

  return (
    <>
      <label key={id} className={`label ${hasValue ? 'touched' : ''}`}>
        {label}
        {required && !hasValue && <span className="required">Required</span>}
        {hasError && <span className="error">{error}</span>}

        <input type="checkbox" name={label} value="True" onClick={onClick} />
      </label>
    </>
  )
}

export default CheckBox
