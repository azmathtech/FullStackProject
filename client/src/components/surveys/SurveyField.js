import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  //console.log(input);
  //console.log(meta);

  return (
    <div>
      <label>
        {label}
      </label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

//----------------------------------Notes--------------------------------------
// SurveyField contains logic to render a single label and text input

// ({ input }) is equivalent to (props.input)

//{...input} provides access to all of the props rather than specifiying each one
//{...input} is equivalent to just typing out props
//like onBlur={input.onBlur} onChange={input.onChange} ect.

//nested destructuring - we already destructure the props
//now we are destructuring one of the passed in props objects
//({ input, label, meta }) becomes ({ input, label, meta: { error, touched } }

//{touched && error} both must be true to render
