# SDK and Libraries Guide

This guide covers integration methods for the Envoyou API, including HTTP client libraries and best practices. **Official SDKs are planned for future releases.**

## Integration Methods

### Direct API Integration

The Envoyou API is a RESTful API that can be integrated using any HTTP client library. All endpoints return JSON responses with consistent error handling.

#### Authentication

The API supports two authentication methods:

**API Key Authentication:**
```bash
curl -X GET "https://api.envoyou.com/v1/users/me" \
  -H "X-API-Key: your_api_key_here"
```

**JWT Bearer Token:**
```bash
curl -X GET "https://api.envoyou.com/v1/users/me" \
  -H "Authorization: Bearer your_jwt_token_here"
```

### JavaScript/TypeScript Integration

#### Using Fetch API (Modern Browsers)

```javascript
class EnvoyouAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.envoyou.com/v1';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${data.error || 'Unknown error'}`);
    }

    return data;
  }

  // Authentication endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  // User management
  async getCurrentUser() {
    return this.request('/users/me');
  }

  async updateProfile(userData) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  // Environmental data
  async getEmissions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/global/emissions${queryString ? '?' + queryString : ''}`);
  }

  async searchPermits(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/permits/search${queryString ? '?' + queryString : ''}`);
  }

  async getNotifications() {
    return this.request('/notifications');
  }
}

// Usage example
const api = new EnvoyouAPI('your_api_key_here');

// Register new user
try {
  const result = await api.register({
    email: 'john.doe@example.com',
    password: 'SecurePass123!',
    name: 'John Doe',
    company: 'GreenTech Solutions'
  });
  console.log('Registration successful:', result);
} catch (error) {
  console.error('Registration failed:', error.message);
}

// Login
try {
  const auth = await api.login({
    email: 'john.doe@example.com',
    password: 'SecurePass123!'
  });
  console.log('Login successful, token:', auth.data.access_token);

  // Use JWT token for subsequent requests
  api = new EnvoyouAPI(auth.data.access_token);
} catch (error) {
  console.error('Login failed:', error.message);
}

// Get emissions data
try {
  const emissions = await api.getEmissions({
    state: 'CA',
    year: 2023,
    pollutant: 'CO2',
    limit: 10
  });
  console.log('Emissions data:', emissions.data);
} catch (error) {
  console.error('Failed to get emissions:', error.message);
}
```

#### Using Axios Library

```bash
npm install axios
```

```javascript
import axios from 'axios';

const envoyouClient = axios.create({
  baseURL: 'https://api.envoyou.com/v1',
  headers: {
    'X-API-Key': 'your_api_key_here',
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
envoyouClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.error || error.response.statusText;
      throw new Error(`API Error ${error.response.status}: ${message}`);
    }
    throw error;
  }
);

// Usage
async function getUserProfile() {
  try {
    const response = await envoyouClient.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Failed to get user profile:', error.message);
    throw error;
  }
}

async function updateUserProfile(updates) {
  try {
    const response = await envoyouClient.put('/users/me', updates);
    return response.data;
  } catch (error) {
    console.error('Failed to update profile:', error.message);
    throw error;
  }
}

// Example usage
const user = await getUserProfile();
console.log('Current user:', user.data);

const updated = await updateUserProfile({
  name: 'Updated Name',
  company: 'New Company'
});
console.log('Updated user:', updated.data);

  timeout: 30000,
  retryConfig: {
    maxRetries: 3,
    backoffMultiplier: 2,
    retryableErrors: [429, 500, 502, 503, 504]
  },
  rateLimitConfig: {
    requestsPerSecond: 10,
    burstLimit: 20
  }
  ```

### Python Integration

#### Using Requests Library

```python
import requests
from typing import Dict, Any, Optional

