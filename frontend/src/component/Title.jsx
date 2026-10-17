import React from 'react'

function Title({ text1, text2 }) {
    return (
        <div className='inline-flex items-center justify-center text-center'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900'>
                {text1}<span className='text-[#0c7c86]'>{text2}</span>
            </h2>
        </div>
    )
}

export default Title