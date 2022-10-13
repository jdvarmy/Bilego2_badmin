import React from 'react';
import DataGrid, { DataGridProps } from 'react-data-grid';
import { styled } from '@mui/material/styles';

type Props = DataGridProps<unknown>;

const StyledDataGrid = styled(DataGrid)(({ theme }) => {
  return `
    color: ${theme.header.textColor};
    background-color: ${theme.header.background};
    box-shadow: ${theme.header.boxShadow};
    border: none;
    
    .rdg-header-row {
      background-color: ${theme.header.background};
    }
    .rdg-header-row .rdg-cell {
      line-height: 1.6rem;
      vertical-align: inherit;
      border-bottom: 1px solid ${theme.colors.alpha.black[10]};
      text-align: left;
      padding: 16px;
      text-transform: uppercase;
      font-size: 13px;
      font-weight: bold;
      color: ${theme.colors.alpha.black[70]};
    }
    .rdg-row {
      background-color: ${theme.header.background};
    }
    .rdg-cell {
      font-weight: 400;
      line-height: 1.43;
      vertical-align: inherit;
      border-bottom: 1px solid ${theme.colors.alpha.black[10]};
      text-align: left;
      padding: 16px;
      color: #CBCCD2;
      font-size: 14px;
      border-inline-end: none;
    }
    .rdg-cell .MuiBox-root {
      height: 100%;
      display: flex;
      align-items: center;
    }
    `;
});

const TableGrid = ({ columns, rows, ...props }: Props) => {
  return <StyledDataGrid rowHeight={58} columns={columns} rows={rows} {...props} />;
};

export default TableGrid;
