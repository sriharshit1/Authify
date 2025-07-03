package com.Harshit.authify.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendWelcomeEmail(String toEmail, String name) throws MessagingException {
        sendHtmlEmail(toEmail, "Welcome to Authify 🎉", "emails/welcome.html", new Context(null, Map.of("name", name)));
    }

    public void sendResetOtpEmail(String toEmail, String otp) throws MessagingException {
        sendHtmlEmail(toEmail, "Your Password Reset OTP 🔑", "emails/reset-otp.html", new Context(null, Map.of("otp", otp)));
    }

    public void sendOtpEmail(String toEmail, String otp) throws MessagingException {
        sendHtmlEmail(toEmail, "Verify Your Authify Account ✅", "emails/verify-otp.html", new Context(null, Map.of("otp", otp)));
    }

    private void sendHtmlEmail(String to, String subject, String template, Context context) throws MessagingException {
        String htmlContent = templateEngine.process(template, context);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true); // true = HTML
        javaMailSender.send(mimeMessage);
    }
}
