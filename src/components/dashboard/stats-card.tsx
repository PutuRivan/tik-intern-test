import React from 'react'
import { Card, CardContent } from '@mui/material'
import { ComputerRounded } from '@mui/icons-material'

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          {/* TEXT */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {title}
            </p>

            <h2 className="text-3xl font-bold">
              {value}
            </h2>
          </div>
          {/* ICON BOX */}
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 52,
              height: 52,
              backgroundColor: `${color}20`,
              color: `${color}`,
            }}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
