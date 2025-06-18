"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'
// import Header from './_components/Header'
// import SideNav from './_components/SideNav'

function Dashboard() {
  const [userSearchInput,setUserSearchInput]=useState<string>()
  return (
    <div>
      
      {/* Search section  */}
      <SearchSection  onSearchInput={(value:string)=>setUserSearchInput(value)}/>

      {/* template list section  */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  )
}

export default Dashboard
