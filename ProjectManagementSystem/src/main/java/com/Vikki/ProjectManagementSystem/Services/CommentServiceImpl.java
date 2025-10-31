package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.Comment;
import com.Vikki.ProjectManagementSystem.Model.Issues;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Repository.CommentRepo;
import com.Vikki.ProjectManagementSystem.Repository.IssueRepo;
import com.Vikki.ProjectManagementSystem.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public Comment creatComment(Long issueId, Long userId, String cmnt) throws Exception {

        Optional<Issues> issuesOptional=issueRepo.findById(issueId);
        Optional<Users> usersOptional=userRepo.findById(userId);

        if(issuesOptional.isEmpty())
        {
            throw  new Exception("Issue not found..with this id : "+issueId);
        }

        if(usersOptional.isEmpty())
        {
            throw  new Exception("User not found..with this id : "+userId);
        }

        Issues issue=issuesOptional.get();

        Users user=usersOptional.get();

        Comment comment=new Comment();

        comment.setIssue(issue);
        comment.setUser(user);
        comment.setCreatedDateTime(LocalDateTime.now());
        comment.setContent(cmnt);

        Comment savedComment=commentRepo.save(comment);

        issue.getComments().add(savedComment);

        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userid) throws Exception {
        Optional<Comment> commentOptional=commentRepo.findById(commentId);
        Optional<Users> usersOptional=userRepo.findById(userid);

        if(commentOptional.isEmpty())
        {
            throw  new Exception("Comment not found..with this id : "+commentId);
        }

        if(usersOptional.isEmpty())
        {
            throw  new Exception("User not found..with this id : "+userid);
        }

        Comment comment=commentOptional.get();
        Users user=usersOptional.get();

        if(comment.getUser().equals(user))
        {
            commentRepo.delete(comment);
        }
        else
        {
            throw new Exception("User Does not have permission to delete this comment..");
        }
    }

    @Override
    public List<Comment> findCommentByIssueId(Long issueId) {
        return commentRepo.findByIssueId(issueId);
    }
}
