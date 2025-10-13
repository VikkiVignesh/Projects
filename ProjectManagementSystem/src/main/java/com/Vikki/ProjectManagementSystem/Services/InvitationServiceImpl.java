package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.Invitation;
import com.Vikki.ProjectManagementSystem.Repository.InvitationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationServiceImpl implements  InvitationService{

    @Autowired
    private InvitationRepo invitationRepo;

    @Autowired
    private EmailService emailService;
    @Override
    public void sendInvitation(String email, Long pId) throws Exception {
        String invitationToken= UUID.randomUUID().toString();

        Invitation invitation=new Invitation();
        invitation.setEmail(email);
        invitation.setProjectId(pId);
        invitation.setToken(invitationToken);

        invitationRepo.save(invitation);

        String invitationLink="http://localhost:5173/accept_invitation?token="+invitationToken;
        emailService.sendEmailWithToken(email,invitationLink);
    }

    @Override
    public Invitation acceptInvitation(String token, Long uId) throws Exception {
        Invitation invitation=invitationRepo.findByToken(token);

        if(invitation==null)
        {
            throw  new Exception("Invalid invitation Token");
        }
        return invitation;
    }

    @Override
    public String getTokenByUserMali(String usermail) throws Exception {
        Invitation invitation=invitationRepo.findByEmail(usermail);
        if(invitation==null)
        {
            throw  new Exception("User Invitation not found..");
        }
        return  invitation.getToken();
    }

    @Override
    public void deleteToken(String token) throws Exception {
      Invitation invitation=invitationRepo.findByToken(token);

      if(invitation==null)
      {
          throw new Exception("Invitation not found..");
      }

      invitationRepo.delete(invitation);
    }
}
