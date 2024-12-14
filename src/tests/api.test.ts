import { ApiService } from '../services/apiService.js';
import { NetworkError, ValidationError } from '../utils/errors.js';
import { ENDPOINTS } from '../config/apiConfig.js';

interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

const apiService = new ApiService();

(async () => {
  try {
    // GET request test - List users
    const getResponse = await apiService.get(ENDPOINTS.USERS);
    console.log('GET Response:', getResponse);

    // POST request test - Create user
    const newUser: Partial<User> = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@reqres.in'
    };
    const postResponse = await apiService.post(ENDPOINTS.USERS, newUser);
    console.log('POST Response:', postResponse);

    // PUT request test - Update user
    const userId = '2'; // Using an existing user ID
    const updatedUser: Partial<User> = {
      first_name: 'Jane',
      last_name: 'Smith'
    };
    const putResponse = await apiService.put(`${ENDPOINTS.USERS}/${userId}`, updatedUser);
    console.log('PUT Response:', putResponse);

    // DELETE request test
    const deleteResponse = await apiService.delete(`${ENDPOINTS.USERS}/${userId}`);
    console.log('DELETE Response:', deleteResponse);

    // Error handling test - Non-existent endpoint
    try {
      await apiService.get('nonexistent-endpoint');
    } catch (error) {
      if (error instanceof NetworkError) {
        console.log('NetworkError test passed:', error.status, '-', error.data);
      }
    }

    // Validation error test - Register with missing password
    try {
      await apiService.post(ENDPOINTS.REGISTER, { email: 'test@test.com' });
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log('ValidationError test passed:', error.message);
      }
    }

  } catch (error) {
    console.error('Test failed:', error);
  }
})();