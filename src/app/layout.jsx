import "./globals.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SessionWrapper from "../../components/sessionWrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ShantnuDON",
  description: "Its me ShantnuDON",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body
          style={{ backgroundImage: `url(/bg.png)` }}
          className="text-white"
        >
          <div>
            <Toaster />
          </div>
          <Navbar />
          {children}
          <Footer />
        </body>
      </SessionWrapper>
    </html>
  );
}
