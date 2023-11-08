import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <header>
            <h1>
                <img src="/assets/로고.png" alt="logo"/>
            </h1>
            <Link to="/hospital">
                <img src="/assets/병원 로고.png" alt="hplogo" />
            </Link>
        </header>
        <section>
            <h1>홈</h1>
        </section>
    </div>
  )
}

export default Home