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
        String text="Click the link to join the project team"+link;

        helper.setSubject(subject);
        helper.setText(text);
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
