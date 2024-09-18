import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-5'>
            <Link to='/'>
            <h1 className='font-bold'><span className='text-red-500'>R-Auth</span></h1>
            </Link>
            <ul className='flex gap-4'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/signin'>SignIn</Link></li>
                <li><Link to='/signup'>SignUp</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Header