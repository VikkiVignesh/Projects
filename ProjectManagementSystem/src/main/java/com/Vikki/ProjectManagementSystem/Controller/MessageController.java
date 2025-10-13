package com.Vikki.ProjectManagementSystem.Controller;

import com.Vikki.ProjectManagementSystem.Model.Chat;
import com.Vikki.ProjectManagementSystem.Model.Messages;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Requests.MessageRequest;
import com.Vikki.ProjectManagementSystem.Services.MessageService;
import com.Vikki.ProjectManagementSystem.Services.ProjectService;
import com.Vikki.ProjectManagementSystem.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/msg")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;


    @PostMapping("/send")
    public ResponseEntity<Messages> sendMessage(@RequestBody MessageRequest request
    , @RequestHeader("Authorization")String jwt)throws  Exception
    {
        Users user=userService.findUserProfileByJwt(jwt);

        if(user==null)
            throw new Exception("User Not found with id "+request.getSenderId());

        Chat chats=projectService.getProjectById(request.getProjectId()).getChat();

        if(chats==null) throw new Exception("Chats not found..");

        Messages sentMessage=messageService.sendMessage(request.getSenderId(),
                request.getProjectId(), request.getContent());

        return  ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Messages>> getMessagesByChatId(@PathVariable Long projectId) throws Exception {
        List<Messages> messages=messageService.getMessageByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }
}
