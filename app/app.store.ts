import * as Immutable from "immutable"
import {routerReducer} from "@ngrx/router-store"
import {homeInitialState, homeReducer} from "./modules/home/home.store"
import {discoverInitialState, discoverReducer} from "./modules/discover/discover.store"
import {currentProjectInitialState, currentProjectReducer} from "./modules/projects/projects.store"
import {commonInitialState, commonReducer} from "./ts/modules/common/common.store"

export type IState = Immutable.Map<string, any>;

const globalInitialState = {
    user: {},
    projects: [],
};

const initialState = Immutable.fromJS({
    global: globalInitialState,
    home: homeInitialState,
    discover: discoverInitialState,
    common: commonInitialState,
    "current-project": currentProjectInitialState,
})

export const globalReducer = (state, action) => {
    switch(action.type){
        case 'SET_PROJECTS':
            return state.set('projects', action.payload);
        default:
            return state;
    }
};

export const rootReducer = (state=initialState, action) => {
    return state.set('global', globalReducer(state.get('global'), action))
                .set('router', routerReducer(state.get('router'), action))
                .set('home', homeReducer(state.get('home'), action))
                .set('current-project', currentProjectReducer(state.get('current-project'), action))
                .set('discover', discoverReducer(state.get('discover'), action))
                .set('common', commonReducer(state.get('common'), action));
};