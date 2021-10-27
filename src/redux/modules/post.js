import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// action
const GET_POST = "GET_POST";
const ADD_POST = 'ADD_POST'

// action creators
const getPost = createAction(GET_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST,(post) =>({post}));

// initialState
const initialState = {
  info: [
    // {
    //     dogId : '_id',
    //     dogName : "가을이",
    //     dogGender : "남",
    //     dogBreed: "비숑",
    //     dogImage : "ddd.jpg",
    //     dogSize : "소형견",
    //     dogAge : "0-3세",
    //     neutral : true,
    //     dogComment : "사납게 짖어요",
    //     ownerImage : "aaa.jpg",
    //     ownerName:  "이수창",
    //     ownerAge : "20대",
    //     ownerGender : "남",
        
    //     locationCategory : "서울숲",
    //     locationAddress: "서울 성동구 1동",
    //     meetingTime: "2021-10-28일 16시 30분",
    //     wishDesc : "소형견만 산책 가능",
    //     longtitude : "37.465.43",
    //     latitude : "12.126.95322"
    //     }
  ],
};

// middleware
const getPostAPI = () =>{
    return function(dispatch, getState, {history}){
        // console.log(postId);

        apis
            .getPostAX()
            .then((res) =>{
                const post_info = res.data;
                dispatch(getPost(post_info));
                console.log('정보 불러오기 완료')
            })
            .catch((err) =>{
                console.log(err);
                console.log('정보 불러오기 실패')
            })
    }
}

const addPostAPI = (post) =>{
    return function (dispatch, getState, {history}){
        apis
            .createPostAX(post)
            .then((res) =>{
                console.log(res)
                dispatch(addPost(post));
            })
            .catch((err) =>{
                console.log(err);
            })
    }
}

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.info = action.payload.post;
        console.log(draft.info)
      }),
      [ADD_POST]:(state,action) =>
        produce(state,(draft)=>{
            draft.info = action.payload.post;
        })
  },
  initialState
);

const actionCreators = {
  getPost,
  addPost,
  getPostAPI,
  addPostAPI
};

export { actionCreators };
