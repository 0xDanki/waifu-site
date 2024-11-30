'use client'

import { useState } from 'react'
import Image from "next/image"
import PageIllustration from "@/components/page-illustration"
import Avatar01 from "@/public/images/avatar-01.jpg"
import Avatar02 from "@/public/images/avatar-02.jpg"
import Avatar03 from "@/public/images/avatar-03.jpg"
import Avatar04 from "@/public/images/avatar-04.jpg"
import Avatar05 from "@/public/images/avatar-05.jpg"
import Avatar06 from "@/public/images/avatar-06.jpg"

export default function HeroHome() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
      } else {
        const data = await response.json()
        setError(data.error || 'An error occurred. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar01}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar02}
                  width={32}
                  height={32}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar03}
                  width={32}
                  height={32}
                  alt="Avatar 03"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar04}
                  width={32}
                  height={32}
                  alt="Avatar 04"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar05}
                  width={32}
                  height={32}
                  alt="Avatar 05"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar06}
                  width={32}
                  height={32}
                  alt="Avatar 06"
                />
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              The WAIFU Project<br className="max-lg:hidden" />
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                WAIFU is an open-source design system and frontend library of web3 components
                designed to create habit-forming web3 experiences.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  {isSubmitted ? (
                    <div className="space-y-4">
                      <div className="text-lg font-semibold text-green-600">
                        Thank you for subscribing to our waitlist!
                      </div>
                      <div className="flex justify-center space-x-4">
                        <a
                          href="#0"
                          className="btn bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Prototype
                        </a>
                        <a
                          href="#0"
                          className="btn bg-gray-900 text-white hover:bg-gray-800"
                        >
                          Docs
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="sm:flex">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-l-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-64"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="mt-3 w-full rounded-r-md bg-gradient-to-t from-blue-600 to-blue-500 px-6 py-2 text-white transition-all hover:bg-[length:100%_150%] sm:mt-0 sm:w-auto disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Joining...' : 'Join Waitlist'}
                      </button>
                    </form>
                  )}
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative aspect-video rounded-2xl bg-gray-900 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.slate.300/.8),transparent)1]">
              <div className="relative mb-8 flex items-center justify-between before:block before:h-[9px] before:w-[41px] before:bg-[length:16px_9px] before:[background-image:radial-gradient(circle_at_4.5px_4.5px,_theme(colors.gray.600)_4.5px,_transparent_0)] after:w-[41px]">
                <span className="text-[13px] font-medium text-white">
                  waifuproject.dev
                </span>
              </div>
              <div className="font-mono text-gray-500 [&_span]:opacity-0">
                <span className="animate-[code-1_10s_infinite] text-gray-200">
                npm i waifu@latest init
                </span>{" "}
                <br />
                <br />
                <span className="animate-[code-2_10s_infinite] text-gray-200">
                npm i waifu@latest add   
                </span>{" "}
                <span className="animate-[code-3_10s_infinite]">
                component-name
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}