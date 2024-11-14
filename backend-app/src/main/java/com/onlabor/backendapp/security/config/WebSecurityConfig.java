package com.onlabor.backendapp.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.onlabor.backendapp.security.JwtAuthFilter;
import com.onlabor.backendapp.user.AppUserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {

    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors()
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/authenticate", "/api/registration", "/api/user/**", "/restaurants/**",
                        "/reviews/**")
                .permitAll()
                .requestMatchers(HttpMethod.POST, "/restaurants").hasRole("ROLE_RESTOWNER")
                .requestMatchers(HttpMethod.PUT, "/restaurants/*").hasRole("ROLE_RESTOWNER")
                .requestMatchers(HttpMethod.GET, "/api/user/restaurants*").hasRole("ROLE_RESTOWNER")
                .requestMatchers(HttpMethod.DELETE, "/reviews/user/*").hasRole("ROLE_USER")
                .requestMatchers(HttpMethod.GET, "/reviews/user/*").hasRole("ROLE_USER")
                .requestMatchers(HttpMethod.DELETE, "/reviews/restaurant/*").hasRole("ROLE_RESTOWNER")
                .requestMatchers(HttpMethod.DELETE, "/restaurants/*").hasRole("ROLE_RESTOWNER")
                .requestMatchers(HttpMethod.DELETE, "/reviews/*").hasRole("ROLE_USER")
                .requestMatchers(HttpMethod.DELETE, "/api/user/*").fullyAuthenticated()
                .requestMatchers(HttpMethod.GET, "/api/user/validate/*").fullyAuthenticated()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build(); // Build the SecurityFilterChain
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        final DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(bCryptPasswordEncoder);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                return appUserRepository.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
            }
        };
    }
}
