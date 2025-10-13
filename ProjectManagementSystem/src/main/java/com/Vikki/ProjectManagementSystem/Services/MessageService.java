package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.Messages;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MessageService {

    Messages sendMessage(Long senderId, Long chatId, String content) throws Exception;

    List<Messages> getMessageByProjectId(Long projectId) throws Exception;
}
