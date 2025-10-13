package com.Vikki.ProjectManagementSystem.Services;

import org.springframework.stereotype.Service;

@Service
public interface EmailService {

    void sendEmailWithToken(String usrname,String link) throws Exception;

}
