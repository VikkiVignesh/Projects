package com.Vikki.ProjectManagementSystem.Services;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements  EmailService{

    @Autowired
    private JavaMailSender javaMailSender;
    @Override
    public void sendEmailWithToken(String usrname, String link) throws Exception {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(mimeMessage,"utf-8");

        String subject="Join Project Team Invitation";
        String text = """
            <div style="font-family: Arial, sans-serif; font-size: 14px;">
              <p>Hello,</p>
              <p>You’ve been invited to join a project team. Click below to accept:</p>
              <p>
                <a href="%s" style="background-color:#4CAF50;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
                  Accept Invitation
                </a>
              </p>
              <p>Or copy this link into your browser:</p>
              <p>%s</p>
            </div>
            """.formatted(link, link);

        helper.setSubject(subject);
        helper.setText(text,true);
        helper.setTo(usrname);

        try
        {
            javaMailSender.send(mimeMessage);
        }
        catch (MailSendException e)
        {
            throw  new MailSendException("Failed to send Mail.");
        }
    }
}
