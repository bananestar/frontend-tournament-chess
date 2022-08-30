import { atom, selector } from 'recoil';

// !!! L'API est actuellement en cours de développement et changera 🤪 !!! 
const localStorageEffect = (key) => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
        if (newValue === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    });
};

// Création d'un ATOM pour acceder a des données depuis plusieurs composants 
export const jwtAtom = atom({
    key: 'jwtAtom',
    default: null,
    effects_UNSTABLE: [localStorageEffect('jwt')],
});

// Permet d'obtenir la donnée de l'ATOM transformé
export const bearerSelector = selector({
    key: 'bearerSelector',
    get: ({ get }) => {
        const token = get(jwtAtom);
        if (token) {
            return `bearer ${token}`;
        }
        return null;
    },
});


// isAdmin
export const adminAtom = atom({
    key: 'adminAtom',
    default: false,
});

// Id
export const userIdAtom = atom({
    key:'userIdAtom',
    default: null,
})