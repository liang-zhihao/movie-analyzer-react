
import { makeAutoObservable, runInAction } from 'mobx'

import APIFunction from '../services/api'
import { makePersistable, clearPersistedStore } from 'mobx-persist-store';
import refreshTokenApi from '../services/refreshToken';
// "bearerToken": {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMi5jb20iLCJleHAiOjE2ODI1MDMwNDMsImlhdCI6MTY4MjUwMjQ0M30.28saupLhY2GKsOpI9nGANCC5lgLPJfzb-8kjND4Q_5Y",
//     "token_type": "Bearer",
//     "expires_in": 600
// },
// "refreshToken": {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMi5jb20iLCJleHAiOjE2ODI1ODg4NDMsImlhdCI6MTY4MjUwMjQ0M30.of8euE0STH9XxZr8nRn5nd_rg4IckCIGKkQ2i7-FA0M",
//     "token_type": "Refresh",
//     "expires_in": 86400
// }
class UserStore {
    isLoggedIn = false
    email = ''
    bearerToken = ''
    refreshToken = ''
    bearerTokenExpiresIn = 0
    refreshTokenExpiresIn = 0
    keywords = ''
    constructor() {
        makeAutoObservable(this)
        // when you want to persist the store, need to know they will be converted to string
        makePersistable(this, { name: 'UserStore', properties: ['isLoggedIn', 'email', 'bearerToken', 'refreshToken', 'bearerTokenExpiresIn', 'refreshTokenExpiresIn'], storage: window.localStorage });

    }
    login = async ({ email, password }) => {
        return APIFunction.login({ email, password }).
            then((res) => {

                runInAction(() => {
                    this.isLoggedIn = true
                    this.email = email
                    this.bearerToken = res.bearerToken['token']
                    this.refreshToken = res.refreshToken['token']
                    this.bearerTokenExpiresIn = res.bearerToken['expires_in']
                    this.refreshTokenExpiresIn = res.refreshToken['expires_in']
                    console.log(this.refreshToken);

                })
                return res
            })
    }
    logout = async () => {

        await APIFunction.logout({ refreshToken: this.refreshToken })
            .then((res) => {
                alert('logout')
                console.log('logout');

            })
        await clearPersistedStore(this);
        this.isLoggedIn = false
        this.email = ''
        this.bearerToken = ''
        this.refreshToken = ''
        this.bearerTokenExpiresIn = 0
        this.refreshTokenExpiresIn = 0

    }

    async refresh() {
        const refreshToken = this.refreshToken;
        if (!refreshToken) {
            throw new Error('No refresh token found.');
        }
        try {
            refreshTokenApi({ refreshToken }).then((res) => {

                runInAction(() => {
                    const data = res.data
                    this.bearerToken = data['bearerToken']['token']
                    this.refreshToken = data['refreshToken']['token']
                    this.bearerTokenExpiresIn = data['bearerToken']['expires_in']
                    this.refreshTokenExpiresIn = data['refreshToken']['expires_in']
                })
            })

        } catch (error) {
            console.error('Error refreshing access token:', error);
            throw error;
        }
    }
    setKeywords(keywords) {
        this.keywords = keywords
    }
    getKeywords() {
        return this.keywords
    }


}
const userStore = new UserStore()
export default userStore
