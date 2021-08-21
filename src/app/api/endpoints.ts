const Auth = {
    login: '/auth/login',
    signup: '/auth/signup',
    users: '/auth/users',
    members: '/auth/members',
    updateMember: '/auth/updateMember',
    deleteUser: '/auth/deleteUser',
    membersstats: '/auth/membersstats',
};

const Payments = {
    all: '/dues/all',
    some: '/payments',
    add: '/dues/add',
    delete: '/dues/delete',
    paymentsstats: '/dues/paymentsstats',
};

const User = {
    find: '/user',
    uploadProfilePhoto: '/user/upload-photo',
};

export { Auth, Payments, User };
