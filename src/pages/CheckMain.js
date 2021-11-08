import React, {useEffect} from 'react'
import Main from './Main'
import SignDog from './SignDog'
import { useSelector,useDispatch } from 'react-redux'
import {actionCreators as UserActions} from "../redux/modules/user"
import {actionCreators as SignActions } from "../redux/modules/sign"
import Spinner from '../shared/Spinner'
const CheckMain = () => {
    const dispatch = useDispatch();
    // let dog= localStorage.getItem("dog")
    dispatch(SignActions.checkDogAPI())
    const is_loading = useSelector((state) => state.sign.is_loading)
    useEffect(() => {
     
      }, []);
      const dog = useSelector((state)=>state.sign.check_dog)
      console.log(dog)
      
      if(is_loading) {
        return <Spinner />;
      }
    return (

        <div>
            {
                dog ? <Main></Main> : <SignDog></SignDog>
            }
        </div>
    )
}

export default CheckMain
