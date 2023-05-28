import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="flex gap-5 justify-center">{children}</main>
      <Footer />
    </>
  );
}
