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
                 <Image height={45} width={45} src={logo} alt="Chipz" />
            </Link>
            <h1 className='text-2xl'>Chipz</h1>
        </div>
        <div className="flex align-center justify-center">
            <Link href='/' className="btn font-overpass btn-ghost">ZK Games</Link>
            <Link href='/'  className="btn font-overpass btn-ghost">Sports</Link>
            <Link href='/'  className="btn font-overpass btn-ghost">Slots</Link>
        </div>
        <div className="flex-none ml-5">
            { isConnected && <Link href='/dashboard'>Dashboard</Link>}
            <ConnectButton label="Sign In" />
        </div>
        </div> 
    );
  }
  