import Image from "next/image"
import Link from "next/link"

export default function IndexHero(): any {
    return (
        <div className="hero mt-[-4rem] min-h-screen">
  <div className="hero-content gap-[3rem] justify-between">
    <div className="min-w-[40%]">
      <h1 className="text-6xl font-bold">Become a bookmaker in one click.</h1>
      <p className="pt-6 pb-2 text-xl">Easily create bet pools, elevate your game.</p>
      <p className="mb-20 text-xl">One click to ownership. Your odds, your rules.</p>
      <Link href='/dashboard'>
        <button className="btn btn-wide btn-lg btn-primary">
            Get Started
        </button>
      </Link>
    </div>
    <Image width={2500} height={2500} alt="a" src="/static/soccer.webp" className="max-w-md rounded-lg shadow-blue shadow-xl" />
  </div>
</div>
    )
}