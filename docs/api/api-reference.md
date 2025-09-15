---
sidebar_position: 5
---

# API Reference

**Base URLs**  

- Auth: `https://app.envoyou.com`
- API: `https://api.envoyou.com`

---

## Endpoint /v1/auth/register

<span className="api-method post">POST</span> `/v1/auth/register`

Register a new user account.

**Authentication**: None required

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "company": "GreenTech Solutions",
  "job_title": "Environmental Analyst"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "data": {
    "email_sent": true,
    "verification_required": true
  }
}
```

**Response (400)**:
```json
{
  "success": false,
  "error": "Password must be at least 8 characters with uppercase, lowercase, and number",
  "data": null
}
```

**Response (409)**:
```json
{
  "success": false,
  "error": "Email already registered",
  "data": null
}
```

## Endpoint /v1/auth/login

<span className="api-method post">POST</span> `/v1/auth/login`

Authenticate user and get tokens.

**Authentication**: None required

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
      "id": "user_12345",
      "email": "john.doe@example.com",
      "name": "John Doe",
      "company": "GreenTech Solutions",
      "tier": "premium"
    }
  }
}
```

**Response (401)**:
```json
{
  "success": false,
  "error": "Invalid email or password",
  "data": null
}
```

**Response (403)**:
```json
{
  "success": false,
  "error": "Account not verified. Please check your email.",
  "data": null
}
```

## Other Data Endpoints

### /v1/global/emissions

<span className="api-method get">GET</span> `/v1/global/emissions`

Get US emissions data.

**Authentication**: API Key required

**Query Parameters**:
- `state`: string (optional) - Filter by state (e.g., "CA", "TX", "NY")
- `year`: integer (optional) - Filter by year (e.g., 2023)
- `pollutant`: string (optional) - Filter by pollutant (e.g., "CO2", "NOx", "SO2")
- `limit`: integer (default 50, max 100) - Number of results to return

**Example Request**:
```bash
GET /v1/global/emissions?state=CA&year=2023&pollutant=CO2&limit=10
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Emissions data retrieved successfully",
  "data": [
    {
      "facility_id": "fac_001",
      "facility_name": "Green Valley Power Plant",
      "state": "CA",
      "city": "Sacramento",
      "year": 2023,
      "pollutant": "CO2",
      "emissions_tons": 1250.75,
      "unit": "tons",
      "source": "EPA CAMPD",
      "last_updated": "2024-01-15T10:30:00Z"
    },
    {
      "facility_id": "fac_002",
      "facility_name": "Mountain View Manufacturing",
      "state": "CA",
      "city": "Fresno",
      "year": 2023,
      "pollutant": "CO2",
      "emissions_tons": 890.32,
      "unit": "tons",
      "source": "EPA CAMPD",
      "last_updated": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 2,
  "has_more": true
}
```

**Response (400)**:
```json
{
  "success": false,
  "error": "Invalid state parameter. Must be a valid US state code.",
  "data": null
}
```

**Response (401)**:
```json
{
  "success": false,
  "error": "Invalid API key",
  "data": null
}
```

### /v1/global/eea/renewables

<span className="api-method get">GET</span> `/v1/global/eea/renewables`

Get EEA renewable energy data.

**Authentication**: API Key required

**Query Parameters**:
- `country`: string (optional) - Filter by country code (e.g., "DE", "FR", "ES")
- `year`: integer (optional) - Filter by year (e.g., 2023)
- `limit`: integer (default 50, max 100) - Number of results to return

**Example Request**:
```bash
GET /v1/global/eea/renewables?country=DE&year=2023&limit=5
```

**Response (200)**:
```json
{
  "success": true,
  "message": "EEA renewable energy data retrieved successfully",
  "data": [
    {
      "country_code": "DE",
      "country_name": "Germany",
      "year": 2023,
      "renewable_type": "Solar",
      "capacity_mw": 67000,
      "generation_gwh": 52000,
      "share_percent": 12.5,
      "source": "EEA",
      "last_updated": "2024-02-01T08:00:00Z"
    },
    {
      "country_code": "DE",
      "country_name": "Germany",
      "year": 2023,
      "renewable_type": "Wind",
      "capacity_mw": 68000,
      "generation_gwh": 135000,
      "share_percent": 28.3,
      "source": "EEA",
      "last_updated": "2024-02-01T08:00:00Z"
    }
  ],
  "total": 2,
  "has_more": true
}
```

**Response (400)**:
```json
{
  "success": false,
  "error": "Invalid country code. Must be a valid ISO country code.",
  "data": null
}
```

### /v1/global/iso/certifications

<span className="api-method get">GET</span> `/v1/global/iso/certifications`

