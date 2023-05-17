import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header>
      <nav className='flex justify-center gap-16 md:gap-96 my-5'>
        <ul>
          <li>
            <Link to="/">HOLIDAZE</Link>
          </li>
        </ul>
        <ul className='flex gap-5'>
          <li className='hover:underline hover:underline-offset-2'>
            <Link to="/login">Login</Link>
          </li>
          <li className='hover:underline hover:underline-offset-2'>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}