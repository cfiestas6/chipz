import Image from "next/image"

export default function IndexHero(): any {
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <Image width={100} height={100} alt="a" src="" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <p className="text-5xl font-bold">Create bet pools, ...</p>
      <p className="py-6">what ever</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    )
}