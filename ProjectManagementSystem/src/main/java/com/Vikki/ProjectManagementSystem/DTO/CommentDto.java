package com.Vikki.ProjectManagementSystem.DTO;

public class CommentDto {
    private Long id;
    private String content;
    private String createdDateTime; // you can store as String or LocalDateTime
    private UserMiniDto user;

    public CommentDto(Long id, String content, String date, UserMiniDto userDto) {
        this.id=id;
        this.content=content;
        this.createdDateTime=date;
        this.user=userDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(String createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public UserMiniDto getUser() {
        return user;
    }

    public void setUser(UserMiniDto user) {
        this.user = user;
    }
}
