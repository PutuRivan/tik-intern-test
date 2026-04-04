import React from 'react'

interface DashboardHeaderProps {
  title: string
  description: string
}

export default function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-md">{description}</p>
    </div>
  )
}
