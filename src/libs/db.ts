import mahasiswaData from '@/data/mahasiswa.json';
import usersData from '@/data/users.json';
import { Mahasiswa } from './types/mahasiswa';
import { User } from './types/user';

export const db = {
  mahasiswa: [...(mahasiswaData as Mahasiswa[])],
  users: [...(usersData as User[])],
};