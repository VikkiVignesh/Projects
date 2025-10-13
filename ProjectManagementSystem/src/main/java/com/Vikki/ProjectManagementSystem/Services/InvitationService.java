package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.Invitation;
import org.springframework.stereotype.Service;

@Service
public interface InvitationService {
    void sendInvitation(String email,Long pId) throws Exception;
    public Invitation acceptInvitation(String token,Long uId) throws Exception;

    String getTokenByUserMali(String usermail) throws Exception;

    void deleteToken(String token) throws Exception;
}
