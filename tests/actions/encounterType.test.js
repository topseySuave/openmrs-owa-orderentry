import {
    fetchEncounterTypeSuccess,
    fetchEncounterTypeFailure,
    fetchEncounterType,
} from '../../app/js/actions/encounterType';
import {
    FETCH_ENCOUNTER_TYPE_LOADING,
    FETCH_ENCOUNTER_TYPE_SUCCESS,
    SETTING_ENCOUNTER_TYPE_FAILURE,
    FETCH_ENCOUNTER_TYPE_FAILURE,
} from '../../app/js/actions/actionTypes';

const { encounterTypeValid, encounterTypeInvalid } = mockData

describe('encounterType get action creators', () => {
    it('should create FETCH_ENCOUNTER_TYPE_SUCEESS action', () => {
        const store = mockStore({});
        const expectedAction = [FETCH_ENCOUNTER_TYPE_SUCCESS]
        store.dispatch(fetchEncounterTypeSuccess())
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedAction);
    });
    it('should create FETCH_ENCOUNTER_TYPE_FAILURE action', () => {
        const store = mockStore({});
        const expectedAction = [FETCH_ENCOUNTER_TYPE_FAILURE]
        store.dispatch(fetchEncounterTypeFailure())
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedAction);
    });
});
describe('encounterType get thunk', () => {
    const value = "order entry";
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    it('should dispatch FETCH_ENCOUNTER_TYPE_SUCEESS on success', async (done) => {
        const store = mockStore({});
        moxios.stubRequest(`${apiBaseUrl}/encountertype?q=${value}`, {
            status: 200,
            response: encounterTypeValid
        });
        const expectedActions = [
            FETCH_ENCOUNTER_TYPE_LOADING,
            FETCH_ENCOUNTER_TYPE_SUCCESS,
            FETCH_ENCOUNTER_TYPE_LOADING,
        ];

        await store.dispatch(fetchEncounterType(value))
            .then(() => {
                const actionType = store.getActions().map(action => action.type);
                expect(actionType).toEqual(expectedActions);
            });
        done();
    });

    it('should throw "incomplete config" error in FETCH_ENCOUNTER_TYPE_SUCCESS', async (done) => {
        const store = mockStore({});
        moxios.stubRequest(`${apiBaseUrl}/encountertype?q=${value}`, {
            status: 200,
            response: encounterTypeInvalid
        });
        const expectedActions = [
            FETCH_ENCOUNTER_TYPE_LOADING,
            SETTING_ENCOUNTER_TYPE_FAILURE,
            FETCH_ENCOUNTER_TYPE_LOADING,
        ];
        await store.dispatch(fetchEncounterType(value))
            .then(() => {
                const actionType = store.getActions().map(action => action.type);
                expect(actionType).toEqual(expectedActions);
            });
        done();
    });

    it('should dispatch FETCH_ENCOUNTER_TYPE_FAILURE on fail', async (done) => {
        const store = mockStore({});
        moxios.stubRequest(`${apiBaseUrl}/encountertype?q=${value}`, {
            status: 401,
            error: {
                response: "User not logged in"
            }
        });
        const expectedActions = [
            FETCH_ENCOUNTER_TYPE_LOADING,
            SETTING_ENCOUNTER_TYPE_FAILURE,
            FETCH_ENCOUNTER_TYPE_LOADING,
        ]
        await store.dispatch(fetchEncounterType(value))
            .then(() => {
                const actionType = store.getActions().map(action => action.type);
                expect(actionType).toEqual(expectedActions);
            });
        done();
    });
});
