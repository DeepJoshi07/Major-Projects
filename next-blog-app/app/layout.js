import { Outfit} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight:["400","500","600","700"]
});

export const metadata = {
  title: "Blog App",
  description: "This is the blog app created by Deep Joshi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={outfit.className}
      >
        {children}
      </body>
    </html>
  );
}
