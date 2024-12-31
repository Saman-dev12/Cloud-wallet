import { atom } from 'recoil';

// Define the user state atom
export const auth = atom<boolean>({
    key: 'auth',
    default: Boolean(localStorage.getItem('token')),
});


export const user = atom({
    key: 'userAtom',
    default: {
        email: '',
        publicKey: '',
    },
});