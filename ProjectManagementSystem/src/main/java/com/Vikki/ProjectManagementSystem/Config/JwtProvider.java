package com.Vikki.ProjectManagementSystem.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;

public class JwtProvider {

    static SecretKey key= Keys.hmacShaKeyFor(JwtConst.SECRETKEY.getBytes());



    public static String generateToken(Authentication auth)
    {
        String jwt=Jwts.builder()
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+86400000))
                .claim("email",auth.getName())
                .signWith(key)
                .compact();
        return  jwt;
    }


    public static  String getEmailFrmTkn(String jwt)
    {
        jwt=jwt.substring(7);
        Claims claims= Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(jwt)
                .getPayload();
        return  String.valueOf(claims.get("email"));
    }

}
