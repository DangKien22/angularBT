import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

constructor() { }
checkRole(){
  const user = JSON.parse(localStorage.getItem("currentUser") || '{}');
  if (user && user.role === 1) {
    return true;
  } else {
    return false;
  }
}
}
