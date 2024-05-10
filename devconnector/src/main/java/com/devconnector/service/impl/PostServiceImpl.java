package com.devconnector.service.impl;

import com.devconnector.dto.PostDTO;
import com.devconnector.dto.PostRequestDTO;
import com.devconnector.exception.AppException;
import com.devconnector.mapper.PostMapper;
import com.devconnector.model.Like;
import com.devconnector.model.Post;
import com.devconnector.model.User;
import com.devconnector.repository.LikeRepository;
import com.devconnector.repository.PostRepository;
import com.devconnector.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private PostMapper postMapper;
    private LikeRepository likeRepository;

    @Override
    public PostDTO findById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new AppException("Post not found", HttpStatus.NOT_FOUND));
        return postMapper.fromPost(post);
    }

    @Override
    public PostDTO addPost(PostRequestDTO postRequestDTO, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Post post = postMapper.toPost(postRequestDTO);
        post.setUser(user);
        post.setCreatedAt(Instant.now());
        postRepository.save(post);
        return postMapper.fromPost(post);
    }

    @Override
    public void deletePostById(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public void like(Long postId, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();

        Post post = postRepository.findById(postId).orElse(null);

        if(post == null) {
            throw new AppException("Post not found", HttpStatus.NOT_FOUND);
        }
        if(post.getLikes() == null) {
            post.setLikes(new ArrayList<>());
        }
        if(post.getLikes().stream().anyMatch(like -> Objects.equals(like.getUser().getId(), user.getId()))) {
            throw new AppException("User already liked this post", HttpStatus.BAD_REQUEST);
        }

        Like like = Like.builder()
            .likedAt(Instant.now())
            .post(post)
            .user(user)
            .build();
        likeRepository.save(like);
    }

    @Override
    public void unlike(Long postId, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();

        Post post = postRepository.findById(postId).orElse(null);

        if(post == null) {
            throw new AppException("Post not found", HttpStatus.NOT_FOUND);
        }
        if(post.getLikes() == null) {
            post.setLikes(new ArrayList<>());
        }
        if(!post.getLikes().stream().anyMatch(like -> Objects.equals(like.getUser().getId(), user.getId()))) {
            throw new AppException("There is nothing to unlike", HttpStatus.BAD_REQUEST);
        }
        Long likeId = post.getLikes().stream().filter(like -> like.getUser().getId().equals(user.getId())).map(like -> like.getId()).count();
        likeRepository.deleteById(likeId);
    }

    @Override
    public PostDTO updatePost(PostRequestDTO postRequestDTO, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Post post = postMapper.toPost(postRequestDTO);
        post.setUser(user);
        postRepository.save(post);
        return postMapper.fromPost(post);
    }

    @Override
    public List<PostDTO> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(post -> postMapper.fromPost(post)).toList();
    }
}
