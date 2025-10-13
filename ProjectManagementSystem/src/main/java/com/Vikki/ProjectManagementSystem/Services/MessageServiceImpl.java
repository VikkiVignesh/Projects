package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.Chat;
import com.Vikki.ProjectManagementSystem.Model.Messages;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Repository.MessageRepo;
import com.Vikki.ProjectManagementSystem.Repository.ProjectRepo;
import com.Vikki.ProjectManagementSystem.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements  MessageService{

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProjectService projectService;

    @Override
    public Messages sendMessage(Long senderId, Long prjectId, String content) throws Exception {
        Users sender=userRepo.findById(senderId)
                .orElseThrow(()-> new Exception("User not found with id : "+senderId));
        Chat chat=projectService.getProjectById(prjectId).getChat();

        Messages message=new Messages();
        message.setContent(content);
        message.setSender(sender);
        message.setCreatedAt(LocalDateTime.now());
        message.setChat(chat);

        Messages savedMessage=messageRepo.save(message);

        chat.getMessages().add(savedMessage);
        return savedMessage;
    }

    @Override
    public List<Messages> getMessageByProjectId(Long projectId) throws Exception {
        Chat chat=projectService.getChatByProjectId(projectId);

        List<Messages> findByChatIdOrderByCreatedAtAsc=messageRepo.findByChatIdOrderByCreatedAtAsc(chat.getId());

        return findByChatIdOrderByCreatedAtAsc;
    }
}
