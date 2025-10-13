package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.Chat;
import com.Vikki.ProjectManagementSystem.Repository.ChatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements  ChatService{

    @Autowired
    private ChatRepo chatRepo;
    @Override
    public Chat createChat(Chat chat) {
        return chatRepo.save(chat);
    }
}
