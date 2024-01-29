import { navLinks } from '@/lib/nav/routes'
import Image from 'next/image'
import Link from 'next/link'
import { Icons } from '../_common/Icons'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface UserAccountNavProps {
    email: string
    name: string
    imageUrl: string
}

const UserAccountNav = ({ email, imageUrl, name }: UserAccountNavProps) => {
    console.log('UserAccountNav', email, imageUrl, name)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='overflow-visible'>
                <Button className='aspect-square h-8 w-8 rounded-full bg-slate-400'>
                    <Avatar className='relative h-8 w-8'>
                        {imageUrl ? (
                            <div className='relative aspect-square h-full w-full'>
                                <Image
                                    fill
                                    src={imageUrl}
                                    alt='profile picture'
                                    referrerPolicy='no-referrer'
                                />
                            </div>
                        ) : (
                            <AvatarFallback>
                                <span className='sr-only'>{name}</span>
                                <Icons.user className='h-4 w-4 text-zinc-900' />
                            </AvatarFallback>
                        )}
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
                <div className='flex items-center justify-start gap-2 p-2'>
                    <div className='flex flex-col space-y-0.5 leading-none'>
                        {name && <p className='text-sm font-medium'>{name}</p>}
                        {email && (
                            <p className='w-[200px] truncate text-xs'>
                                {email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />
                {navLinks.map((navSection) => (
                    <>
                        {navSection.links.map((navLink, index) => {
                            return (
                                <DropdownMenuItem
                                    key={`nav-${navSection.section}-${index}`}
                                    asChild
                                    className='cursor-pointer'
                                >
                                    <Link href={navLink.path}>
                                        {navLink.label}
                                    </Link>
                                </DropdownMenuItem>
                            )
                        })}
                        <DropdownMenuSeparator />
                    </>
                ))}

                <DropdownMenuItem className='cursor-pointer'>
                    <Link href='/sign-out'>Log out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav
