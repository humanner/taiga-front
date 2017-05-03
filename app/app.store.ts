import {routerReducer} from "@ngrx/router-store";
import * as Immutable from "immutable";
import {authInitialState, authReducer} from "./modules/auth/auth.store";
import {discoverInitialState, discoverReducer} from "./modules/discover/discover.store";
import {homeInitialState, homeReducer} from "./modules/home/home.store";
import {kanbanInitialState, kanbanReducer} from "./modules/kanban/kanban.store";
import {projectsInitialState, projectsReducer} from "./modules/projects/projects.store";
import {commonInitialState, commonReducer} from "./ts/modules/common/common.store";
import {wikiInitialState, wikiReducer} from "./modules/wiki/wiki.store";

export type IState = Immutable.Map<string, any>;

const globalInitialState = {
    "open-lightbox": "",
    "loading": false,
};

const initialState = Immutable.fromJS({
    global: globalInitialState,
    home: homeInitialState,
    kanban: kanbanInitialState,
    discover: discoverInitialState,
    common: commonInitialState,
    auth: authInitialState,
    wiki: wikiInitialState,
    projects: projectsInitialState,
    router: {
        path: window.location.pathname + window.location.search
    }
});

export const globalReducer = (state, action) => {
    switch (action.type){
        case "START_LOADING":
            return state.set("loading", true);
        case "STOP_LOADING":
            return state.set("loading", false);
        case "CLOSE_LIGHTBOX":
            return state.set("open-lightbox", "");
        case "OPEN_LIGHTBOX":
            return state.set("open-lightbox", action.payload);
        default:
            return state;
    }
};

export const rootReducer = (state= initialState, action) => {
    return state.set("router", routerReducer(state.get("router"), action))
                .set("home", homeReducer(state.get("home"), action))
                .set("global", globalReducer(state.get("global"), action))
                .set("kanban", kanbanReducer(state.get("kanban"), action))
                .set("projects", projectsReducer(state.get("projects"), action))
                .set("discover", discoverReducer(state.get("discover"), action))
                .set("auth", authReducer(state.get("auth"), action))
                .set("wiki", wikiReducer(state.get("wiki"), action))
                .set("common", commonReducer(state.get("common"), action));
};