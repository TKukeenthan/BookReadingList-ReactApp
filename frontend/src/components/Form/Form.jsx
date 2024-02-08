import React from 'react';
import FormInput from './FormInput';

const Form = ({ formData, setFormData, onSubmit, loading }) => {
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  return (
    <div className='flex flex-col border border-gray-300 rounded-lg p-6 w-[600px] mx-auto'>
      <FormInput
        label='Title'
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder='Enter the title of the book'
        required
      />
      <FormInput
        label='Author'
        value={formData.author}
        onChange={(e) => handleChange('author', e.target.value)}
        placeholder='Enter the author of the book'
        required
      />
      <FormInput
        label='Publish Year'
        value={formData.publishYear}
        onChange={(e) => handleChange('publishYear', e.target.value)}
        placeholder='Enter the publish year of the book'
      />
      <FormInput
        label='Genre'
        value={formData.genre}
        onChange={(e) => handleChange('genre', e.target.value)}
        placeholder='Enter the genre of the book'
      />
      <FormInput
        label='ISBN'
        value={formData.isbn}
        onChange={(e) => handleChange('isbn', e.target.value)}
        placeholder='Enter the ISBN of the book'
      />
      <FormInput
        label='Note'
        value={formData.note}
        onChange={(e) => handleChange('note', e.target.value)}
        placeholder='Add any notes about the book'
      />
      <FormInput
        label='Image URL'
        value={formData.image}
        onChange={(e) => handleChange('image', e.target.value)}
        placeholder='Paste the book cover image URL (network URL)'
      />
      <div className='my-4'>
        <label className='text-xl text-gray-700'>Status</label>
        <select
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className='border border-gray-400 rounded-lg px-4 py-2 w-full mt-2'
        >
          <option value='Start'>Start</option>
          <option value='Reading..'>Reading..</option>
          <option value='Complete'>Complete</option>
        </select>
      </div>
      <FormInput
        label='Complete Date'
        type='date'
        value={formData.completeDate}
        onChange={(e) => handleChange('completeDate', e.target.value)}
        placeholder='Select the completion date'
      />
      <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4' onClick={onSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default Form;
