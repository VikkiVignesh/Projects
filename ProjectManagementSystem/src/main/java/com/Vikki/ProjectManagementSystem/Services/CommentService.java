package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.Comment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public interface CommentService {

    Comment creatComment(Long issueId,Long userId,String comment) throws Exception;

    void deleteComment(Long commentId,Long userid) throws Exception;

    List<Comment> findCommentByIssueId(Long issueId);
}
