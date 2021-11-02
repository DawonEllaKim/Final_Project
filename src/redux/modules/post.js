import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// action
const GET_POST = "GET_POST";
const ADD_POST = 'ADD_POST';
const UPDATE_POST = 'UPDATE_POST'
const DELETE_POST = 'DELETE_POST';

// action creators
const getPost = createAction(GET_POST, (postList) => ({ postList }));
const addPost = createAction(ADD_POST,(post) =>({post}));
const updatePost = createAction(UPDATE_POST,(postId) => ({postId}))
const deletePost = createAction(DELETE_POST, (postId) =>({postId}));

// initialState
const initialState = {
  list: [],

};

// middleware  dogGender, dogAge, dogName, meetingTime,meetingDate,wishList
const getPostMD = () =>{
    return function(dispatch, getState, {history}){
        // console.log(postId);

        apis
            .getPostAX()
            .then((res) =>{
                const postList = res.data;
                dispatch(getPost(postList));
                console.log('정보 불러오기 완료')
            })
            .catch((err) =>{
                console.log(err);
                console.log('정보 불러오기 실패')
            })
    }
}

const addPostMD = (post) =>{
    return function (dispatch, getState, {history}){
        apis
            .createPostAX(post)
            .then((res) =>{
                console.log(res)
                dispatch(addPost(post));
                window.location.replace("/")
            })
            .catch((err) =>{
                console.log(err);
            })
    }
}

// const updatePostMD = (postId, post) =>{
//   return function(dispatch, getState, {history}){

//     apis
//       .updatePostAX(postId, post)
//       .then((res) => {
//         console.log(res.data)
//         // dispatch(updatePost(postId, post))
//         history.push('/')
//       })
//       .catch((err) =>{
//         console.log(err);
//       })
//   }
// }

const updatePostMD = (postId, post) =>{
  return function (dispatch, getState, {history}) {
    apis
      .updatePostAX(postId, post)
      .then((res) =>{
        // dispatch(updatePost(postId));
        console.log('수정완료');
        window.alert('수정완료');
        history.push(`/posts/${postId}`)
      })
      .catch((err) =>{
        console.log(err)
      })
  }
}

const deletePostMD = (postId) =>{
  return function (dispatch, getState, {history}){
    console.log(postId)
    apis
        .deletePostAX(postId)
        .then((res)=>{
          console.log('삭제 완료')
          window.alert('삭제 완료')
          dispatch(deletePost(postId));
          history.replace("/")
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
        draft.list = action.payload.list;
        console.log(draft.list)
      }),
    [ADD_POST]:(state,action) =>
      produce(state,(draft)=>{
        draft.list.push(action.payload.post) ;
        console.log(draft.list)
    }),
    [UPDATE_POST]:(state,action) =>
      produce(state,(draft)=>{
        const index = draft.list.findIndex((post)=> post.postId === action.payload.post.postId);
        draft.list[index] = { ...draft.list[index], ...action.payload.post}
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft)=>{
        console.log(action.payload.postId);
        draft.list = draft.list.filter(post=>post.id !== action.payload.postId);
      })
  },
  initialState
);

const actionCreators = {
  getPost,
  addPost,
  deletePost,
  getPostMD,
  addPostMD,
  deletePostMD,
  updatePost,
  updatePostMD,
  // getUpdatePostMD
};

export { actionCreators };