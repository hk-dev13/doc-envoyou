# Data Model Overview

This section describes the core data entities exposed by the Envoyou API.

## Core Entities

| Entity | Description |
|--------|-------------|
| **User** | User accounts with authentication, profiles, API keys, and billing plans. |
| **APIKey** | API authentication keys with permissions and usage tracking. |
| **Notification** | System notifications including billing alerts, system messages, and user events. |
| **Permit** | Indonesian environmental permits with facility details and compliance status. |
| **GlobalData** | Environmental datasets from global sources (emissions, CAMPD, EEA, EDGAR, ISO, CEVS). |
| **Station** | Air quality monitoring stations with geographic coordinates and metadata. |
| **Measurement** | Pollutant concentration measurements with timestamps and quality indicators. |

## Data Categories

### User Management
- **Authentication**: JWT tokens, API keys, OAuth providers (Google, GitHub)
- **Profiles**: User information, company details, billing tiers
- **Sessions**: Login tracking and session management

### Environmental Data
- **Air Quality**: Real-time pollutant measurements from monitoring stations
- **Emissions**: Facility-level emissions data from EPA CAMPD
- **Permits**: Indonesian environmental permits and compliance data
- **Global Datasets**: EEA renewable energy, EDGAR emissions, ISO certifications

### System & Notifications
- **Billing**: Subscription management and payment notifications
- **Alerts**: Environmental threshold alerts and system notifications
- **API Management**: Key generation, usage tracking, and permissions

## Conventions
- All timestamps are ISO 8601 UTC (`YYYY-MM-DDTHH:mm:ssZ`).
- Geographic coordinates use WGS84 (latitude/longitude).
- API responses follow consistent JSON structure with `success`, `data`, `message` fields.
- Pagination uses cursor-based approach with `limit` and `has_more` indicators.

## Example Objects

### User Object
```json
{
  "id": "user_12345",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "company": "GreenTech Solutions",
  "tier": "premium",
  "created_at": "2025-01-15T10:30:00Z",
  "last_login_at": "2025-09-15T08:00:00Z",
  "is_active": true,
  "two_factor_enabled": false
}
```

### Permit Object
```json
{
  "permit_id": "permit_001",
  "permit_number": "KLHK-AMDAL-2023-001",
  "company_name": "PT ABC Manufacturing",
  "permit_type": "AMDAL",
  "province": "DKI Jakarta",
  "issue_date": "2023-06-15",
  "expiry_date": "2028-06-14",
  "status": "active",
  "latitude": -6.2088,
  "longitude": 106.8456
}
```

### Measurement Object
```json
{
  "station_id": "STN_9823",
  "pollutant": "pm25",
  "value": 43.2,
  "unit": "µg/m³",
  "captured_at": "2025-09-13T07:15:00Z",
  "city": "Jakarta",
  "quality_index": 112,
  "aqi_category": "Moderate"
}
```

## Data Sources
- **KLHK**: Indonesian Ministry of Environment and Forestry permits
- **EPA CAMPD**: US Clean Air Markets Program Data emissions
- **EEA**: European Environment Agency renewable energy data
- **EDGAR**: Emissions Database for Global Atmospheric Research
- **ISO**: International Organization for Standardization certifications
- **CEVS**: Corporate Environmental Verification System

## Next Topics
- [API Authentication Guide](https://docs.envoyou.com/docs/api/authentication)
- [Rate Limiting & Quotas](https://docs.envoyou.com/docs/guides/rate-limiting)
- [Error Handling](https://docs.envoyou.com/docs/guides/error-handling)
- Data Update Frequencies
