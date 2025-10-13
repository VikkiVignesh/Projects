package com.Vikki.ProjectManagementSystem.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwt=request.getHeader(JwtConst.HEADER);


        if(jwt!=null)
        {
            //In the header JWT token is stored like this:-  bearer JWT Token (frm 7 tkn starts)
            jwt=jwt.substring(7);

            System.out.println("Token :- "+ jwt);

            try{
                SecretKey key= Keys.hmacShaKeyFor(JwtConst.SECRETKEY.getBytes());
                Claims claim= Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(jwt)
                        .getPayload();

                String email=String.valueOf(claim.get("email"));
                String authority = String.valueOf(claim.get("authorities"));

                List<GrantedAuthority> GrantAuth= AuthorityUtils.commaSeparatedStringToAuthorityList(authority);


                Authentication auth=new UsernamePasswordAuthenticationToken(email,null,GrantAuth);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
            catch (ExpiredJwtException e)
            {
                System.out.println("JWt Expired : "+e.getMessage());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
            catch (Exception e)
            {
                System.out.println(e.getMessage());
                throw  new BadCredentialsException("Invalid Token");
            }
        }
        filterChain.doFilter(request,response);
    }
}
