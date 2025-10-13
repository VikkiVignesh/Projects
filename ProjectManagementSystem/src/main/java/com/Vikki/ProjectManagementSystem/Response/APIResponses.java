package com.Vikki.ProjectManagementSystem.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class APIResponses {
    private String msg;

    public APIResponses()
    {

    }

    public APIResponses(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        return "APIResponses{" +
                "msg='" + msg + '\'' +
                '}';
    }
}
