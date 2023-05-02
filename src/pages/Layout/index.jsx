export function Layout({ children }) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  )
}