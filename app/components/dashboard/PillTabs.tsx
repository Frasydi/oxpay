import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

interface Tab {
  label: string;
  value: string;
}

interface PillTabsProps {
  tabs: Tab[];
  defaultSelected?: number;
  onTabChange?: (index: number, tab: Tab) => void;
  containerSx?: object;
}

const PillTabs: React.FC<PillTabsProps> = ({ 
  tabs, 
  defaultSelected = 0, 
  onTabChange,
  containerSx = {}
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultSelected);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    if (onTabChange) {
      onTabChange(index, tabs[index]);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      ...containerSx
    }}>
      <Box sx={{
        display: 'inline-flex',
        backgroundColor: '#F2E5FB', // Electric Violet Lightest
        borderRadius: '25px',
        p: 0.25,
        gap: 0,
        position: 'relative'
      }}>
        {tabs.map((tab, index) => (
          <Box
            key={tab.value}
            onClick={() => handleTabClick(index)}
            sx={{
              px: 2.5,
              py: 0.75,
              borderRadius: '20px',
              backgroundColor: index === selectedTab ? '#7E01D7' : 'transparent', // Purple for selected, transparent for non-selected
              color: index === selectedTab ? 'white' : '#6b7280',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'center',
              minWidth: '120px',
              position: 'relative',
              zIndex: 2,
              transform: index === selectedTab ? 'scale(1.02)' : 'scale(1)',
              '&:hover': {
                backgroundColor: index === selectedTab ? '#7E01D7' : 'rgba(126, 1, 215, 0.1)',
                color: index === selectedTab ? 'white' : '#374151',
                transform: 'scale(1.02)'
              }
            }}
          >
            {tab.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PillTabs;