Get ISO 14001 certifications.

**Authentication**: API Key required

**Query Parameters**:
- `country`: string (optional) - Filter by country code (e.g., "US", "DE", "JP")
- `year`: integer (optional) - Filter by certification year (e.g., 2023)
- `limit`: integer (default 50, max 100) - Number of results to return

**Example Request**:
```bash
GET /v1/global/iso/certifications?country=US&year=2023&limit=10
```

**Response (200)**:
```json
{
  "success": true,
  "message": "ISO 14001 certifications retrieved successfully",
  "data": [
    {
      "company_name": "EcoManufacturing Inc.",
      "country_code": "US",
      "country_name": "United States",
      "certification_number": "ISO14001-2023-001",
      "issue_date": "2023-03-15",
      "expiry_date": "2026-03-14",
      "certification_body": "ANSI",
      "scope": "Manufacturing of sustainable products",
      "status": "active",
      "source": "ISO",
      "last_updated": "2024-01-20T12:00:00Z"
    },
    {
      "company_name": "GreenTech Solutions LLC",
      "country_code": "US",
      "country_name": "United States",
      "certification_number": "ISO14001-2023-002",
      "issue_date": "2023-05-20",
      "expiry_date": "2026-05-19",
      "certification_body": "ANSI",
      "scope": "Environmental consulting services",
      "status": "active",
      "source": "ISO",
      "last_updated": "2024-01-20T12:00:00Z"
    }
  ],
  "total": 2,
  "has_more": true
}
```

**Response (404)**:
```json
{
  "success": false,
  "error": "No ISO certifications found for the specified criteria",
  "data": null
}
```

### /v1/permits/search

<span className="api-method get">GET</span> `/v1/permits/search`

Search Indonesian environmental permits.

**Authentication**: API Key required

**Query Parameters**:
- `province`: string (optional) - Filter by province (e.g., "DKI Jakarta", "Jawa Barat")
- `company`: string (optional) - Filter by company name (e.g., "PT ABC", "CV XYZ")
- `permit_type`: string (optional) - Filter by permit type (e.g., "AMDAL", "UKL-UPL", "SPPL")
- `limit`: integer (default 50, max 100) - Number of results to return

**Example Request**:
```bash
GET /v1/permits/search?province=DKI%20Jakarta&company=PT%20ABC&permit_type=AMDAL&limit=5
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Environmental permits retrieved successfully",
  "data": [
    {
      "permit_id": "permit_001",
      "permit_number": "KLHK-AMDAL-2023-001",
      "company_name": "PT ABC Manufacturing",
      "permit_type": "AMDAL",
      "province": "DKI Jakarta",
      "city": "Jakarta Pusat",
      "issue_date": "2023-06-15",
      "expiry_date": "2028-06-14",
      "status": "active",
      "facility_address": "Jl. Industri No. 123, Jakarta Pusat",
      "latitude": -6.2088,
      "longitude": 106.8456,
      "environmental_impact": "Low",
      "source": "KLHK",
      "last_updated": "2024-01-10T09:00:00Z"
    },
    {
      "permit_id": "permit_002",
      "permit_number": "KLHK-UKLUPL-2023-045",
      "company_name": "PT ABC Manufacturing",
      "permit_type": "UKL-UPL",
      "province": "DKI Jakarta",
      "city": "Jakarta Pusat",
      "issue_date": "2023-08-20",
      "expiry_date": "2025-08-19",
      "status": "active",
      "facility_address": "Jl. Industri No. 123, Jakarta Pusat",
      "latitude": -6.2088,
      "longitude": 106.8456,
      "environmental_impact": "Very Low",
      "source": "KLHK",
      "last_updated": "2024-01-10T09:00:00Z"
    }
  ],
  "total": 2,
  "has_more": true
}
```

**Response (400)**:
```json
{
  "success": false,
  "error": "Invalid permit_type. Must be one of: AMDAL, UKL-UPL, SPPL",
  "data": null
}
```

## Request & Response Format

All requests use JSON format. All responses follow the consistent Envoyou format:

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data (object or array)
  },
  "total": 10,        // For list endpoints
  "has_more": true    // For paginated endpoints
}
```

**Error Response (4xx)**:
```json
{
  "success": false,
  "error": "Error description",
  "data": null
}
```

**Common HTTP Status Codes**:
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `401`: Unauthorized (invalid/missing API key or token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (resource doesn't exist)
- `409`: Conflict (resource already exists)
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Internal Server Error

**Authentication Methods**:
- **API Key**: Include in header `X-API-Key: your_api_key`
- **Bearer Token**: Include in header `Authorization: Bearer your_jwt_token`
