import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { StatusLabel } from '../../../UI/StatusLabel';
import { User } from '../../../typings/types';
import { useAppDispatch } from '../../store';
import { selectUsers } from '../store/usersSelectors';
import { getUsersAsync } from '../store/usersThuk';
import DeleteUserButton from './DeleteUserButton';
import EditUserButton from './EditUserButton';

const UsersTable = () => {
  const dispatch = useAppDispatch();

  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Имя, фамилия</TableCell>
            <TableCell>Данные</TableCell>
            <TableCell>Доступ</TableCell>
            <TableCell align='right'>Статус</TableCell>
            <TableCell align='right'>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user: User) => (
            <TableRow key={user.uid} hover>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.name} {user.surname}
              </TableCell>
              <TableCell>
                {!!user.birthdate && format(new Date(user.birthdate), 'dd MMMM, yyyy', { locale: ru })}
                <br />
                {user.phone}
              </TableCell>
              <TableCell>{user.access?.map(({ ip, device }) => `ip: ${ip} - ${device}`)}</TableCell>
              <TableCell align='right'>
                {user.status === 1 ? (
                  <StatusLabel color='success'>Активен</StatusLabel>
                ) : (
                  <StatusLabel color='warning'>Не активен</StatusLabel>
                )}
              </TableCell>
              <TableCell align='right'>
                <EditUserButton uid={user.uid} />
                <DeleteUserButton uid={user.uid} email={user.email} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
