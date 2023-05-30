
import React from 'react'

import user from './userStore'
import { configurePersistable } from 'mobx-persist-store';

// All properties are optional
configurePersistable(
    {
        storage: window.localStorage,
        expireIn: 86400000,
        removeOnExpiration: true,
        stringify: false,
        debugMode: true,
    },
    { delay: 200, fireImmediately: false }
);

class RootStore {
    constructor() {

        this.userStore = user
    }
}

const rootStore = new RootStore()


const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)


export { useStore }