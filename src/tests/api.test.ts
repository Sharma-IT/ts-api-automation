import { ApiService } from '../services/apiService';
import { NetworkError, ValidationError } from '../utils/errors';

const apiService = new ApiService();

(async () => {
  try {
    // GET request test
    const getResponse = await apiService.get('posts');
    console.log('GET Response:', getResponse);

    // POST request test
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    const postResponse = await apiService.post('posts', newPost);
    console.log('POST Response:', postResponse);

    // PUT request test
    const updatedPost = {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    const putResponse = await apiService.put('posts/1', updatedPost);
    console.log('PUT Response:', putResponse);

    // DELETE request test
    const deleteResponse = await apiService.delete('posts/1');
    console.log('DELETE Response:', deleteResponse);

    // Test error handling
    try {
      await apiService.get('nonexistent-endpoint');
    } catch (error) {
      if (error instanceof NetworkError) {
        console.log('NetworkError test passed:', error.message);
      } else {
        throw error;
      }
    }

    // Test validation error
    try {
      await apiService.post('posts', { invalid: 'data' });
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log('ValidationError test passed:', error.message);
      } else {
        throw error;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Test failed:', error.message);
    } else {
      console.error('Test failed with an unknown error');
    }
  }
})();