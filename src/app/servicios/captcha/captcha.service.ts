import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

/**
 * {
  "event": {
    "token": "TOKEN",
    "expectedAction": "USER_ACTION",
    "siteKey": "6LcPXg4pAAAAAMpDgbKZlga8rAUTUL-zObx0EuhN",
  }
}
 */

  constructor(private http: HttpClient) { }

  solicitarToken()
  {
    this.http.post(
    "https://recaptchaenterprise.googleapis.com/v1/projects/clinica-online-97f5a/assessments?key=API_KEY",
      {
        "event": {
          "token": "TOKEN",
          "expectedAction": "USER_ACTION",
          "siteKey": "6LcPXg4pAAAAAMpDgbKZlga8rAUTUL-zObx0EuhN",
        }
      }
    );
  }
}
