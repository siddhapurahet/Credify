import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'
import RightSidebar from '@/components/RightSidebar';

const Home = () => {
  
  const loggedIn = { firstName: "Het", lastName: "Siddhapura", email: "accper123@gmail.com"};

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
          type = "greeting"
          title = "Welcome"
          user = {loggedIn?.firstName || 'Guest'}
          subtext = "Manage your account and transactions"
          />

          <TotalBalanceBox 
          accounts = {[]}
          totalBanks = {1}
          totalCurrentBalance = {1234.65}
          />
        </header>
        recent tran.
      </div>
      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 5647.90}, {currentBalance: 897.50}]}
      />
    </section>
  )
}

export default Home