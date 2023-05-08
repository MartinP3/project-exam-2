import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }) {
  return (
    <>
      <Header />
        <main className='flex justify-center gap-5'>
          {children}
        </main>
      <Footer />
    </>
  )
}