/**
 * v0 by Vercel.
 * @see https://v0.dev/t/i8BMhfdMlSB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import MainChat from './MainChat'
import Sidebar from './Sidebar'

export default function Component() {
  return (
    <div className="flex h-screen w-full px-0 bg-[#4b4b4b] text-[#333] sm:px-32">
      <Sidebar />
      <MainChat />
    </div>
  )
}