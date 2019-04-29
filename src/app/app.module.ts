import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UtilityService } from './utility.service';
import { UserService } from './service/user.service';
import { SweetalertService } from './service/sweetalert.service';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("611666025859205")
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("303168554872-au7225f7e2loq2pnj73fkcqvakn0rdc7.apps.googleusercontent.com")
    }
    ]
    );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReCaptchaModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  providers: [  
    UtilityService,
    UserService,
    SweetalertService,
    { provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
