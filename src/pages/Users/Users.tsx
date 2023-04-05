import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import CreateUserButton from '../../domens/users/components/CreateUserButton';
import UsersTable from '../../domens/users/components/UsersTable';

type Filters = 'Любой' | 'Активнен' | 'Не активнен';
const statusOptions = [
  { id: 'all', name: 'Любой' },
  { id: 'active', name: 'Активен' },
  { id: 'inactive', name: 'Не активен' },
];

const Users = () => {
  const [filters, setFilters] = useState<{ status: Filters | null }>({
    status: null,
  });

  const handleStatusChange = (event: SelectChangeEvent<string>): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: event.target.value as Filters,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Пользователи</title>
      </Helmet>
      <CreateUserButton />
      <ContentContainer>
        <Card>
          <CardHeader
            action={
              <Box width={150}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Статус</InputLabel>
                  <Select value={filters.status || 'all'} onChange={handleStatusChange} label='Статус' autoWidth>
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            }
            title='Данные пользователей'
          />
          <Divider />
          <UsersTable />
        </Card>
      </ContentContainer>
    </>
  );
};

export default Users;
