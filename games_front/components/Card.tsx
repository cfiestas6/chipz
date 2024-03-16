import Image from 'next/image';
import Link from 'next/link';

export default function Card({ image, href, title }: any) {
    return (
        <div className="card card-compact w-96 bg-base-100 border-2 shadow-lg hover:shadow-blue">
          <Link href={href}>
         <figure>
          <Image className='rounded-t-2xl' src={image} alt={title} width={500} height={500} />
         </figure>
        </Link>
         <div className="card-body">
            <h2 className="font-overpass card-title">{title}</h2>
        </div>
        </div>
    )
}