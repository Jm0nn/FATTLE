package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.dto.CustomUserDetailsDto;
import com.sixman.fattle.entity.User;
import com.sixman.fattle.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userCode) throws UsernameNotFoundException {
        User user = userRepository.getUser(Long.parseLong(userCode));

        return new CustomUserDetailsDto(user);
    }
}