class EnvoyouAPI:
    def __init__(self, api_key: str, base_url: str = 'https://api.envoyou.com/v1'):
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'X-API-Key': api_key,
            'Content-Type': 'application/json'
        })

    def _request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        url = f"{self.base_url}{endpoint}"
        response = self.session.request(method, url, **kwargs)
        response.raise_for_status()
        return response.json()

    def register(self, email: str, password: str, name: str, **kwargs) -> Dict[str, Any]:
        data = {
            'email': email,
            'password': password,
            'name': name,
            **kwargs
        }
        return self._request('POST', '/auth/register', json=data)

    def login(self, email: str, password: str) -> Dict[str, Any]:
        data = {'email': email, 'password': password}
        return self._request('POST', '/auth/login', json=data)

    def get_current_user(self) -> Dict[str, Any]:
        return self._request('GET', '/users/me')

    def update_profile(self, updates: Dict[str, Any]) -> Dict[str, Any]:
        return self._request('PUT', '/users/me', json=updates)

    def get_emissions(self, **params) -> Dict[str, Any]:
        return self._request('GET', '/global/emissions', params=params)

    def search_permits(self, **params) -> Dict[str, Any]:
        return self._request('GET', '/permits/search', params=params)

    def get_notifications(self) -> Dict[str, Any]:
        return self._request('GET', '/notifications')

# Usage example
api = EnvoyouAPI('your_api_key_here')

# Register user
try:
    result = api.register(
        email='john.doe@example.com',
        password='SecurePass123!',
        name='John Doe',
        company='GreenTech Solutions'
    )
    print('Registration successful:', result)
except requests.exceptions.RequestException as e:
    print('Registration failed:', str(e))

# Login
try:
    auth = api.login('john.doe@example.com', 'SecurePass123!')
    print('Login successful, token:', auth['data']['access_token'])

    # Switch to JWT authentication for subsequent requests
    api.session.headers.update({
        'Authorization': f"Bearer {auth['data']['access_token']}",
        'X-API-Key': None  # Remove API key header
    })
except requests.exceptions.RequestException as e:
    print('Login failed:', str(e))

# Get emissions data
try:
    emissions = api.get_emissions(state='CA', year=2023, pollutant='CO2', limit=10)
    print('Emissions data:', emissions['data'])
except requests.exceptions.RequestException as e:
    print('Failed to get emissions:', str(e))
```

#### Using httpx (Async Support)

```python
import httpx
import asyncio
from typing import Dict, Any, Optional

class AsyncEnvoyouAPI:
    def __init__(self, api_key: str, base_url: str = 'https://api.envoyou.com/v1'):
        self.api_key = api_key
        self.base_url = base_url

    async def _request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            headers = {
                'X-API-Key': self.api_key,
                'Content-Type': 'application/json'
            }
            if 'headers' in kwargs:
                headers.update(kwargs['headers'])
                del kwargs['headers']

            response = await client.request(
                method,
                f"{self.base_url}{endpoint}",
                headers=headers,
                **kwargs
            )
            response.raise_for_status()
            return response.json()

    async def get_emissions(self, **params) -> Dict[str, Any]:
        return await self._request('GET', '/global/emissions', params=params)

    async def search_permits(self, **params) -> Dict[str, Any]:
        return await self._request('GET', '/permits/search', params=params)

# Async usage
async def main():
    api = AsyncEnvoyouAPI('your_api_key_here')

    try:
        emissions = await api.get_emissions(state='CA', year=2023, limit=5)
        print('Emissions:', emissions['data'])

        permits = await api.search_permits(province='DKI Jakarta', limit=5)
        print('Permits:', permits['data'])
    except httpx.HTTPError as e:
        print('API request failed:', str(e))

