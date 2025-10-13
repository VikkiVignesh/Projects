package com.Vikki.ProjectManagementSystem.DTO;

import com.Vikki.ProjectManagementSystem.Model.Issues;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class UserMiniDto {
    private Long id;
    private String name;
    private String email;
    private int projectsize;
    private List<Issues> issues=new ArrayList<>();

    public UserMiniDto(Long id, String name, String email,int projectsize,List<Issues> issue) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.projectsize=projectsize;
        this.issues=issue;
    }

    public UserMiniDto(Long id, String name, String email) {
        this.id=id;
        this.name=name;
        this.email=email;
    }


    public List<Issues> getIssues() {
        return issues;
    }

    public void setIssues(List<Issues> issues) {
        this.issues = issues;
    }

    public int getProjectsize() {
        return projectsize;
    }

    public void setProjectsize(int projectsize) {
        this.projectsize = projectsize;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
