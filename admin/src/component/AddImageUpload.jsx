import React from 'react'
import UploadImg from '../assets/UploadImg.png'

function AddImageUpload({ images, setImages }) {
  const nums = [1, 2, 3, 4]

  return (
    <div className='w-full'>
      <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5'>
        Upload Product Images
      </label>
      <div className='flex flex-wrap gap-3.5'>
        {nums.map((num) => {
          const key = `image${num}`
          const image = images[key]
          return (
            <label
              key={num}
              htmlFor={`image${num}`}
              className='cursor-pointer group relative hover:scale-102 transition-transform'
            >
              <img
                className='w-22 h-22 object-cover rounded-xl border-2 border-dashed border-slate-200 group-hover:border-[#0c7c86] bg-slate-50 p-1 transition-colors'
                src={!image ? UploadImg : URL.createObjectURL(image)}
                alt={`upload-${num}`}
              />
              <input
                onChange={(e) => setImages(prev => ({ ...prev, [key]: e.target.files[0] }))}
                type='file'
                id={`image${num}`}
                hidden
              />
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default AddImageUpload
