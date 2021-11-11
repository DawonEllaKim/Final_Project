import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const ADD_MARKER = "ADD_MARKER";
const EDIT_MARKER ="EDIT_MARKER"
const ADD_ROAD = "ADD_ROAD";
const ADD_DISTANCE ="ADD_DISTANCE";
//액션함수
const addMarker = createAction(ADD_MARKER, (marker) => ({ marker }));
const addRoad = createAction(ADD_ROAD, (road)=>({road}))
const addDistance = createAction(ADD_DISTANCE,(distance)=>({distance}))
const editMarker = createAction(ADD_DISTANCE,(list)=>({list}))
//새로운 marker 정보를 redux store에 저장

const initialState = {
  marker: [],
  distance: [],
  list : [],
};
const addMarkerAX = (marker) => {
  return function (dispatch, getState, { history }) {
    // 로그인을 했을 때만 마커를 생성할 수 있기 때문에 token 값을 서버에 넘겨줍니다.
    //  const _token= sessionStorage.getItem("JWT")
    //  let token = { headers : { authorization: `Bearer ${_token}`} }
    // 생성된 마커 정보를 서버에 보냅니다.
    axios({
      method: "POST",
      url: "http://localhost:4000/users",
      data: marker,
    }).then(() => {
      // 서버에서 마커 오브젝트 id와 boardcount를 보냅니다.

      // 액션 함수에 마커 정보를 담아서 보냅니다.
      dispatch(addMarker(marker));
      history.push("/map2");
    });
  };
};
const addRoadAX = (marker,distance) => {
  return function (dispatch, getState, { history }) {
    // 로그인을 했을 때만 마커를 생성할 수 있기 때문에 token 값을 서버에 넘겨줍니다.
    //  const _token= sessionStorage.getItem("JWT")
    //  let token = { headers : { authorization: `Bearer ${_token}`} }
    // 생성된 마커 정보를 서버에 보냅니다.
    axios({
      method: "POST",
      url: "http://localhost:4000/road",
      data: 
       marker
      ,
    }).then(() => {
      // 서버에서 마커 오브젝트 id와 boardcount를 보냅니다.

      // 액션 함수에 마커 정보를 담아서 보냅니다.
      dispatch(addRoad(marker,distance))
      window.alert("마커수정")
    });
  };
};
const getRoadAX = () => {
  return function (dispatch, getState, { history }) {
    // 로그인을 했을 때만 마커를 생성할 수 있기 때문에 token 값을 서버에 넘겨줍니다.
    //  const _token= sessionStorage.getItem("JWT")
    //  let token = { headers : { authorization: `Bearer ${_token}`} }
    // 생성된 마커 정보를 서버에 보냅니다.
    axios({
      method: "GET",
      url: "http://localhost:4000/road",
      
    }).then((res) => {
      // 서버에서 마커 오브젝트 id와 boardcount를 보냅니다.

      // 액션 함수에 마커 정보를 담아서 보냅니다.
      dispatch(addDistance(res.data))
  
    });
  };
};

const editMarkerAX = (marker, editId) => {
  return function (dispatch, getState, { history }) {
    // 로그인을 했을 때만 마커를 생성할 수 있기 때문에 token 값을 서버에 넘겨줍니다.
    //  const _token= sessionStorage.getItem("JWT")
    //  let token = { headers : { authorization: `Bearer ${_token}`} }
    // 생성된 마커 정보를 서버에 보냅니다.
    axios({
      method: "POST",
      url: "http://localhost:4000/users",
      data: marker,
    }).then(() => {
      // 서버에서 마커 오브젝트 id와 boardcount를 보냅니다.

      // 액션 함수에 마커 정보를 담아서 보냅니다.
      dispatch(addMarker(marker));
      history.push(`/mapEdit/${editId}`);
    });
  };
};

export default handleActions(
  {
    [ADD_MARKER]: (state, action) =>
      produce(state, (draft) => {
        draft.marker = action.payload.marker;

      }),
      [EDIT_MARKER]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;

      }),
    [ADD_ROAD]: (state, action) =>
      produce(state, (draft) => {
        draft.road = action.payload.road;
     }),
     [ADD_DISTANCE]: (state, action) =>
     produce(state, (draft) => {
       draft.distance = action.payload.distance;
    }),
  },
  initialState
);

export const actionCreators = {
  addRoad,
  addRoadAX,
  addMarker,
  addMarkerAX,
  editMarkerAX,
  getRoadAX,
  editMarker,
};
