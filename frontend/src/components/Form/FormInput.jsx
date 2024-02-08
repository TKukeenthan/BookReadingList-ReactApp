
import React from 'react';

const FormInput = ({ label, type, value, onChange, placeholder, required }) => {
  return (
    <div className='my-4'>
      <label className='text-xl text-gray-700'>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className='border border-gray-400 rounded-lg px-4 py-2 w-full mt-2'
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormInput;
