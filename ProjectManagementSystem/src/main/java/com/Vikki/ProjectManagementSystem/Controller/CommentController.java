package com.Vikki.ProjectManagementSystem.Controller;

import com.Vikki.ProjectManagementSystem.DTO.CommentDto;
import com.Vikki.ProjectManagementSystem.DTO.UserMiniDto;
import com.Vikki.ProjectManagementSystem.Model.Comment;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Requests.CommentRequest;
import com.Vikki.ProjectManagementSystem.Response.APIResponses;
import com.Vikki.ProjectManagementSystem.Services.CommentService;
import com.Vikki.ProjectManagementSystem.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<CommentDto> createComment(
            @RequestBody CommentRequest commentRequest,
            @RequestHeader("Authorization") String jwt
            ) throws Exception
    {
        Users user=userService.findUserProfileByJwt(jwt);
        Comment comment = commentService.creatComment(
                commentRequest.getIssueId(),
                user.getId(),
                commentRequest.getContent()
        );

        // Only include minimal user info to prevent recursion
        UserMiniDto userDto = new UserMiniDto(comment.getUser().getId(),comment.getUser().getName(),comment.getUser().getEmail());

        CommentDto dto = new CommentDto(comment.getId(),comment.getContent(),comment.getCreatedDateTime().toString(),userDto);

        return  ResponseEntity.ok(dto);
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<APIResponses> deleteComment(
            @PathVariable Long commentId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception
    {
        Users user=userService.findUserProfileByJwt(jwt);
        commentService.deleteComment(commentId,user.getId());

        String msg="Comment with ID : "+commentId+" deleted successfully..";
        return ResponseEntity.ok(new APIResponses(msg));
    }


    @GetMapping("/{issueId}")
    public ResponseEntity<List<CommentDto>> getCommentsByIssueId(@PathVariable Long issueId)
    {
        List<Comment> comments = commentService.findCommentByIssueId(issueId);

        // Convert to DTOs (with minimal user info)
        List<CommentDto> commentDtos = comments.stream().map(comment -> {
            Users user = comment.getUser();
            UserMiniDto userDto = new UserMiniDto(user.getId(), user.getName(), user.getEmail());
            return new CommentDto(
                    comment.getId(),
                    comment.getContent(),
                    comment.getCreatedDateTime().toString(),
                    userDto
            );
        }).toList();
        return  ResponseEntity.ok(commentDtos);
    }
}
