# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of our software seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do NOT:
- Open a public GitHub issue
- Disclose the vulnerability publicly before we've had a chance to fix it

### Please DO:
1. Email us at security@example.com with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

2. Allow us reasonable time to respond and fix the issue before disclosure

### What to expect:
- Acknowledgment within 48 hours
- Regular updates on our progress
- Credit in our security advisory (if desired)

## Security Best Practices

### For Users

1. **Keep your instance updated** - Always use the latest version
2. **Secure your environment variables** - Never commit `.env` files
3. **Use strong passwords** - Minimum 8 characters with mixed case, numbers
4. **Enable rate limiting** - Configure appropriate limits for your use case
5. **Regular backups** - Backup your database regularly
6. **HTTPS only** - Always use HTTPS in production
7. **Monitor logs** - Check logs for suspicious activity

### For Developers

1. **Input Validation** - All user inputs are validated with Zod schemas
2. **SQL Injection** - Use Prisma's parameterized queries
3. **XSS Protection** - Content Security Policy headers enabled
4. **CSRF Protection** - Built into NextAuth
5. **Rate Limiting** - Implemented in middleware
6. **Authentication** - Secure JWT-based auth with NextAuth
7. **Password Hashing** - Bcrypt with proper salt rounds
8. **Environment Variables** - Never expose secrets client-side

## Known Security Considerations

### OpenAI API Key
- Store securely in environment variables
- Never expose in client-side code
- Rotate regularly
- Monitor usage for anomalies

### Database
- Use connection string with SSL
- Restrict database access by IP
- Regular security patches
- Encrypted at rest (provider dependent)

### File Uploads
- Max file size: 10MB
- Allowed types: PDF only
- Virus scanning recommended for production
- Store files securely (consider S3)

### API Endpoints
- Rate limited to 60 req/min
- Authentication required
- Input validation
- Error messages don't leak sensitive info

## Security Headers

We implement the following security headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: [configured]
```

## Dependencies

- Regular dependency updates via Dependabot
- Security audits with `npm audit`
- Automated vulnerability scanning
- Lock file committed to repo

## Incident Response

If a security incident occurs:

1. Assess the impact immediately
2. Contain the vulnerability
3. Deploy fixes to production
4. Notify affected users
5. Post-mortem and improvements
6. Public disclosure (if appropriate)

## Compliance

This application is designed with security best practices but users are responsible for:
- GDPR compliance (if applicable)
- Data retention policies
- User consent management
- Regional data laws

## Questions?

For security-related questions that aren't vulnerabilities, please open a GitHub discussion or contact us at security@example.com.

---

Last updated: 2024-06-02
