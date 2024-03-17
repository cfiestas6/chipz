import Link from 'next/link'
import Image from 'next/image'
import logo from '../static/logo.svg'

export default function Navbar(): any {
    return (
        <div className="navbar py-10 px-20">
        <div className="flex-1">
            <Link href="/" className="font-heading text-xl">
                 <Image height={45} width={45} src={logo} alt="Chipz" />
            </Link>
            <h1 className='text-2xl'>Chipz</h1>
        </div>
        <div className="flex align-center justify-center">
            <Link href='/'  className="font-overpass px-3 ">Sports</Link>
            <Link href='/'  className="font-overpass px-3 ">My bets</Link>
        </div>
        </div> 
    )
}
declare global {
    interface Window {
        ethereum?: any;
    }
}