//封装axios
//导入axios
import axios from "axios";
//创建axios实例化对象
const service = axios.create({
  //设置baseURL可以自动添加到封装的url里
  baseURL: "",
  //设置响应时间
  timeout: 3000,
  //设置请求头的格式
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

//设置请求拦截
service.interceptors.request.use(
  function(res) {
    //请求前处理
    return res;
  },
  function(error) {
    //对请求错误进行处理
    return Promise.reject(error);
  }
);

//设置响应拦截
service.interceptors.response.use(
  function(rep) {
    //对响应的处理
    return rep;
  },
  function(error) {
    //对响应错误的处理
    Promise.reject(error);
  }
);
//抛出
export default service;