asyncio.run(main())
```

### Go Integration

#### Using net/http Package

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

type EnvoyouAPI struct {
    apiKey   string
    baseURL  string
    client   *http.Client
}

type APIResponse struct {
    Success bool        `json:"success"`
    Message string      `json:"message,omitempty"`
    Data    interface{} `json:"data,omitempty"`
    Error   string      `json:"error,omitempty"`
}

func NewEnvoyouAPI(apiKey string) *EnvoyouAPI {
    return &EnvoyouAPI{
        apiKey:  apiKey,
        baseURL: "https://api.envoyou.com/v1",
        client: &http.Client{
            Timeout: 30 * time.Second,
        },
    }
}

func (api *EnvoyouAPI) request(method, endpoint string, data interface{}) (*APIResponse, error) {
    var body io.Reader
    if data != nil {
        jsonData, err := json.Marshal(data)
        if err != nil {
            return nil, err
        }
        body = bytes.NewBuffer(jsonData)
    }

    req, err := http.NewRequest(method, api.baseURL+endpoint, body)
    if err != nil {
        return nil, err
    }

    req.Header.Set("X-API-Key", api.apiKey)
    req.Header.Set("Content-Type", "application/json")

    resp, err := api.client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var result APIResponse
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, err
    }

    if resp.StatusCode >= 400 {
        return nil, fmt.Errorf("API error %d: %s", resp.StatusCode, result.Error)
    }

    return &result, nil
}

func (api *EnvoyouAPI) Register(email, password, name string) (*APIResponse, error) {
    data := map[string]string{
        "email":    email,
        "password": password,
        "name":     name,
    }
    return api.request("POST", "/auth/register", data)
}

func (api *EnvoyouAPI) Login(email, password string) (*APIResponse, error) {
    data := map[string]string{
        "email":    email,
        "password": password,
    }
    return api.request("POST", "/auth/login", data)
}

func (api *EnvoyouAPI) GetCurrentUser() (*APIResponse, error) {
    return api.request("GET", "/users/me", nil)
}

func main() {
    api := NewEnvoyouAPI("your_api_key_here")

    // Register user
    registerResp, err := api.Register("john.doe@example.com", "SecurePass123!", "John Doe")
    if err != nil {
        fmt.Printf("Registration failed: %v\n", err)
        return
    }
    fmt.Printf("Registration successful: %+v\n", registerResp)

    // Login
    loginResp, err := api.Login("john.doe@example.com", "SecurePass123!")
    if err != nil {
        fmt.Printf("Login failed: %v\n", err)
        return
    }
    fmt.Printf("Login successful: %+v\n", loginResp)

    // Get current user
    userResp, err := api.GetCurrentUser()
    if err != nil {
        fmt.Printf("Get user failed: %v\n", err)
        return
    }
    fmt.Printf("Current user: %+v\n", userResp)
}
```

### PHP Integration

#### Using cURL

```php
<?php

class EnvoyouAPI {
    private $apiKey;
    private $baseURL;

    public function __construct($apiKey, $baseURL = 'https://api.envoyou.com/v1') {
        $this->apiKey = $apiKey;
        $this->baseURL = $baseURL;
    }

    private function request($method, $endpoint, $data = null) {
        $url = $this->baseURL . $endpoint;

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'X-API-Key: ' . $this->apiKey,
            'Content-Type: application/json'
        ]);

        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if (curl_errno($ch)) {
            throw new Exception('cURL Error: ' . curl_error($ch));
        }

        curl_close($ch);

        $result = json_decode($response, true);

        if ($httpCode >= 400) {
            throw new Exception('API Error ' . $httpCode . ': ' . ($result['error'] ?? 'Unknown error'));
        }

        return $result;
    }

    public function register($email, $password, $name, $company = null) {
        $data = [
            'email' => $email,
            'password' => $password,
            'name' => $name
        ];

        if ($company) {
            $data['company'] = $company;
        }

        return $this->request('POST', '/auth/register', $data);
    }

    public function login($email, $password) {
        return $this->request('POST', '/auth/login', [
            'email' => $email,
            'password' => $password
        ]);
    }

    public function getCurrentUser() {
        return $this->request('GET', '/users/me');
    }

    public function getEmissions($params = []) {
        $query = http_build_query($params);
        $endpoint = '/global/emissions' . ($query ? '?' . $query : '');
        return $this->request('GET', $endpoint);
    }
}

// Usage example
try {
    $api = new EnvoyouAPI('your_api_key_here');

    // Register user
    $registerResult = $api->register(
        'john.doe@example.com',
        'SecurePass123!',
        'John Doe',
        'GreenTech Solutions'
    );
    echo "Registration successful: " . json_encode($registerResult) . "\n";

    // Login
    $loginResult = $api->login('john.doe@example.com', 'SecurePass123!');
    echo "Login successful: " . json_encode($loginResult) . "\n";

    // Get emissions data
    $emissions = $api->getEmissions([
        'state' => 'CA',
        'year' => 2023,
        'limit' => 5
    ]);
    echo "Emissions data: " . json_encode($emissions) . "\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

?>
```

## HTTP Client Libraries

For languages without specific examples above, use standard HTTP clients with proper authentication headers.

### cURL Examples

