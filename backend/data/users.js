import bcrypt from 'bcryptjs';

const users = [
    {
         name : 'Admin User',
         password : bcrypt.hashSync('adminPassword',12),
         email : 'admin@fake.com',
         isAdmin : true
    },
    {
        name : 'Karan',
        password : bcrypt.hashSync('karanPassword' , 12),
        email : 'Karan@fake.com',
   },
   {
    name : 'Manu',
    password : bcrypt.hashSync('manuPassword' , 12),
    email : 'manu@fake.com',
    }
]

export default users;