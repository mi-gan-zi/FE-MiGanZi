import React from "react"
import Footer from "./Footer"
import Header from "./Header"

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className="w-[24rem] mx-auto border">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}

export default Layout
