import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/static/logo.svg'

export default function Navbar() {
    const { isConnected } = useAccount(); // Use the useAccount hook

    return (
        <div className="navbar">
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost font-heading text-xl">
            <div className='mr-[-10]'>
                 <Image height={45} width={45} src={logo} alt="Chipz" />
            </div>
                Chipz
            </Link>
        </div>
        <div className="flex align-center justify-center">
            <a className="btn font-overpass btn-ghost">ZK Games</a>
            <a className="btn font-overpass btn-ghost">Sports</a>
            <a className="btn font-overpass btn-ghost">Slots</a>
        </div>
        <div className="flex-none ml-5">
            { isConnected && <Link href='/dashboard'><button className="btn mx-10">Dashboard</button></Link>}
            <ConnectButton label="Sign In" />
        </div>
        </div> 
    );
  }
  