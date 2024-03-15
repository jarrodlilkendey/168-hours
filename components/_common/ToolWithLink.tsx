import Link from 'next/link'

interface ToolWithLinkProps {
    title: string
    description: string
    link: string
}

export default function ToolWithLink({
    title,
    description,
    link,
}: ToolWithLinkProps) {
    return (
        <div className='mt-2 mb-2 me-4 p-4 border'>
            <div>
                <h3 className='text-base font-bold'>{title}</h3>
            </div>
            <div className='mb-4'>{description}</div>
            <div>
                <Link
                    href={link}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Try It
                </Link>
            </div>
        </div>
    )
}
