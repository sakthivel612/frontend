import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_JOB_TYPE_FAIL,
  CREATE_JOB_TYPE_REQUEST,
  CREATE_JOB_TYPE_SUCCESS,
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_SUCCESS,
} from "../constants/jobTypeConstant";

// load jobs type
export const jobTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: JOB_TYPE_LOAD_REQUEST });
  try {
    // const config = {
    //   headers: {
    //     token: JSON.parse(localStorage.getItem("userInfo")).token,
    //   },
    // };
    const { data } = await axios.get(
      "https://jobportal-backend-relf.onrender.com/api/type/jobs"
    );
    dispatch({
      type: JOB_TYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_TYPE_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
  dispatch({ type: CREATE_JOB_TYPE_REQUEST });

  try {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("userInfo")).token,
      },
    };
    const { data } = await axios.post(
      "https://jobportal-backend-relf.onrender.com/api/type/create",
      jobtype, config
    );
    dispatch({
      type: CREATE_JOB_TYPE_SUCCESS,
      payload: data,
    });
    toast.success("Job type created successfully");
  } catch (error) {
    dispatch({
      type: CREATE_JOB_TYPE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};
