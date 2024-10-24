'use client'

import React, { useState } from 'react'
import { BottomGradient, Form } from '../components/Form.component'

export default function TempFormPage() {
  const [success, setSuccess] = useState<Boolean>(false);

  return (
    <div className="max-w-2xl w-full mx-auto rounded-2xl p-8 shadow-input bg-black">
      {!success ? (
        <>
          <h2 className="font-bold text-2xl text-neutral-200 text-center">
            Temperature Form
          </h2>
          <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-6 h-[1px] w-full" />
          <Form setSuccess={setSuccess} />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-center text-2xl text-white">Your form has been submitted successfully!</h2>
          <button
                className="bg-gradient-to-br mx-auto w-[50%] relative group/btn mt-8 from-zinc-900 to-zinc-900 block bg-zinc-800 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="button"
                onClick={() => setSuccess(false)}
            >
                &larr; Send Another Response
                <BottomGradient />
            </button>
        </div>
      )}
    </div>
  )
}
