import React from 'react'
import {Card, CardContent} from '@mui/material'
import {ComputerRounded} from'@mui/icons-material'

export default function StatsCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
            {/* TEXT */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Informatika
              </p>

              <h2 className="text-3xl font-bold">
                25
              </h2>
            </div>
            {/* ICON BOX */}
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 52,
                height: 52,
                backgroundColor: `#1976d220`,
                color: `#1976d2`,
              }}
            >
              <ComputerRounded/>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
