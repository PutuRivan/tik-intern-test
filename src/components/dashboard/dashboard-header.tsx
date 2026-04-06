"use client"

import React from "react";
import Link from "next/link";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";

interface ActionButton {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface DashboardHeaderProps {
  title: string;
  description: string;
  action?: ActionButton;
}

export default function DashboardHeader({
  title,
  description,
  action
}: DashboardHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-md text-gray-500">{description}</p>
      </div>

      {/* Only renders if action is provided */}
      {action && (
        <Link href={action.href}>
          {isMobile ? (
            // Mobile — icon only with tooltip
            <Tooltip title={action.label} placement="left">
              <IconButton
                color="primary"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                {action.icon ?? <Add />}
              </IconButton>
            </Tooltip>
          ) : (
            // Tablet / Desktop — full button with text
            <Button
              variant="contained"
              startIcon={action.icon ?? <Add />}
              sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              {action.label}
            </Button>
          )}
        </Link>
      )}
    </div>
  );
}
