export default {
  name: 'admin',
  title: 'Admin Account',
  type: 'document',
  fields: [
    {
      name: 'username', 
      title: 'Username / Email', // Nama label di layar
      type: 'string',
    },
    {
      name: 'password', 
      title: 'Password', // Nama label di layar
      type: 'string',
    },
  ],
};