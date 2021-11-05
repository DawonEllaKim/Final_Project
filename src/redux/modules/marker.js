import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const ADD_MARKER = "ADD_MARKER"; 
//액션함수 
const addMarker = createAction(ADD_MARKER, (marker) => ({marker})) 
//새로운 marker 정보를 redux store에 저장 

const initialState = {
    marker: [],
}
const addMarkerAX = (marker) => {
    return function (dispatch,getState,{history}){ 
         // 로그인을 했을 때만 마커를 생성할 수 있기 때문에 token 값을 서버에 넘겨줍니다.
        //  const _token= sessionStorage.getItem("JWT") 
        //  let token = { headers : { authorization: `Bearer ${_token}`} } 
         // 생성된 마커 정보를 서버에 보냅니다. 
      axios({
      method: "POST",
      url: "http://localhost:4000/users",
      data:{
        markername: marker.placename,
        latitude: marker.latitude.toString(), 
        longitude: marker.longitude.toString(),
        locationCategory: marker.locationCategory,
        }
    })
    .then(() =>
    { // 서버에서 마커 오브젝트 id와 boardcount를 보냅니다. 
         
         
             // 액션 함수에 마커 정보를 담아서 보냅니다.
              dispatch(addMarker(marker)) ;
              history.push("/map2")
            }
              )
             
        } 
        } 
        const editMarkerAX = (marker,editId) => {
            return function (dispatch,getState,{history}){ 
                 // 로그인을 했을 때만 마커를 생성할 수 있기 때문에 token 값을 서버에 넘겨줍니다.
                //  const _token= sessionStorage.getItem("JWT") 
                //  let token = { headers : { authorization: `Bearer ${_token}`} } 
                 // 생성된 마커 정보를 서버에 보냅니다. 
              axios({
              method: "POST",
              url: "http://localhost:4000/users",
              data:{
                markername: marker.placename,
                latitude: marker.latitude.toString(), 
                longitude: marker.longitude.toString(),
                locationCategory: marker.locationCategory,
                }
            })
            .then(() =>
            { // 서버에서 마커 오브젝트 id와 boardcount를 보냅니다. 
                 
                 
                     // 액션 함수에 마커 정보를 담아서 보냅니다.
                      dispatch(addMarker(marker)) ;
                      history.push(`/mapEdit/${editId}`)
                    }
                      )
                     
                } 
                } 

             
    export default handleActions(
        {
            [ADD_MARKER]: (state, action) => 
            produce(state, (draft) => { 
            draft.marker = action.payload.marker

            }),
            },
                initialState
            );
        
    export const actionCreators= {
          addMarker, addMarkerAX,editMarkerAX
      }
    