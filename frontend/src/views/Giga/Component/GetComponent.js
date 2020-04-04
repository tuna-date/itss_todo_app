import config from "../../Config/strings";
import {Component} from 'react';

class GetComponent extends Component {
  static getData(urlContent, callback) {
    let token = localStorage.getItem('token');
    let url = config.api_url + urlContent;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      credentials: "same-origin"
    }).then(response => response.json()).then(callback, function (error) {
    })
  };

  static putData(urlContent,formData,callback){
    let token = localStorage.getItem('token');
    let url = config.api_url + urlContent;
    fetch(url, {
      method: 'PUT',
      headers: new Headers({
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      }),
      body: JSON.stringify(formData)
    }).then((res) => res.json()).then(callback,function (error){

    })
  };
  /*

   */
  static postData(){

  }
}


export default GetComponent;