#### Authentication & User Management
```bash
# Register new user
curl -X POST "https://api.envoyou.com/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "name": "John Doe",
    "company": "GreenTech Solutions"
  }'

# Login
curl -X POST "https://api.envoyou.com/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'

# Get current user profile
curl -X GET "https://api.envoyou.com/v1/users/me" \
  -H "X-API-Key: your_api_key_here"

# Update user profile
curl -X PUT "https://api.envoyou.com/v1/users/me" \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "company": "New Company Name"
  }'
```

#### Environmental Data Endpoints
```bash
# Get US emissions data
curl -X GET "https://api.envoyou.com/v1/global/emissions?state=CA&year=2023&pollutant=CO2&limit=10" \
  -H "X-API-Key: your_api_key_here"

# Get EEA renewable energy data
curl -X GET "https://api.envoyou.com/v1/global/eea/renewables?country=DE&year=2023&limit=5" \
  -H "X-API-Key: your_api_key_here"

# Get ISO certifications
curl -X GET "https://api.envoyou.com/v1/global/iso/certifications?country=US&year=2023" \
  -H "X-API-Key: your_api_key_here"

# Search Indonesian permits
curl -X GET "https://api.envoyou.com/v1/permits/search?province=DKI%20Jakarta&permit_type=AMDAL&limit=5" \
  -H "X-API-Key: your_api_key_here"
```

#### Notifications
```bash
# Get user notifications
curl -X GET "https://api.envoyou.com/v1/notifications" \
  -H "X-API-Key: your_api_key_here"

# Mark notification as read
curl -X PUT "https://api.envoyou.com/v1/notifications/notif_12345" \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"read": true}'
```

### Ruby Integration

#### Using net/http

```ruby
require 'net/http'
require 'json'
require 'uri'

class EnvoyouAPI
  def initialize(api_key, base_url = 'https://api.envoyou.com/v1')
    @api_key = api_key
    @base_url = base_url
  end

  def request(method, endpoint, data = nil)
    uri = URI("#{@base_url}#{endpoint}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    case method
    when 'GET'
      request = Net::HTTP::Get.new(uri)
    when 'POST'
      request = Net::HTTP::Post.new(uri)
      request.body = data.to_json if data
    when 'PUT'
      request = Net::HTTP::Put.new(uri)
      request.body = data.to_json if data
    end

    request['X-API-Key'] = @api_key
    request['Content-Type'] = 'application/json'

    response = http.request(request)
    JSON.parse(response.body)
  end

  def login(email, password)
    request('POST', '/auth/login', {
      email: email,
      password: password
    })
  end

  def get_emissions(params = {})
    query = URI.encode_www_form(params)
    endpoint = "/global/emissions#{query.empty? ? '' : '?' + query}"
    request('GET', endpoint)
  end
end

# Usage
api = EnvoyouAPI.new('your_api_key_here')
result = api.login('john.doe@example.com', 'SecurePass123!')
puts result

emissions = api.get_emissions(state: 'CA', year: 2023, limit: 5)
puts emissions
```

### .NET Integration

#### Using HttpClient

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class EnvoyouAPI
{
    private readonly HttpClient _client;
    private readonly string _apiKey;

    public EnvoyouAPI(string apiKey)
    {
        _apiKey = apiKey;
        _client = new HttpClient();
        _client.BaseAddress = new Uri("https://api.envoyou.com/v1");
        _client.DefaultRequestHeaders.Add("X-API-Key", apiKey);
        _client.DefaultRequestHeaders.Add("Accept", "application/json");
    }

    private async Task<T> RequestAsync<T>(HttpMethod method, string endpoint, object data = null)
    {
        var request = new HttpRequestMessage(method, endpoint);

        if (data != null)
        {
            var json = JsonConvert.SerializeObject(data);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");
        }

        var response = await _client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<T>(content);
    }

    public async Task<dynamic> LoginAsync(string email, string password)
    {
        return await RequestAsync<dynamic>(HttpMethod.Post, "/auth/login", new {
            email = email,
            password = password
        });
    }

    public async Task<dynamic> GetEmissionsAsync(string state = null, int? year = null, int? limit = 50)
    {
        var query = new List<string>();
        if (!string.IsNullOrEmpty(state)) query.Add($"state={state}");
        if (year.HasValue) query.Add($"year={year}");
        if (limit.HasValue) query.Add($"limit={limit}");

        var endpoint = "/global/emissions";
        if (query.Any()) endpoint += "?" + string.Join("&", query);

        return await RequestAsync<dynamic>(HttpMethod.Get, endpoint);
    }
}

