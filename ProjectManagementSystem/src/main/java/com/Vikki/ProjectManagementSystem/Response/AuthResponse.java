package com.Vikki.ProjectManagementSystem.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class AuthResponse {

    private  String jwt;
    private  String msg;

    public  AuthResponse()
    {

    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public AuthResponse(String jwt, String msg) {
        this.jwt = jwt;
        this.msg = msg;
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
                "jwt='" + jwt + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
}
