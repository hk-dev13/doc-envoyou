# Changelog

All notable changes to the Envoyou API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive OpenAPI specification documentation for all 78 API endpoints
- Enhanced API reference with real example payloads and responses
- Updated SDK integration guide with practical HTTP client examples
- Improved data model documentation reflecting actual API entities

### Changed
- Updated documentation to reflect current API state and capabilities
- Restructured integration guides for better developer experience

## [1.0.0] - 2025-09-15

### Added
- **Complete API Launch**: Full release of Envoyou environmental data API with 78 endpoints
- **Authentication System**: JWT token and API key authentication with user registration and login
- **User Management**: Complete user profile, API key management, session handling, and billing plan endpoints
- **Global Environmental Data**: Comprehensive datasets including:
  - US EPA CAMPD emissions data
  - EEA renewable energy statistics
  - EDGAR global emissions database
  - ISO 14001 environmental certifications
  - Corporate Environmental Verification System (CEVS)
- **Indonesian Environmental Permits**: KLHK permit data with search, filtering, and statistics
- **Notification System**: User notifications, preferences, and event management
- **Health Monitoring**: API health check and readiness endpoints
- **Admin Panel**: Administrative endpoints for API key management and system statistics
- **Documentation Site**: Complete Docusaurus-based documentation at docs.envoyou.com
- **Frontend Application**: React-based user interface for API interaction

### Changed
- N/A (initial release)

### Deprecated
- N/A (initial release)

### Removed
- N/A (initial release)

### Fixed
- N/A (initial release)

### Security
- JWT token-based authentication with secure password requirements
- API key authentication for programmatic access
- Input validation and sanitization across all endpoints
- Rate limiting implementation for API protection
- CORS configuration for web application access

---

*This changelog reflects the actual development history of the Envoyou environmental data platform. For technical details about specific endpoints, please refer to the API reference documentation.*