// Usage
class Program
{
    static async Task Main()
    {
        var api = new EnvoyouAPI("your_api_key_here");

        try
        {
            var loginResult = await api.LoginAsync("john.doe@example.com", "SecurePass123!");
            Console.WriteLine($"Login successful: {loginResult}");

            var emissions = await api.GetEmissionsAsync("CA", 2023, 5);
            Console.WriteLine($"Emissions: {emissions}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}
```

## Best Practices

### 1. Error Handling

```javascript
// SDK with built-in error handling
try {
  const user = await client.users.get('invalid-id');
} catch (error) {
  if (error.code === 'NOT_FOUND') {
    console.log('User not found');
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    console.log('Rate limit exceeded, retrying...');
    await delay(error.retryAfter);
    return client.users.get('invalid-id');
  } else {
    throw error;
  }
}
```

### 2. Rate Limiting

```python
from envoyou import EnvoyouClient
import time

client = EnvoyouClient(
    api_key='your-api-key',
    rate_limit_requests_per_second=10
)

# SDK handles rate limiting automatically
users = []
for user_id in user_ids:
    try:
        user = client.users.get(user_id)
        users.append(user)
    except RateLimitError as e:
        time.sleep(e.retry_after)
        user = client.users.get(user_id)
        users.append(user)
```

### 3. Connection Pooling

```go
// Go SDK with connection pooling
client := envoyou.NewClient(&envoyou.Config{
    APIKey: "your-api-key",
    HTTPClient: &http.Client{
        Transport: &http.Transport{
            MaxIdleConns:        100,
            MaxIdleConnsPerHost: 10,
            IdleConnTimeout:     90 * time.Second,
        },
        Timeout: 30 * time.Second,
    },
})
```

### 4. Logging and Monitoring

```javascript
// Enable detailed logging
const client = new EnvoyouClient({
  apiKey: 'your-api-key',
  logger: {
    debug: (message, meta) => console.debug(message, meta),
    info: (message, meta) => console.info(message, meta),
    warn: (message, meta) => console.warn(message, meta),
    error: (message, meta) => console.error(message, meta)
  }
});
```

### 5. Testing

```javascript
// Mock client for testing
const mockClient = {
  users: {
    get: jest.fn().mockResolvedValue({ id: '123', name: 'Test User' }),
    update: jest.fn().mockResolvedValue({ id: '123', name: 'Updated User' })
  }
};

// Use in tests
describe('UserService', () => {
  it('should get user profile', async () => {
    const userService = new UserService(mockClient);
    const user = await userService.getProfile('123');

    expect(mockClient.users.get).toHaveBeenCalledWith('123');
    expect(user.name).toBe('Test User');
  });
});
```

## Future SDK Development

**Official SDKs are planned for Q2 2025.** The roadmap includes:

- **JavaScript/TypeScript SDK** - Complete type-safe client
- **Python SDK** - Async support with comprehensive error handling
- **Go SDK** - High-performance concurrent requests
- **Java SDK** - Enterprise-grade integration

### Contributing to Future SDKs

When SDKs are released, contributions will be welcome through:

1. **GitHub Issues**: Report bugs and request features
1. **Pull Requests**: Submit code improvements
1. **Community Forum**: Discuss integration patterns

## Support and Resources

- [**API Reference**](https://docs.envoyou.com/docs/api/api-reference) - Complete endpoint documentation
- [**Authentication Guide**](https://docs.envoyou.com/docs/guides/authentication) - Detailed auth setup
- [**Rate Limiting**](https://docs.envoyou.com/docs/guides/rate-limiting) - Understanding limits and quotas
- [**Status Page**](https://status.envoyou.com/) - API uptime and incident reports
- [**GitHub Issues**](https://github.com/hk-dev13/app-envoyou/issues) - Report bugs and request features

**Direct HTTP integration provides the most flexibility and control. Use the examples above as starting points for your implementation.**
