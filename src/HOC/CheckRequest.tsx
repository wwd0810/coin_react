import React, { useEffect } from "react";
import axios from "axios";

const checkRequests = (Wrapped: any) => {
  function CheckRequests(props: any) {
    useEffect(() => {
      axios.interceptors.response.use(
        function (response) {
          // Do something with response data

          return response;
        },
        function (error) {
          console.log(error);

          switch (error.response.status) {
            case 503:
              props.history.push("/error/503"); //we will redirect user into 503 page
              break;
            default:
              break;
          }
          // Do something with response error
          return Promise.reject(error);
        },
      );
    });

    return <Wrapped {...props} />;
  }
  return CheckRequests;
};

export default checkRequests;
